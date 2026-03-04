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

## About Us Page (`src/screens/public/AboutUsPage.tsx`)

All components are in `src/components/about-us/`. Responsiveness follows the 3-tier pattern plus `xl` for 2xl-target values.

### Page-level gaps
```
flex flex-col gap-12 sm:gap-16 lg:gap-24 xl:gap-30 pb-16 sm:pb-24 lg:pb-36 xl:pb-50
```

### ShopHeroBanner
| Property | default | sm | lg | xl |
|----------|---------|----|----|-----|
| Height | `h-44` | `h-60` | `h-80` | `h-100` |
| Title | `text-3xl` | `text-4xl` | `text-5xl` | `text-6xl` |
| Horizontal padding | `px-4` | `px-6` | `px-8` | — |
| Border radius | `rounded-2xl` | `rounded-3xl` | — | — |

### OurStorySection
- Decorative lines: `w-10 sm:w-16 lg:w-24 xl:w-32.5`
- Section heading: `text-xl sm:text-2xl lg:text-[28px] xl:text-[32px]`
- Hero quote: `text-2xl sm:text-3xl lg:text-4xl xl:text-5xl`
- Body text: `text-sm sm:text-base lg:text-lg`
- Signature: `text-3xl sm:text-4xl lg:text-5xl`

### PhotoGallerySection
- Photo grid: `flex-col sm:flex-row` — stacks on mobile, side-by-side on sm+
- Right two images: `flex-row sm:flex-col` — side-by-side row on mobile, stacked column on sm+
- Each image: explicit `aspect-[4/3]` on mobile to prevent zero-height collapse
- Video height: `h-52 sm:h-80 lg:h-112 xl:h-152`
- Play icon: `size-14 sm:size-20 lg:size-28 xl:size-32`

### StatsSection
- Grid: `grid-cols-2 md:grid-cols-4`
- Card padding: `px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10`
- Stat value: `text-2xl sm:text-3xl lg:text-4xl xl:text-5xl`

### MissionSection
- Layout: `flex-col lg:flex-row` (already handled)
- Left card: `p-6 sm:p-8 lg:p-10`; `min-h` removed on mobile, `lg:min-h-181` on desktop
- Feature items: `flex-col sm:flex-row` — stack on mobile, row on sm+
- SVG icons accept `className`; pass `size-10 sm:size-12 lg:size-14 xl:size-16`
- Right image height: `h-56 sm:h-72 lg:h-181`

### PhilosophySection
- Layout: `flex-col lg:flex-row` (already handled)
- Left image height: `h-56 sm:h-72 lg:h-120`
- Gap: `gap-8 lg:gap-16 xl:gap-31.25`
- Heading: `text-2xl sm:text-3xl lg:text-4xl xl:text-5xl`
- Body text: `text-sm sm:text-base lg:text-lg`

### AboutFeaturesBar
- Container: `flex-col md:flex-row gap-4 sm:gap-6 lg:gap-8 xl:gap-12`
- Card padding: `p-6 sm:p-8 lg:p-10 xl:p-12`
- Icon size: `size-10 sm:size-12 lg:size-14 xl:size-16 shrink-0`
- Card title: `text-base sm:text-lg lg:text-xl xl:text-2xl`

### SVG Icon Responsiveness Pattern

When a local SVG component needs responsive sizing, add a `className` prop and apply it to the `<svg>` element:

```tsx
const MyIcon = ({ className = "" }: { className?: string }) => (
  <svg width="64" height="64" viewBox="0 0 64 64" className={className}>
    ...
  </svg>
);
// Usage:
<MyIcon className="size-10 sm:size-12 lg:size-16" />
```
The `width`/`height` attributes are overridden by the Tailwind `size-*` classes via CSS.

## Dashboard Account Page (`src/app/dashboard/account/page.tsx`)

Components live in `src/components/dashboard/account/`. The dashboard uses a `lg`-gated sidebar (`hidden lg:block`), so mobile has no sidebar — content fills full width.

### Dashboard Layout (`src/app/dashboard/layout.tsx`)

Content area padding scales:
```
p-4 pt-1 sm:p-5 sm:pt-1.5 lg:p-8 lg:pt-2
```

### AccountTabSlider

On mobile/tablet: **horizontal scrollable pill row** across the top of the page.
On `lg+`: **vertical sidebar column** (`w-51`, `flex-col`).

