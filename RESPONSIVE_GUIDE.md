# Responsive Design Guide

## Breakpoint Strategy

Mobile-first approach using Tailwind CSS v4 breakpoints:

| Token | Min-width | Target |
|-------|-----------|--------|
| (default) | 0px | Small phones (320–639px) |
| `sm` | 640px | Large phones / small tablets |
| `md` | 768px | Tablets (use when needed) |
| `lg` | 1024px | Laptops / layout shifts |
| `xl` | 1280px | Desktops |
| `2xl` | 1536px | Large desktops (original design target) |

**Primary breakpoints**: default → `sm` → `lg` (3-tier). Add `md` or `xl` only when a specific element needs an intermediate step.

## Auth Layout (`src/app/(auth)/layout.tsx`)

The auth layout is responsive with these behaviors:

| Breakpoint | Layout | Banner | Logo |
|------------|--------|--------|------|
| default–`xl` | Single column (`flex flex-col`) | Hidden | Rendered inline inside page content |
| `2xl`+ | 7-col grid (4 content + 3 banner) | Visible, sticky full-height | Fixed top-left via layout |

Auth page children use `lg:col-span-4` — this only activates when the grid is active at `lg+`.

### Auth Logo Pattern

Two-part logo system across layout and page:

- **Layout** (`layout.tsx`): `className="hidden 2xl:block 2xl:fixed top-8 left-8 size-22"` — only renders at `2xl+`
- **Page** (each auth page): `<Logo className="2xl:hidden size-16 sm:size-18 lg:size-22" />` — renders inline at top of content, hidden at `2xl+`

This means no `mt-*` top-margin hack is needed on any element — the logo is part of the normal document flow on small screens.

## Responsive Patterns

### Typography Scaling

```
Headings:   text-2xl    → sm:text-[28px] → lg:text-[32px]
Body:       text-sm     → sm:text-base
Subtext:    text-base   → sm:text-lg
```

Always pair font-size changes with `leading-*` adjustments.

### Spacing Scaling (padding, gaps)

```
Container padding:  px-4    → sm:px-6    → lg:px-8
Vertical padding:   py-8    → sm:py-10   → lg:py-15
Section gaps:       gap-8   → sm:gap-10  → lg:gap-12
Element gaps:       gap-4   → sm:gap-5
```

### Interactive Elements

```
Buttons:    h-11    → sm:h-12   → lg:h-14.5  (Button default; use lg:h-13 for compact forms)
OTP slots:  size-11 → sm:size-14 → lg:size-16  (with text-lg → sm:text-xl → lg:text-2xl)
Icons:      w-5 h-5 → sm:w-6 sm:h-6
```

### Logo Clearance

Do **not** use `mt-*` hacks for logo clearance. The inline-logo pattern (see Auth Logo Pattern above) places the logo in normal document flow, so no extra top margin is needed on any page element.

## Conventions

1. **Design at 2xl first** — the current designs target extra-large screens. Scale down from there.
2. **3-tier responsive** — most elements need only default / `sm` / `lg` variants.
3. **Use `cn()` for conditional classes** — never inline ternaries for responsive logic; rely on Tailwind breakpoint prefixes.
4. **Test at 360px, 640px, 1024px, 1536px** — these cover the critical breakpoints.
5. **shadcn/ui overrides** — when base components have fixed sizes (e.g., `size-16` on `InputOTPSlot`), pass responsive size classes via `className` and let `tailwind-merge` handle the override.
