# Dark Mode Color Customization Guide

This guide shows you where to change dark mode colors in your website.

## 1. Main Background & Text Colors

**File:** `app/layout.tsx` (line 64)

Current:
```tsx
dark:text-white dark:bg-black
```

To change, replace with your preferred colors:
```tsx
// Example: Dark gray theme
dark:text-gray-100 dark:bg-gray-900

// Example: Dark blue theme
dark:text-blue-50 dark:bg-slate-900

// Example: Custom hex colors
dark:text-[#f0f0f0] dark:bg-[#1a1a1a]
```

## 2. Syntax Highlighting Colors (Code Blocks)

**File:** `app/global.css` (lines 20-26)

Current:
```css
.dark {
  --sh-class: #4c97f8;
  --sh-identifier: white;
  --sh-keyword: #f47067;
  --sh-string: #0fa295;
  color-scheme: dark;
}
```

Change the hex values to your preferred colors for code syntax highlighting.

## 3. Content Text Colors

These appear throughout your components. Common locations:

### Navigation (`app/components/nav.tsx`)
- Line 33: `dark:text-neutral-100` - nav link text
- Line 39: `dark:bg-neutral-100` - active nav underline

### Home Page (`app/page.tsx`)
- Line 7-8: `dark:text-neutral-100` - main text
- Line 12: `dark:border-neutral-700 dark:bg-neutral-900` - image border/background
- Line 30, 39, 48, 58, 65, 72: `dark:decoration-neutral-500` - link underlines

### Prose/Content (`app/global.css`)
- Line 47: `dark:decoration-neutral-600` - link underlines
- Line 51: `dark:text-neutral-700` - anchor symbol
- Line 60: `dark:bg-neutral-900 dark:border-neutral-900` - code block background
- Line 83: `dark:text-neutral-200` - paragraph text

## 4. Quick Color Reference

### Tailwind Neutral Colors (Dark Mode Friendly)
- `dark:text-neutral-50` - Very light (almost white)
- `dark:text-neutral-100` - Light gray
- `dark:text-neutral-200` - Medium-light gray
- `dark:bg-neutral-800` - Dark gray background
- `dark:bg-neutral-900` - Very dark gray background

### Other Tailwind Color Options
- `dark:text-gray-100` / `dark:bg-gray-900`
- `dark:text-slate-100` / `dark:bg-slate-900`
- `dark:text-zinc-100` / `dark:bg-zinc-900`
- `dark:text-stone-100` / `dark:bg-stone-900`

### Custom Colors
Use square brackets for custom hex values:
- `dark:text-[#f0f0f0]`
- `dark:bg-[#1a1a1a]`

## 5. How to Change Colors

1. **For main background/text**: Edit `app/layout.tsx` line 64
2. **For code syntax**: Edit `app/global.css` lines 20-26
3. **For specific components**: Search for `dark:` in that component file and replace the color class
4. **For all prose content**: Edit `app/global.css` where you see `dark:` classes

## Example: Changing to a Warmer Dark Theme

1. In `layout.tsx`:
   ```tsx
   dark:text-amber-50 dark:bg-stone-900
   ```

2. In components, replace `dark:text-neutral-100` with:
   ```tsx
   dark:text-amber-50
   ```

3. Replace `dark:bg-neutral-900` with:
   ```tsx
   dark:bg-stone-800
   ```

