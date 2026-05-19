# CLAUDE.md — Tsuin.AI Website V2.0

Rules and reference for implementing and syncing Figma designs into this codebase via MCP.

---

## Stack

| Layer | Tool |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| UI | React 18 |
| Styling | Tailwind CSS v3 |
| Animation | Framer Motion v11 |
| Auth / DB | Supabase (SSR) |
| UI Primitives | Radix UI (Dialog, Label, Slot) |
| Component variants | class-variance-authority |
| Class merging | clsx + tailwind-merge via `cn()` |
| Forms | react-hook-form + zod |
| Toasts | Sonner |
| Icons | lucide-react |

Dev: `npm run dev` → localhost:3000

---

## Design Tokens

### Color Palette

All colors are defined in `tailwind.config.ts` under `theme.extend.colors`.

```ts
// tailwind.config.ts
bg:      '#111010'   // page background — use bg-bg
surface: '#161514'   // card / elevated surfaces — use bg-surface
teal:    '#4ecdc4'   // primary accent — use text-teal / bg-teal / border-teal
teal-dark:  '#3ab5ac'
teal-glow:  'rgba(78,205,196,0.25)'
ink-primary: '#d8d4cc'   // primary text
ink-muted:   '#6e6a62'   // secondary / label text
ink-faint:   '#2a2826'   // dividers, subtle borders
footer:      '#e8eaf0'   // footer section background (light)
```

**Figma → Code color mapping** (Figma uses Tokyo Night; code uses a warmer custom palette):

| Figma token | Figma value | Code equivalent |
|---|---|---|
| Background | `#1A1B26` | `bg-bg` (`#111010`) |
| Foreground | `#CBD1E6` | `ink-primary` (`#d8d4cc`) |
| Body text | `#797EA6` | `text-ink-primary/80` |
| Title accent | `#7AA2F7` | `text-[#7aa2f7]` (use as-is, no token yet) |
| Primary Teal | `#2AA198` | `teal` (`#4ecdc4`) |
| Code comment cyan | `#52E5FF` | `text-[#52E5FF]` (use as-is) |

When translating from Figma, always substitute Figma hex values with the nearest named token. Only use raw hex for one-offs like `#52E5FF` (HUD/tactical accents) or `#7aa2f7` (era headings).

### Typography

Fonts are loaded via `next/font/local` in `src/app/layout.tsx` and exposed as CSS variables on `<html>`.

| Variable | CSS var | Tailwind class | Figma name | Weights |
|---|---|---|---|---|
| CobolW00 | `--font-mono` | `font-mono` | CobolW00-Bold/Medium/Light | 300, 500, 700 |
| Funnel Display | `--font-display` | `font-display` | Funnel Display | variable |

**Type scale (from Figma):**

| Role | Font | Size | Weight | Class example |
|---|---|---|---|---|
| Hero title | `font-mono` | clamp(54px, 15vw, 80px) | bold | `font-mono font-bold uppercase` |
| Section title (H2) | `font-mono` | 28px | bold | `font-mono font-bold text-[28px]` |
| Era label / code comment | `font-mono` | 12px | normal | `font-mono text-[12px] text-ink-muted` |
| Body | `font-mono` | 16–18px | medium | `font-mono font-medium text-[16px] leading-[1.75]` |
| H2 Cobol | `font-mono` | 24px | bold | `font-mono font-bold text-[24px]` |
| Subtitle / label | `font-display` | 12–15px | normal | `font-display text-[14px]` |
| Footer heading | `font-display` | clamp(42px, 13vw, 68px) | black | `font-display font-black uppercase` |
| JetBrains Mono accent | system mono | 12px | normal | `font-mono text-[12px]` (CobolW00 fallback) |

Body default is `font-mono` (CobolW00). `font-display` (Funnel Display) is used for subtitles, footer prose, and CTA labels.

### Spacing & Animation Tokens

Sections consistently use: `px-6 py-[72px]` with `border-t border-ink-faint/30 bg-bg`.

Custom animations in `tailwind.config.ts`: `animate-shake`, `animate-draw-check`, `animate-fade-up`, `animate-slide-up`, `animate-pulse-dot`.

Box shadow tokens: `shadow-teal`, `shadow-teal-strong`.

---

## Project Structure