| Property | default / sm | lg+ |
|----------|-------------|-----|
| Direction | `flex-row overflow-x-auto` | `flex-col overflow-visible` |
| Width | `w-full` | `w-51 shrink-0` |
| Padding | `p-2 sm:p-3` | `p-4` |
| Button gap | `gap-1 sm:gap-2` | `gap-4` |
| Button alignment | `text-center flex-1` | `text-left flex-none` |
| Button padding | `px-3 py-2 sm:px-4 sm:py-2.5` | `px-5 py-3` |

### ProfileViewSection / ProfileEditSection

- Card padding: `p-4 sm:p-6 lg:p-8`
- Card gap: `gap-6 sm:gap-8 lg:gap-10`
- Avatar: `size-18 sm:size-25 lg:size-30`
- Name: `text-xl sm:text-2xl lg:text-[32px]`
- Form grids: `grid-cols-1 sm:grid-cols-2` (ProfileEdit), `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` (ProfileView)
- Grid gap: `gap-4 sm:gap-6 lg:gap-0` (view), `gap-4 sm:gap-6` (edit)
- Input/textarea text: `text-sm sm:text-base lg:text-lg`
- Input height: `h-11 sm:h-12`

### NotificationSection & SecuritySection

- Card padding: `p-4 sm:p-6 lg:p-8`
- Card gap: `gap-6 sm:gap-8`
- Row spacing between text and control (toggle/chevron): `gap-4 sm:gap-6 lg:gap-10`
- Item title: `text-base sm:text-lg lg:text-xl`

### SecuritySection Dialogs

- All dialogs use `sm:max-w-*` — at mobile widths they fill the viewport width (shadcn default).
- Dialog padding scaled: `p-5 sm:p-8` or `p-5 sm:p-10` — avoids cramped layout on 360px.
- Delete confirm row: `flex-col sm:flex-row` — stacks on mobile to prevent button overflow.
- Dialog button text: `text-sm sm:text-[15px]`; padding: `py-3 sm:py-4 px-6 sm:px-8`.

## Cart Page (`src/screens/public/CartPage.tsx`)

Components live in `src/components/cart/`. The page uses a two-column layout at `lg+` (cart items left, billing form right), stacked on mobile.

### CartPage

- Background: `bg-[#F9FAFB]`
- Container vertical padding: `py-8 sm:py-10 lg:py-14`
- Container gap: `gap-5 sm:gap-6`
- Page heading: `text-2xl sm:text-[28px] lg:text-[32px]`
- Description: `text-sm sm:text-base`
- Two-column layout: `flex flex-col lg:flex-row` (already gap-5)

### CartItem

The key challenge: on mobile a horizontal full-row layout is too cramped. Solution is a two-row card layout on mobile, reverting to the original single row on `sm+`.

**Mobile (< 640px):** Two rows
- Row 1: thumbnail (smaller `size-16`) + product name/category (full width)
- Row 2: quantity controls on left, price + remove on right (`justify-between`)

**sm+ (≥ 640px):** Original single flex row with `justify-between`

| Property | default | sm+ |
|----------|---------|-----|
| Card direction | `flex-col` | `sm:flex-row sm:items-center sm:justify-between` |
| Card gap | `gap-3` | `sm:gap-0` |
| Card right padding | `pr-5` | `sm:pr-6` |
| Thumbnail size | `size-16` | `sm:size-20` |
| Product name | `text-base leading-6` | `sm:text-2xl sm:leading-9` |
| Product info width | unconstrained | `sm:w-65` |
| Inner row | `justify-between` | `sm:justify-normal sm:flex-1 sm:pl-2` |
| Qty button | `size-9` | `sm:size-12` |
| Qty icon | `w-4 h-4` | `sm:w-5 sm:h-5` |
| Qty number | `text-base` | `sm:text-2xl` |
| Price | `text-base` | `sm:text-2xl` |
| Price gap | `gap-3` | `sm:gap-8 sm:ml-auto` |

### BillingFormCard

- Card padding: `p-8` → `p-4 sm:p-6 lg:p-8`
- Form section gap: `gap-10` → `gap-6 sm:gap-8 lg:gap-10`
- Billing info section gap: `gap-8` → `gap-5 sm:gap-8`
- Heading: `text-2xl` → `text-xl sm:text-2xl`
- Side-by-side field pairs (Full Name/Phone, City/State): `flex gap-4` → `flex flex-col sm:flex-row gap-4` — stack on mobile

### OrderSummary

- Section heading: `text-xl` → `text-base sm:text-xl`
- Row labels: `text-base` → `text-sm sm:text-base`
- Row values: `text-lg` → `text-base sm:text-lg`

---

## FAQ Page

### FAQHero

