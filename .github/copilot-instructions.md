# Copilot Instructions — KapCity Tees (Barber Certificated)

## Architecture

Next.js 16 App Router project (React 19, TypeScript 5, pnpm). Three route groups with distinct layouts:

- **`(auth)`** — Split-screen: content + image banner on `lg+`; single-column (banner hidden) on mobile/tablet
- **`(public)`** — Public pages wrapped with `Navbar` + `Footer`
- **`dashboard/`** — Sidebar + Topbar admin layout

**Page-Screen delegation**: Every `page.tsx` is a thin wrapper that renders a single screen component. Pages never contain UI logic.

```tsx
// src/app/(public)/shop/page.tsx
import ShopPage from "@/screens/public/ShopPage";
const page = () => { return <ShopPage />; };
export default page;
```

- Public screens → `src/screens/public/`
- Private/dashboard screens → `src/screens/private/`
- Page and layout functions use **lowercase** names (`page`, `layout`)

## Component Conventions

- **Arrow functions + default export**: `const MyComponent = () => { ... }; export default MyComponent;`
- **Exception**: UI primitives in `components/ui/` and `components/auth-ui/` use **named exports**
- **`"use client"` only when needed** — components with state, hooks, or event handlers. Pure presentational components stay as Server Components.
- **Feature-based directories**: `components/shop/`, `components/dashboard/`, `components/cart/`, etc.
- **No barrel files** — always import from the specific file: `@/components/shop/ShopProductCard`
- **Descriptive names with domain prefix**: `ShopProductCard`, `DashboardSidebar`, `BillingFormCard`
- Interfaces defined **inline** in component files; prefer `interface` over `type` for props

## Styling

- **Tailwind CSS v4** with `cn()` utility from `@/lib/utils` (clsx + tailwind-merge)
- **shadcn/ui** (new-york style) — primitives in `components/ui/`, configured via `components.json`
- Colors mostly hardcoded hex: primary `#1E6FA8`, dark `#0F2A3C`, text `#637381`, muted `#919EAB`
- Fonts: **Inter** (`font-inter`, primary) and **Licorice** (`font-licorice`, decorative)
- No CSS modules or styled-components — all inline Tailwind classes

## Responsive Design

Mobile-first with 3-tier breakpoints: **default → `sm` (640px) → `lg` (1024px)**. Add `md`/`xl` only when needed. Original designs target 2xl screens — scale down from there. See `RESPONSIVE_GUIDE.md` for detailed patterns (typography, spacing, interactive element scaling).

## Forms

react-hook-form + zod v4 + `@hookform/resolvers`. Pattern:

```tsx
const schema = z.object({ email: z.email(), password: z.string().min(8) });
type FormData = z.infer<typeof schema>;
const form = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { ... } });
```

Use shadcn `<Form>`, `<FormField>`, `<FormItem>`, `<FormControl>`, `<FormMessage>` wrappers. Auth forms use custom `auth-ui/` inputs; other forms use `ui/` primitives.

## Icons & Images

- Custom SVG icons exported from `src/assets/icons.tsx` (~4400 lines). Each icon accepts `className` + spread props, uses `currentColor`.
- Also uses **lucide-react** for standard icons (`ChevronDown`, `Plus`, `Minus`, etc.)
- Static images imported from `src/assets/images/` via `next/image`

## Imports

- **Always use `@/` alias** (maps to `src/`): `@/components/...`, `@/screens/...`, `@/assets/...`, `@/lib/...`, `@/hooks/...`, `@/providers/...`
- Relative imports only within the same feature directory
- Order: React/Next.js → external libs → `@/` aliases → relative

## State Management

Minimal React Context only. `StateContextProvider` at root with `isLoggedIn` state. Access via `useStateContext()` hook from `@/hooks/useStateContext`.

## Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js routes (thin page wrappers) |
| `src/screens/` | Full page compositions (public + private) |
| `src/components/` | Feature-grouped UI components |
| `src/components/ui/` | shadcn/ui primitives |
| `src/components/shared/` | Cross-cutting: `Container`, `Logo`, `SectionHeader`, `HeroTitle`, `Navbar`, `Footer` |
| `src/assets/icons.tsx` | All custom SVG icon components |
| `src/assets/images/` | Static image assets |
| `src/providers/` | React context providers |

## Dev Workflow

```bash
pnpm dev      # Start dev server
pnpm build    # Production build
pnpm lint     # ESLint
```

No test framework configured. No data-fetching layer yet — all data is mocked at the screen level.