```
src/
  app/
    globals.css          # Tailwind base + custom utilities
    layout.tsx           # Font loading, Toaster, root html
    page.tsx             # Homepage — composes section components
    dashboard/page.tsx
    api/
      auth/signout/route.ts
      user/route.ts
      waitlist/route.ts
  components/
    animations/
      variants.ts        # All framer-motion Variants — import from here
    forms/
      AuthModal.tsx
      WaitlistForm.tsx
    nav/
      Navbar.tsx
    sections/            # One file per page section
      Hero.tsx
      EraSection.tsx
      HowItWorks.tsx
      FinalCTA.tsx
      Footer.tsx
    ui/                  # Primitive UI components (CVA-based)
      button.tsx
      dialog.tsx
      input.tsx
      label.tsx
  lib/
    supabase/
      client.ts
      server.ts
    utils.ts             # cn() helper
  middleware.ts
  types/index.ts

assets/                  # Fonts only (outside /public, loaded via next/font)
  font/
    Cobol W00 Bold copy.ttf
    Cobol W00 Medium copy.ttf
    Cobol W00 Light copy.ttf
    FunnelDisplay-VariableFont_wght copy.ttf

public/assets/           # All images — referenced as /assets/...
  home-header-image.png
  Home(1-4).png          # Era section images
  Shapes.png / Shapes (1).png / Shapes (2).png
  burned-paper-screen/   # Hero left overlay PNGs
  cyberpunk-screen/      # Hero right overlay PNGs
  mascot copy/
  tsuin.ai-logo copy.ai/
    tsuin-white-horizontal-full.png
```

**Path alias:** `@/` → `src/` (configured in `tsconfig.json` and implicit in Next.js).

---

## Component Patterns

### Client vs Server

- All interactive components (animations, forms, state) must have `'use client'` at the top.
- Page-level data composition (`page.tsx`) is a Server Component by default.
- Sections that use Framer Motion are client components.

### Named Exports

All components use named exports, never default exports (except Next.js page/layout files which require default).

```tsx
// correct
export function EraSection({ data }: EraSectionProps) { ... }

// wrong — don't do this for components
export default function EraSection() { ... }
```

### Animation Pattern

Always import variants from `@/components/animations/variants`. Never define inline variants in component files.

```tsx
import { fadeUp, staggerContainer, imageFrame } from '@/components/animations/variants'

// Wrap section content in staggerContainer
<motion.div
  variants={staggerContainer}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-80px' }}
>
  <motion.p variants={fadeUp} custom={0}>...</motion.p>
  <motion.p variants={fadeUp} custom={0.1}>...</motion.p>
</motion.div>
```

Available variants: `fadeUp`, `fadeIn`, `staggerContainer`, `slideFromLeft`, `slideFromRight`, `scaleIn`, `letterStagger`, `imageFrame`.

Standard easing: `[0.16, 1, 0.3, 1]` (expo-out). Use this for all entrance transitions.

### Button Component

Located at `src/components/ui/button.tsx`. Built with CVA.

```tsx
import { Button } from '@/components/ui/button'

// Variants: teal (default), outline, ghost, destructive
// Sizes: default (h-12), sm, lg, full, icon
<Button variant="teal" size="full" loading={isLoading}>JOIN BETA</Button>
```

### Class Merging

Always use `cn()` from `@/lib/utils` when composing conditional Tailwind classes:

```tsx
import { cn } from '@/lib/utils'
className={cn('font-mono text-ink-primary', isActive && 'text-teal')}
```

---

## Styling Approach

- **Tailwind CSS v3** with `tailwind.config.ts` (TypeScript config is fine — this is Next.js, not Vite/sucrase).
- Global styles in `src/app/globals.css` — only base resets, scrollbar, and custom utility keyframes live here. No component styles.
- Responsive: mobile-first. The design is 402px wide in Figma (mobile). No desktop breakpoints in the current design — the layout is a single-column vertical stack.
- No CSS Modules, no Styled Components, no CSS-in-JS (except inline `<style>` blocks for complex clip-paths in specific components).

### Clip-Path System

The site uses a distinctive "chamfered/octagonal" corner cut system. Two patterns:

```css
/* Viewport HUD (Hero full-screen) */
.clip-viewport-hud {
  clip-path: polygon(22px 0%, calc(100% - 22px) 0%, 100% 22px, 100% 100%, 0% 100%, 0% 22px);
}

/* Image frames (EraSection, etc.) */
.clip-octa {
  clip-path: polygon(22px 0%, 100% 0%, 100% calc(100% - 28px), calc(100% - 28px) 100%, 0% 100%, 0% 22px);
}
```

These are injected via `<style>` tags inside the component. Do not move them to globals.css unless used in 3+ places.

The teal border on image frames uses a `::before` pseudo-element on `.octa-frame` (see `EraSection.tsx`).

---

## Asset Management

### Images

All images live in `/public/assets/` and are referenced as `/assets/filename.png`.