| Property | default | sm | lg | xl |
|----------|---------|----|----|-----|
| Section padding | `px-8` | `sm:px-6` | `lg:px-8` | — |
| Hero height | `h-44` | `sm:h-60` | `lg:h-80` | `xl:h-100` |
| Border radius | `rounded-2xl` | `sm:rounded-3xl` | — | — |
| Breadcrumb text | `text-sm` | `sm:text-base` | `lg:text-xl` | — |
| Heading | `text-2xl` | `sm:text-4xl` | `lg:text-5xl` | `xl:text-[64px]` |
| Gap (breadcrumb → heading) | `gap-2` | `sm:gap-4` | — | — |

### FAQContent — Layout

- Section padding: `py-16` → `py-8 sm:py-10 lg:py-16`
- Two-column layout: `flex gap-5 items-start` → `flex flex-col lg:flex-row gap-4 lg:gap-5` — stacks vertically on mobile

### FAQContent — Category Sidebar

Mobile becomes a horizontal scrollable strip; desktop is the original vertical sidebar:

```
mobile/sm:  flex-row overflow-x-auto  (pill row, scrolls horizontally)
lg+:        lg:flex-col lg:overflow-visible lg:w-57.5 lg:shrink-0
```

| Property | default/sm | lg+ |
|----------|-----------|-----|
| Flex direction | `flex-row` | `lg:flex-col` |
| Overflow | `overflow-x-auto` | `lg:overflow-visible` |
| Gap | `gap-2` | `lg:gap-4` |
| Width | `w-full` | `lg:w-57.5 lg:shrink-0` |
| Button width | `shrink-0` (auto) | `lg:w-full` |
| Button padding | `px-3 py-2` | `lg:px-6 lg:py-4` |
| Button radius | `rounded-xl` | `lg:rounded-2xl` |
| Label text | `text-sm sm:text-base` | `lg:text-[18px] lg:leading-7` |

### FAQContent — AccordionItem

| Property | default | sm |
|----------|---------|----|
| Button gap (number → content) | `gap-3` | `sm:gap-5` |
| Padding (open) | `p-3` | `sm:p-5` |
| Padding (closed) | `px-3 py-3` | `sm:px-5 sm:py-4` |
| Number & question text | `text-sm` | `sm:text-base lg:text-[18px]` |
| Answer text | `text-sm` | `sm:text-base` |

---

## Contact Us Page

### ContactHero

Identical scaling pattern to FAQHero:

| Property | default | sm | lg | xl |
|----------|---------|----|----|-----|
| Section padding | `px-4` | `sm:px-6` | `lg:px-8` | — |
| Hero height | `h-44` | `sm:h-60` | `lg:h-80` | `xl:h-100` |
| Border radius | `rounded-2xl` | `sm:rounded-3xl` | — | — |
| Heading | `text-2xl` | `sm:text-4xl` | `lg:text-5xl` | `xl:text-[64px]` |
| Breadcrumb text | `text-sm` | `sm:text-base` | `lg:text-xl` | — |
| Gap (heading → breadcrumb) | `gap-2` | `sm:gap-4` | — | — |

### ContactFormSection

- Section padding: `py-16` → `py-8 sm:py-10 lg:py-16`
- Form gap: `gap-6` → `gap-4 sm:gap-6`
- Grid rows (Name/Phone, Email/Topic): `grid-cols-2 gap-6` → `grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6` — single column on mobile, 2 columns on sm+
- Form labels: `text-base` → `text-sm sm:text-base`
- Submit button: `px-25` → `px-10 sm:px-25`; full-width on mobile (`w-full sm:w-auto`); `text-sm sm:text-base`

### ContactInfoStrip

- Section bottom padding: `pb-16` → `pb-8 sm:pb-10 lg:pb-16`
- Strip border radius: `rounded-3xl` → `rounded-2xl sm:rounded-3xl`
- Strip padding: `px-[calc(10%)] py-4` → `px-4 sm:px-8 lg:px-[calc(10%)] py-4`
- Items layout: `flex gap-10` (always row) → `flex-col sm:flex-row gap-0 sm:gap-6 lg:gap-10` — stack on mobile

**Each info card (default → sm → lg):**

| Property | default | sm | lg |
|----------|---------|----|----|
| Card flex direction | `flex-col` | `sm:flex-row` | `lg:flex-col` |
| Card gap | `gap-3` | `sm:gap-4` | `lg:gap-5` |
| Card padding | `p-4` | `sm:p-5` | `lg:p-8` |
| Text alignment | `text-center items-center` | `sm:text-left sm:items-start` | `lg:text-center lg:items-center` |
| Title | `text-base` | `sm:text-lg` | `lg:text-2xl` |
| Hours text | `text-sm` | — | `lg:text-base` |

