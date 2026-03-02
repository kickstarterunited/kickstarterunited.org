# Styles

## Architecture

- Entry point: `global.css` imports `../ui/index.css` (design system) + page-level CSS
- Design system tokens and component CSS live in `src/ui/`, not here
- This directory holds page layout CSS, legacy styles, and `global.css` itself

## Color System

- **Color space:** oklch
- **Palettes:** Neutral, Emerald, Cyan, Amber, Brown, Red
- **Shades:** 11 per palette (50-950)
- **Theming:** `data-theme` attribute + `light-dark()` function
- **Derivation:** Uses `color-mix()`, not predefined variants

## Page Grid

- Named columns: `BLEED` > `FULL` > `CONTENT` (70ch max)
- Wide tier: `.page-grid__wide` (1100px)
- Subgrid nesting via `.page-grid__subgrid`

## Legacy CSS

- `ksru-web.webflow.css` (729 lines) is being migrated - **do not add to it**
- `base/legacy.css` - migration artifact from Webflow

## Modern CSS Features in Use

- `@property` custom property registration
- `@starting-style` for entry animations
- `corner-shape: squircle`
- Container queries
- `@view-transition`
