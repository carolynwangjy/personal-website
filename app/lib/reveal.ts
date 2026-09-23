/**
 * Someone who asks for /blog directly — a link from elsewhere, a bookmark, the
 * url bar — lands on the intro with the list they came for below the fold. So on
 * arrival, scroll the tab row up to the top and put the section under it.
 *
 * Only on arrival. Moving around the site once you're here is unchanged: the
 * tabs hold the row you clicked from, a post's ← back link returns you to the
 * top of the section page. This runs off a script tag in the document, so a
 * client-side navigation never re-runs it, which is exactly the line we want.
 *
 * It's a measurement, so it can't happen on the server, and an effect would be
 * too late — hydration runs after the first paint, so the visitor would see the
 * top of the page and then get moved, which reads as a jump. A script at the end
 * of the body lands in the gap: scripts wait for pending stylesheets, so the css
 * is applied and the page is laid out as it will be drawn, but not drawn yet.
 */
export const REVEAL_SECTION = `
(function () {
  if (location.pathname === '/') return;
  // Only a genuine arrival. On a reload or a back button the browser restores
  // the position you were at, and it does that after this runs — so scrolling
  // here would move the page and then be overruled, which is the flash. Reading
  // scrollY is no use at this point: the restore hasn't landed yet.
  //
  // The navigation type carries this: 'reload' and 'back_forward' are not
  // arrivals. It isn't quite enough on its own, because a reload interrupted by
  // another reload reports itself as 'navigate'. That case has a tell, though —
  // the load it interrupted never reached its load event. So mark the page while
  // it loads, clear the mark when it finishes, and read a mark left behind as
  // the interrupted reload it is. Anything else, including opening the same url
  // again a second later, is an arrival.
  var entry = performance.getEntriesByType('navigation')[0];
  if (entry && entry.type !== 'navigate') return;
  var interrupted = false;
  try {
    var key = 'loading:' + location.pathname;
    interrupted = sessionStorage.getItem(key) !== null;
    sessionStorage.setItem(key, '1');
    addEventListener('load', function () {
      try { sessionStorage.removeItem(key); } catch (e) {}
    });
  } catch (e) {}
  if (interrupted || window.scrollY > 0) return;
  // the tab row only exists on a section page
  var nav = document.querySelector('nav[aria-label="sections"]');
  if (!nav) return;
  // put the tab row at the top, with the section under it. every section asks
  // for the same scroll, since they all sit under the same intro — a page
  // without the length to give it stops where it runs out, which is the browser
  // clamping rather than a rule of ours, and lands as close as it can.
  var by = nav.getBoundingClientRect().top - 16;
  if (by > 0) window.scrollBy(0, by);
})();
`
