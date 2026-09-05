#!/usr/bin/env python3
"""Generate a thinned 王 from Long Cang.

Long Cang draws 王 with a much fatter brush than the characters beside it in the
intro heading — a 0.079em stroke against 0.049em for 家悦 — because a brush lays
down more ink on a four-stroke character. The font ships a single weight, so
there is no lighter cut to switch to.

This erodes the outline instead: stroke the glyph's own contour to get a band
along its edge, subtract that band from the filled glyph, then scale the result
back up so it occupies the same space. Shape, position and advance are the
font's own; only the strokes get finer.

Long Cang is under the SIL Open Font License 1.1 with no Reserved Font Name, so
a modified derivative is permitted provided it stays under the OFL and ships the
license — see app/fonts/OFL.txt. The derivative is renamed anyway, to avoid any
suggestion that it is the upstream font.

    pip install fonttools brotli skia-pathops
    python scripts/thin-wang.py
"""
import math
import os
import re
import urllib.request

import pathops
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.areaPen import AreaPen
from fontTools.pens.basePen import BasePen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.pens.cu2quPen import Cu2QuPen
from fontTools.pens.ttGlyphPen import TTGlyphPen
from fontTools.ttLib import TTFont

WANG = 0x738B
# long cang's 家悦 sit at a 0.049em stroke, but matching them exactly reads a
# shade too light for 王 — it carries fewer strokes, so it can hold more ink.
TARGET_STROKE = 0.0565
UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
OUT = os.path.join(os.path.dirname(__file__), "..", "app", "fonts", "long-cang-wang-thin.woff2")


class PerimeterPen(BasePen):
    """Flattens the outline and sums segment lengths."""

    def __init__(self, steps=40):
        super().__init__({})
        self.length = 0.0
        self.steps = steps
        self._start = None

    def _moveTo(self, p):
        self._cur = self._start = p

    def _lineTo(self, p):
        self.length += math.dist(self._cur, p)
        self._cur = p

    def _bez(self, pts, quad):
        p0 = self._cur
        prev = p0
        for i in range(1, self.steps + 1):
            t = i / self.steps
            mt = 1 - t
            if quad:
                p1, p2 = pts
                x = mt * mt * p0[0] + 2 * mt * t * p1[0] + t * t * p2[0]
                y = mt * mt * p0[1] + 2 * mt * t * p1[1] + t * t * p2[1]
            else:
                p1, p2, p3 = pts
                x = mt**3 * p0[0] + 3 * mt * mt * t * p1[0] + 3 * mt * t * t * p2[0] + t**3 * p3[0]
                y = mt**3 * p0[1] + 3 * mt * mt * t * p1[1] + 3 * mt * t * t * p2[1] + t**3 * p3[1]
            self.length += math.dist(prev, (x, y))
            prev = (x, y)
        self._cur = pts[-1]

    def _curveToOne(self, a, b, c):
        self._bez((a, b, c), False)

    def _qCurveToOne(self, a, b):
        self._bez((a, b), True)

    def _closePath(self):
        if self._start:
            self.length += math.dist(self._cur, self._start)


def stats(path, upm):
    """Stroke thickness (area/perimeter) and ink box, in em."""
    ap = AreaPen(None)
    path.draw(ap)
    pp = PerimeterPen()
    path.draw(pp)
    bp = BoundsPen(None)
    path.draw(bp)
    xmin, ymin, xmax, ymax = bp.bounds
    return {
        "stroke": 2 * abs(ap.value) / pp.length / upm,
        "w": (xmax - xmin) / upm,
        "h": (ymax - ymin) / upm,
        "xmin": xmin / upm,
        "xmax": xmax / upm,
        "ymin": ymin / upm,
        "ymax": ymax / upm,
        "xc": (xmin + xmax) / 2 / upm,
        "yc": (ymin + ymax) / 2 / upm,
    }


def source_font():
    """The Long Cang chunk that carries 王, straight from Google Fonts."""
    css = urllib.request.urlopen(
        urllib.request.Request(
            "https://fonts.googleapis.com/css2?family=Long+Cang&display=swap",
            headers={"User-Agent": UA},
        ),
        timeout=30,
    ).read().decode()
    for face in re.findall(r"@font-face\s*\{[^}]*\}", css):
        ranges = re.search(r"unicode-range:\s*([^;}]*)", face)
        if not ranges:
            continue
        for part in ranges.group(1).split(","):
            part = part.strip().replace("U+", "").replace("u+", "")
            lo, _, hi = part.partition("-")
            try:
                lo_i = int(lo, 16)
                hi_i = int(hi, 16) if hi else lo_i
            except ValueError:
                continue
            if lo_i <= WANG <= hi_i:
                url = re.search(r"url\((https[^)]*)\)", face).group(1)
                data = urllib.request.urlopen(
                    urllib.request.Request(url, headers={"User-Agent": UA}), timeout=30
                ).read()
                path = os.path.join(os.path.dirname(OUT), ".longcang-source.woff2")
                with open(path, "wb") as fh:
                    fh.write(data)
                return path
    raise SystemExit("no Long Cang subset covers 王")