```tsx
// For static images — use <img> with a path string (images.unoptimized = true in next.config.mjs)
<img src="/assets/home-header-image.png" alt="..." className="w-full h-full object-cover" />

// For section images where you want responsive sizes — use next/image
import Image from 'next/image'
<Image src={data.image} alt={data.imageAlt} width={420} height={520} sizes="88vw" />
```

**`next.config.mjs`** has `images: { unoptimized: true }` — Next Image optimization is disabled. Both `<img>` and `<Image>` work; prefer `<Image>` when you have known dimensions and need `sizes` for performance.

### Figma MCP Assets

When implementing from Figma MCP `get_design_context`, image URLs are short-lived (7 days). They must be:
1. Downloaded and placed in `/public/assets/`
2. Replaced in code with the local `/assets/filename.png` path

Never commit Figma MCP asset URLs directly into component source — they expire.

### Fonts

Fonts live in `/assets/font/` (outside `/public`) and are loaded in `src/app/layout.tsx` via `next/font/local`. Do not reference font files directly in CSS — always go through the Next.js font system.

---

## Icon System

Icons come from **lucide-react**. Import directly by name:

```tsx
import { ArrowRight, X, Menu } from 'lucide-react'
<ArrowRight className="h-4 w-4 text-teal" />
```

No custom icon files. SVGs for tactical HUD decorations (chamfer tick marks, corner brackets) are inlined as JSX in the components where they're used, not extracted into an icon system.

---

## Figma → Code Mapping

### Node ID Reference (Main-Homepage `166:2`)

| Figma node | Layer name | Code component |
|---|---|---|
| `336:55` | Homepage-Header-section | `Hero.tsx` |
| `336:110` | mobile-nav-bar | `Navbar.tsx` |
| `189:254–336:90` | Pre-AGI ERA text block | `EraSection.tsx` (index 0) |
| `298:4–271:11` | AGI ERA text block | `EraSection.tsx` (index 1) |
| `298:8–271:13` | POST-AGI ERA text block | `EraSection.tsx` (index 2) |
| `336:156–336:155` | How It Works | `HowItWorks.tsx` |
| `311:16` | Memory paragraph | `HowItWorks.tsx` intro text |
| `298:15` | Footer text block | `Footer.tsx` |
| `345:148` | blob-separator | `Footer.tsx` top border area |

### Design System Divergence

The Figma file uses **Tokyo Night Storm** colors (`#1A1B26` bg, `#7AA2F7` blue, `#CBD1E6` fg). The codebase uses a **warmer dark custom palette** (`#111010` bg, `#d8d4cc` fg). When translating:

- Do not use Figma's `#1A1B26` — use `bg-bg` (`#111010`)
- Do not use Figma's `#797EA6` directly — use `text-ink-primary/80`
- Figma's `#7AA2F7` (era title blue) has no token yet — use `text-[#7aa2f7]`
- Figma's `#2AA198` teal maps to `text-teal` / `bg-teal` (`#4ecdc4`)
- Figma's `CobolW00-Bold` → `font-mono font-bold`
- Figma's `Funnel Display` → `font-display`
- Figma's `JetBrains Mono` → `font-mono` (CobolW00 serves as the mono stack)

### Absolute → Responsive Layout

Figma exports use absolute `px` positions (`left-[31px] top-[978px]`). **Do not use these directly.** Translate to:
- Vertical stacking: `space-y-*` or `flex flex-col gap-*`
- Horizontal padding: `px-6` (matches Figma's 31–36px left margin)
- Section vertical rhythm: `py-[72px]`
- Full-width: `w-full`

---

## Supabase Integration

Client-side: `src/lib/supabase/client.ts` — `createBrowserClient()`  
Server-side: `src/lib/supabase/server.ts` — `createServerClient()` with cookie handling  
Middleware: `src/middleware.ts` — refreshes session on every request

API routes live in `src/app/api/`. All return `Response` (not `NextResponse`) for edge compatibility.

---

## Common Gotchas

1. **Font variable on `<html>`, not `<body>`** — `${cobol.variable} ${funnelDisplay.variable}` classes go on `<html>`. The `body` only gets `font-mono` as the default.
2. **`images.unoptimized: true`** — `next/image` won't optimize locally. Don't rely on blur placeholders.
3. **No Storybook** — components are developed directly in the running app. Run `npm run dev` and verify visually.
4. **Clip-paths in JSX `<style>` tags** — complex clip-paths are scoped inside components with a local `<style>` block. This is intentional.
5. **Figma blob separator** (`345:148`) is positioned with `left: -64px` to bleed past the container — translate as `mx-[-16px]` or `overflow-hidden` on the parent in code.
6. **CobolW00 is the mono stack** — it doubles as both a code-style monospaced font AND the body typeface. It is NOT JetBrains Mono, despite Figma labeling some layers "JetBrains Mono".
