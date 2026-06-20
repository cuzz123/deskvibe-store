---
name: DeskVibe
description: Premium desk accessories store — warm minimalism meets functional beauty
colors:
  shop-black: "#1c1917"
  shop-black-hover: "#292524"
  indigo-ink: "#6366f1"
  indigo-ink-hover: "#4f46e5"
  white: "#ffffff"
  warm-paper: "#fafaf9"
  border-light: "#f5f5f4"
  border: "#e7e5e4"
  text-secondary: "#57534e"
  text-muted: "#78716c"
typography:
  display:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.875rem, 4vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 1.875rem)"
    fontWeight: 700
    lineHeight: 1.3
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: "normal"
  body:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Figtree, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.625rem"
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: "0.05em"
    textTransform: "uppercase"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  "2xl": "2.5rem"
  "3xl": "3rem"
  section: "3.5rem"
components:
  button-primary:
    backgroundColor: "{colors.shop-black}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
    size: "2.75rem"
  button-primary-hover:
    backgroundColor: "{colors.shop-black-hover}"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.shop-black}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  button-outline-hover:
    backgroundColor: "{colors.border-light}"
    textColor: "{colors.text-muted}"
  button-accent:
    backgroundColor: "{colors.indigo-ink}"
    textColor: "{colors.white}"
    rounded: "{rounded.md}"
    padding: "0.75rem 2rem"
  button-accent-hover:
    backgroundColor: "{colors.indigo-ink-hover}"
  card-product:
    backgroundColor: "{colors.white}"
    rounded: "{rounded.sm}"
    padding: "1rem"
---

# Design System: DeskVibe

## 1. Overview

**Creative North Star: "The Studio Gallery"**

DeskVibe is a design exhibition, not a warehouse. Every product earns its spot on the page. The interface treats products with the curatorial care of a gallery — generous white space, considered photography, and typographic restraint that lets the materials speak. The system is warm without being soft, confident without being loud, and premium without being precious.

