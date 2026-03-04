# Components

Site-specific components live here. Reusable design system primitives (Button, Surface, Dialog, Menu, Tooltip, Mark, SocialLinks, Carousel, typography) have moved to `src/ui/`.

## Organization

Components use a folder structure: `.astro` file + colocated `.css` + optional `.stories.ts`/`Demo.astro`.

## Astro vs Preact

- **Astro components** (`.astro`): Default choice for static markup
- **Preact components** (`.tsx`): Only when client-side interactivity is needed

## Modern Web APIs

These components use modern web platform APIs:

- Popover API
- Invoker Commands API (`command`/`commandfor` attributes)
- Interest Invokers (`interestfor`)
- CSS anchor positioning

Custom JSX types in `src/env.d.ts` extend attributes to support these APIs.

## CSS Conventions

- **Design system tokens** use `--ksru-` prefix (e.g., `--ksru-color-text`, `--ksru-emerald-500`) - these are global, cross-component values
- **Component-level properties** use unprefixed names scoped to the component (e.g., `--mark-color`, `--tooltip-offset`)
- **Internal/private** properties use `--_` prefix (e.g., `--_menu-height`) - not part of the component's public API
- Focus rings: 3px solid outline, customizable via `--ksru-outline-color` / `--ksru-outline-offset`