def main():
    src = source_font()
    font = TTFont(src)
    upm = font["head"].unitsPerEm
    glyphs = font.getGlyphSet()
    name = font.getBestCmap()[WANG]
    advance = font["hmtx"][name][0]

    original = pathops.Path()
    glyphs[name].draw(original.getPen())
    before = stats(original, upm)

    def erode(units):
        band = pathops.Path()
        glyphs[name].draw(band.getPen())
        band.stroke(units, pathops.LineCap.ROUND_CAP, pathops.LineJoin.ROUND_JOIN, 4.0)
        band.convertConicsToQuads()
        out = pathops.Path()
        pathops.difference([original], [band], out.getPen())
        out.simplify()
        return out

    # two knobs (erosion depth, rescale) against three targets (stroke, width,
    # height). pin the stroke exactly, then take whichever depth leaves the ink
    # box closest to where it started.
    best = None
    for units in range(20, 52):
        eroded = erode(units)
        got = stats(eroded, upm)
        scale = TARGET_STROKE / got["stroke"]
        err = max(
            abs(got["w"] * scale - before["w"]) / before["w"],
            abs(got["h"] * scale - before["h"]) / before["h"],
        )
        if best is None or err < best[0]:
            best = (err, units, scale, eroded, got)
    err, units, scale, eroded, got = best

    # scale about the origin, then slide vertically so the ink sits where the
    # original sat — the glyph must not appear to move
    # scaling happens about the origin, which drags the glyph away from where it
    # sat. slide it back so the ink's centre lands exactly on the original's, on
    # both axes — the character must not appear to move.
    # (Path.transform returns a new path; it does not mutate in place.)
    dx = (before["xc"] - got["xc"] * scale) * upm
    dy = (before["yc"] - got["yc"] * scale) * upm
    placed = eroded.transform(scale, 0.0, 0.0, scale, dx, dy)
    after = stats(placed, upm)

    print(f"eroded {units} units, rescaled x{scale:.4f}")
    for key, label in (("stroke", "stroke"), ("w", "width"), ("h", "height"),
                       ("xc", "x-centre"), ("yc", "y-centre")):
        delta = (after[key] - before[key]) / before[key] * 100 if before[key] else 0
        print(f"  {label:<9} {before[key]:.4f} -> {after[key]:.4f}  ({delta:+.1f}%)")

    pen = TTGlyphPen(None)
    placed.draw(Cu2QuPen(pen, max_err=0.5, reverse_direction=True))

    fb = FontBuilder(upm, isTTF=True)
    fb.setupGlyphOrder([".notdef", "wang"])
    fb.setupCharacterMap({WANG: "wang"})
    fb.setupGlyf({".notdef": TTGlyphPen(None).glyph(), "wang": pen.glyph()})
    lsb = round(after["xmin"] * upm)
    fb.setupHorizontalMetrics({".notdef": (advance, 0), "wang": (advance, lsb)})
    hhea, os2 = font["hhea"], font["OS/2"]
    fb.setupHorizontalHeader(ascent=hhea.ascent, descent=hhea.descent, lineGap=hhea.lineGap)
    fb.setupNameTable({
        "copyright": "Copyright 2018 The Long Cang Project Authors "
                     "(https://github.com/googlefonts/longcang). "
                     "Modified: 王 eroded to a lighter stroke.",
        "familyName": "Long Cang Wang Thin",
        "styleName": "Regular",
        "uniqueFontIdentifier": "LongCangWangThin-Regular",
        "fullName": "Long Cang Wang Thin Regular",
        "psName": "LongCangWangThin-Regular",
        "version": "Version 1.000",
        "licenseDescription": "This Font Software is licensed under the SIL Open Font "
                              "License, Version 1.1. See app/fonts/OFL.txt.",
        "licenseInfoURL": "https://scripts.sil.org/OFL",
    })
    fb.setupOS2(
        sTypoAscender=os2.sTypoAscender,
        sTypoDescender=os2.sTypoDescender,
        sTypoLineGap=os2.sTypoLineGap,
        usWinAscent=os2.usWinAscent,
        usWinDescent=os2.usWinDescent,
        sxHeight=getattr(os2, "sxHeight", 0) or 0,
        sCapHeight=getattr(os2, "sCapHeight", 0) or 0,
    )
    fb.setupPost()
    fb.font.flavor = "woff2"
    fb.save(OUT)
    os.remove(src)
    print(f"\nwrote {os.path.relpath(OUT)}  ({os.path.getsize(OUT)} bytes)")


if __name__ == "__main__":
    main()