The palette anchors in Shop Black (#1c1917) — a warm near-black with wood-shop character — supported by a tight stone neutral scale and a single Indigo Ink accent (#6366f1) used sparingly for interactive signifiers. Figtree runs across every surface: a single sans-serif family at multiple weights, chosen for its clean geometry and warm, humanist details. The system is fundamentally flat at rest; depth arrives only as state (hover lift on cards, focus rings on inputs). Motion is brief and material — quick fades, gentle lifts — never choreographed.

This system explicitly rejects three aesthetics from PRODUCT.md: marketplace density (crowded grids, competing badges), cold SaaS blue-grey (sterile, abstract, no tactile warmth), and luxury-fashion pretension (black backgrounds, dramatic type, impractical presentation). If a page feels like an Amazon category grid, it's wrong. If it feels like a startup landing page, it's wrong. If it feels like a fashion house, it's wrong. It should feel like walking into a well-lit design studio where every object on display was chosen.

**Key Characteristics:**
- Single sans-serif family (Figtree) across all surfaces; weight and size carry the hierarchy
- Restrained palette: warm black primary, single indigo accent, white + stone neutrals
- Flat at rest; depth on hover via shadow and micro-lift
- Cards are used for products and editorial groupings only — never nested, never decorative
- Curatorial spacing: generous but not wasteful. Section rhythm varies deliberately
- Typography is tight-tracked on headings, open on body; no wide tracking, no all-caps decoration except product category labels

## 2. Colors

**Palette Character:** Warm, grounded, and functional. Shop Black anchors the system with the depth of oiled walnut; Indigo Ink provides a single, deliberate accent point. The stone neutral scale bridges them with the warmth of natural paper and unbleached textile.

### Primary
- **Shop Black** (#1c1917): The brand anchor. Used for primary buttons, navigation text, headings, cart badge, and body ink. A warm near-black — never cold #000, never safe charcoal. Also serves as the text color at full opacity; stepped down through the neutral scale for secondary hierarchy.

### Secondary
- **Indigo Ink** (#6366f1): The sole accent. Used for interactive signifiers: links, category eyebrow labels, focus rings, feature icons, wishlist heart, and badge backgrounds. Applied to ≤10% of any given screen. Its rarity is the point — if indigo appears on more than two non-link elements in the same viewport, it's over-deployed.
- **Indigo Ink Dark** (#4f46e5): Hover and active state for accent elements.

### Neutral
- **White** (#ffffff): Body background and card surface. Clean but not clinical; paired with stone-tinted sections for tonal rhythm.
- **Warm Paper** (#fafaf9): Tinted section background (stone-50). Used for alternating page sections, footer, and feature blocks to create visual rhythm against the white body.
- **Border Light** (#f5f5f4): Subtle borders and hover backgrounds (stone-100). Card default borders, input strokes, and ghost button hover states.
- **Border** (#e7e5e4): Standard structural borders (stone-200). Section dividers, header bottom border, card borders in tinted sections.
- **Text Secondary** (#57534e): Supporting body text (stone-600). Product descriptions, metadata, footer links default state.
- **Text Muted** (#78716c): Tertiary text (stone-500). Placeholder copy, disabled states, section subheadings. Must maintain ≥4.5:1 against white background (it does at 4.54:1 — do not lighten further).

### Named Rules
**The 10% Rule.** Indigo Ink appears on ≤10% of any given screen. It's a signal, not a decoration. If more than two non-link elements use it in the same viewport, it's over-deployed.

**The Stone Bridge Rule.** All neutrals between White and Shop Black stay within the stone hue (30–60° in OKLCH). Never introduce cool grays (slate, blue-gray) or warm creams (sand, beige) — the neutral ramp must feel like it belongs to the same material as Shop Black.

## 3. Typography

**Display Font:** Figtree (with ui-sans-serif, system-ui, sans-serif fallback)
**Body Font:** Figtree (with ui-sans-serif, system-ui, sans-serif fallback)
**Label/Mono Font:** Figtree (no separate mono face)

**Character:** Figtree is a geometric sans with humanist warmth — clean enough for product precision, warm enough for lifestyle context. The single-family approach relies entirely on weight (400, 600, 700) and size for hierarchy. No second font dilutes the signal.

### Hierarchy
- **Display** (700, clamp(1.875rem, 4vw, 2.25rem), 1.25): Hero headlines and slideshow titles. Used at most once per page. Tracking tightened to -0.025em for a crafted, intentional feel — never below -0.04em.
- **Headline** (700, clamp(1.5rem, 3vw, 1.875rem), 1.3): Section headings ("Shop the Look," "Featured Products"). Used 3–5 times per page. Same tight tracking as Display.
- **Title** (600, 1rem, 1.4): Product names, card headings, detail labels. The workhorse of the product grid.
- **Body** (400, 0.875rem, 1.625): All running text. Capped at 65–75ch in prose blocks. Color defaults to Text Secondary (#57534e) on white backgrounds; steps up to Shop Black for primary content.
- **Label** (700, 0.625rem, 1.4, 0.05em tracking, uppercase): Product category eyebrows, badge text, footer column headers. The only all-caps element in the system. Color is Indigo Ink for category labels, Shop Black or white for badges.

### Named Rules
**The One Voice Rule.** Figtree or nothing. Never introduce a second typeface. Hierarchy is weight + size + color, not font-switching.

**The Tracking Floor Rule.** Heading tracking never drops below -0.04em. At tighter values, Figtree's letterforms begin to touch. If a heading needs more presence, increase weight or size before tightening tracking further.

## 4. Elevation

DeskVibe uses **tonal layering as its primary depth strategy**, with shadows reserved for interactive state. The system is flat at rest: white cards sit on Warm Paper sections, creating depth through color contrast rather than drop shadows. Section alternation (white → Warm Paper → white) produces page-level rhythm without elevation.

Shadows appear only as a response to state: product cards lift on hover (`shadow-xl` + `translateY(-4px)`), carousel arrows gain `shadow-md`, and the sticky header casts a thin bottom border (not a shadow). This keeps the resting interface clean and gallery-like, with depth cues reserved for the element the user is currently interacting with.

### Shadow Vocabulary
- **Ambient Hover** (`box-shadow: 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)`): Product card hover state. Paired with a -4px Y translation for a tactile lift effect. Tailwind: `shadow-xl`.
- **Structural Hover** (`box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -4px rgba(0,0,0,0.1)`): Setup card hover, dropdown panels. Tailwind: `shadow-lg`.
- **Floating Control** (`box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -2px rgba(0,0,0,0.1)`): Carousel arrows, mobile cart FAB, fixed action buttons. Tailwind: `shadow-md`.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Shadows appear only as a response to state (hover, elevation, focus). No card should cast a shadow unless the user is interacting with it.

**The One-Pixel Border Rule.** Depth between adjacent surfaces at rest is conveyed through border and background color, not shadow. A 1px `border` on Warm Paper is the maximum structural separator. No decorative side-stripe borders.

## 5. Components

### Buttons
- **Shape:** Rounded at the project's two radii. Primary CTAs in the slideshow and hero use full-round (`border-radius: 9999px`). Standard buttons use `--radius-md` (12px) for md/lg sizes and `--radius-sm` (8px) for sm.
- **Primary (Shop Black):** Background Shop Black, white text, `shadow-sm`. Hover shifts to Shop Black Hover (#292524). Used for main CTAs: "Shop All Products," "Add to Cart" (desktop), "Register."
- **Outline:** Transparent background, Shop Black text, Border stroke. Hover fills Border Light background and shifts text toward Text Muted. Used for secondary actions.
- **Ghost:** Transparent background, Text Secondary text, no border. Hover fills Border Light background and shifts text to Shop Black. Used for tertiary and inline actions.
- **Accent (Indigo Ink):** Rare. Indigo Ink background, white text. Reserved for the single highest-attention CTA on a page — at most one per screen. If there's already a Primary button, there is no Accent button.
- **Hover / Focus:** All variants transition `background-color` and `color` over 150ms. Focus-visible shows a 2px Indigo Ink ring with 2px offset. No scale transform on buttons — weight comes from color and padding, not motion.
- **Sizes:** sm (32px height, 12px horizontal padding, xs text), md (40px height, 20px padding, sm text), lg (48px height, 28px padding, base text). The slideshow CTA and "Register" in the header use a custom pill size (48px height, full-round).

### Cards (Product)
- **Corner Style:** `--radius-sm` (8px) — gently curved, substantial without feeling soft.
- **Background:** White. On Warm Paper sections, cards provide tonal contrast.
- **Border:** 1px Border Light (#f5f5f4) at rest. No border color shift on hover; depth comes from shadow + lift, not stroke.
- **Hover:** `shadow-xl` + `translateY(-4px)` transition over 200ms ease-out. The image inside scales 105% over 500ms for a subtle parallax feel. Reduced motion: image scale is disabled; only shadow + lift remain.
- **Internal Padding:** 16px (1rem) on all sides. Consistent across the product grid.

### Chips / Badges
- **Style:** 10px bold uppercase with 0.05em tracking. Background is context-dependent: Shop Black for "Bestseller"/"Best Value"/"Premium," Indigo Ink for "Popular"/"New," Emerald (#059669) for "Eco"/"Value," Red (#dc2626) for "Sale."
- **Shape:** Fully rounded (`border-radius: 9999px`). Padding: 4px 10px.
- **Position:** Top-left corner of product card image, 12px inset from edges.

### Inputs / Fields
- **Style:** 1px Border (#e7e5e4) stroke, Border Light (#f5f5f4) background, `--radius-sm` (8px) corners. Height: 40px default (matches md button), 48px for search and large forms.
- **Focus:** 2px Indigo Ink ring with 2px offset. Border color transitions to transparent during focus to avoid double-ring.
- **Placeholder:** Text Muted (#78716c) — meets 4.5:1 against white background. Never lighter than `--text-muted`.

### Navigation (Header)
- **Style:** Sticky top, white background, 1px Border bottom. Height: 64px content area + 36px announcement bar = 100px total.
- **Announcement Bar:** Shop Black background (#1c1917), warm-tinted light text (#d6d3d1 / stone-300). 10px bold uppercase tracking-wide. Single line, no carousel.
- **Desktop Links:** Text Muted at rest, Shop Black on hover. 14px medium weight. No underline, no background shift — pure color transition over 150ms.
- **Mobile:** Full-width dropdown panel with white background and Border top. Links are 14px medium, Text Secondary, separated by Border Light dividers. No icons in mobile nav rows.

### Slideshow
- **Layout:** Two-column grid (content left, image right) on desktop; stacked on mobile with image first. Min height 500px, max height 600px.
- **Indicators:** Animated pill dots — active dot expands to 28px width in Shop Black; inactive dots are 10px circles in Border. Centered at bottom, 24px from edge.
- **Arrows:** 40px white circles with `shadow-md`. Hover fills Shop Black with white icon. Positioned at vertical center, 16px from edges.
- **Motion:** Auto-advance every 5s. Pause on hover. Reduced motion: disable auto-advance; show static first slide with manual arrow navigation only.

### Footer
- **Background:** Warm Paper (#fafaf9) with Border top divider.
- **Layout:** 4-column grid on desktop, 2-column on mobile. Brand column spans full width. Padding: 56px vertical, 24px horizontal.
- **Column Headers:** Label style (10px bold uppercase, 0.05em tracking), Text Muted color.
- **Links:** 14px, Text Muted at rest, Shop Black on hover. Stacked vertically with 4px gaps.
- **Bottom Bar:** Border top divider, 12px text, Text Muted. Flex row on desktop (copyright left, payment icons right), stacked on mobile.

## 6. Do's and Don'ts

### Do:
- **Do** use Figtree exclusively — weight and size carry the hierarchy, not font-switching.
- **Do** use Shop Black (#1c1917) as the single primary ink. Never pure #000.
- **Do** limit Indigo Ink to ≤10% of any screen. It's a signal, not a decoration.
- **Do** keep cards flat at rest. Shadows only on hover.
- **Do** alternate white and Warm Paper sections for page rhythm — but never more than 3 consecutive tinted sections.
- **Do** cap body line length at 65–75ch in prose blocks.
- **Do** use `text-wrap: balance` on h1–h3 headings; `text-wrap: pretty` on body text.
- **Do** let product photography lead. Images are large, considered, and the primary visual draw — never crowd them with overlays.
- **Do** respect reduced motion: replace auto-advancing carousels with static slides, disable hover scale transforms, and use crossfade transitions instead of translate animations.

### Don't:
- **Don't** introduce a second typeface. No serif pairings, no mono accents. Figtree is the system.
- **Don't** use marketplace density patterns — crowded grids, stacked badges, competing CTAs, information overload. DeskVibe is a studio, not a warehouse (per PRODUCT.md anti-reference #1).
- **Don't** drift into cold SaaS aesthetic — sterile blue-white-grey palettes, abstract illustrations, generic gradient backdrops. No tactile warmth (per PRODUCT.md anti-reference #2).
- **Don't** adopt luxury-fashion pretension — black backgrounds, dramatic serif typography, aspirational-but-impractical presentation. Beautiful gear for real desks, not a runway (per PRODUCT.md anti-reference #3).
- **Don't** use gradient text (`background-clip: text`). Solid Shop Black or Indigo Ink only. Emphasis via weight or size.
- **Don't** use side-stripe borders (`border-left` or `border-right` > 1px) as colored accents on cards, list items, or callouts. Rewrite with full borders, background tints, or leading indicators.
- **Don't** set heading letter-spacing below -0.04em. Figtree letterforms will touch.
- **Don't** nest cards inside cards. A product card inside a setup card is a nesting violation. Use a flat list or dedicated cross-sell component.
- **Don't** use shadows at rest. If a card has a box-shadow without hover/focus, it's wrong.
- **Don't** place an eyebrow (tiny uppercase kicker) above every section heading. The product category label on cards is the only eyebrow in the system; section headings stand alone.