---

## Account Page (`/account`)

### AccountLayout

- Container gap + padding: `gap-12 py-12` → `gap-6 sm:gap-8 lg:gap-12 py-6 sm:py-8 lg:py-12`
- Sidebar + Content row: `flex gap-5 items-start` → `flex flex-col lg:flex-row gap-5` — sidebar stacks above content on mobile

### AccountHeader

| Property | default | sm | lg |
|----------|---------|----|----|
| Flex gap | `gap-4` | `sm:gap-6` | `lg:gap-9` |
| Avatar size | `size-16` | `sm:size-24` | `lg:size-39.5` |
| Welcome text | `text-sm` | `sm:text-base` | — |
| Name heading | `text-xl` | `sm:text-2xl` | `lg:text-[32px]` |
| Email | `text-sm` | `sm:text-base` | — |

### AccountSidebar

Mobile becomes a horizontal scrollable strip (same pattern as FAQ categories):

```
mobile/sm:  flex-row overflow-x-auto  (scrolls horizontally, links shrink-0)
lg+:        lg:flex-col lg:w-57.5 lg:shrink-0
```

| Property | default/sm | lg+ |
|----------|-----------|-----|
| Flex direction | `flex-row` | `lg:flex-col` |
| Gap | `gap-2` | `lg:gap-4` |
| Link width | `shrink-0` | `lg:w-full` |
| Link padding | `px-4 py-3` | `lg:px-6 lg:py-4` |
| Tab text | `text-sm sm:text-base` | `lg:text-lg` |

### ProfileSection

- Container padding: `pt-8 pb-12 px-10` → `pt-5 pb-8 px-4 sm:pt-6 sm:pb-10 sm:px-6 lg:pt-8 lg:pb-12 lg:px-10`
- Container gap: `gap-10` → `gap-6 sm:gap-8 lg:gap-10`
- Section heading: `text-2xl` → `text-lg sm:text-xl lg:text-2xl`
- Edit link text: `text-lg` → `text-sm sm:text-base lg:text-lg`
- Info rows (Row 1 & 2): `flex items-center` → `flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-0` — each field stacks on mobile
- Date of Birth width: `w-[384px]` → `w-full sm:w-[384px]`
- Field labels: `text-base` → `text-sm sm:text-base`
- Field values: `text-lg` → `text-base sm:text-lg`

### ProfileEditSection

- Form padding: `px-10 py-8` → `px-4 py-5 sm:px-6 sm:py-6 lg:px-10 lg:py-8`
- Form gap: `gap-12` → `gap-6 sm:gap-8 lg:gap-12`
- Fields container gap: `gap-8` → `gap-5 sm:gap-6 lg:gap-8`
- All 2-column rows (Name/Phone, Email/DOB, City/State/Postal): `flex gap-6` → `flex flex-col sm:flex-row gap-4 sm:gap-6` — single column on mobile
- Action buttons wrapper: `flex justify-end gap-4.5` → `flex flex-col-reverse sm:flex-row justify-end gap-3 sm:gap-4.5`
- Buttons: `w-60` → `w-full sm:w-60` (full-width on mobile, fixed on sm+)

### OrdersSection

- Container padding: `p-8` → `p-4 sm:p-8`
- Table header row: `flex` → `hidden sm:flex` (hidden on mobile)
- Order group padding: `px-6 py-4 gap-4.5` → `px-3 py-3 sm:px-6 sm:py-4 gap-4 sm:gap-4.5`
- `OrderRow` renders two layouts:
  - **Mobile** (`sm:hidden`): Card — image + name + price on top row; Order ID + Qty in second row; delivery date + status badge in third row
  - **Desktop** (`hidden sm:flex`): Original multi-column table row

### SecuritySection

- Main container padding: `p-8` → `p-4 sm:p-6 lg:p-8`
- Dialog padding:
  - Log Out dialog: `p-8` → `p-5 sm:p-8`
  - Change Password dialog: `p-10` → `p-5 sm:p-8 lg:p-10`
  - Delete Account dialog: `p-8` → `p-5 sm:p-8`
- Delete confirmation row: `flex gap-4 items-center` → `flex flex-col sm:flex-row gap-2 sm:gap-4 items-stretch sm:items-center`
- Delete button: added `w-full sm:w-auto` for full-width on mobile
