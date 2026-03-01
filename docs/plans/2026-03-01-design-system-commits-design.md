# Design System Commit Plan

Organize uncommitted design system work into 7 atomic commits, ordered by dependency layer.

## Ordering: Colors -> Astrobook -> leaf components -> migrations

### 1. Add design system color tokens

New semantic color system with oklch palettes and light/dark mode.

- ADD `src/styles/base/colors.css`
- ADD `src/styles/base/palettes.css`
- ADD `src/styles/base/Colors.astro`
- ADD `src/styles/base/Colors.stories.ts`
- PARTIAL `src/styles/global.css` - only colors.css + palettes.css imports

### 2. Apply color theming to existing layout

Add `data-theme` attributes and replace hardcoded colors with tokens.

- MODIFY `src/layouts/BaseLayout.astro` - data-theme on body/header/footer
- MODIFY `src/styles/components/page.css` - remove hardcoded white colors
- PARTIAL `src/components/SocialLinks/social-links.css` - color token + oklch only
- MODIFY `src/components/UrgentBanner/UrgentBanner.astro` - data-theme="inverse"

### 3. Set up Astrobook dev tooling

Dev-only component story viewer.

- MODIFY `package.json` - add astrobook
- MODIFY `bun.lock`
- MODIFY `astro.config.mjs` - astrobook integration
- ADD `src/styles/astrobook.css`
- ADD `src/stories/StoryLayout.astro`

### 4. Add Tooltip component

Popover tooltip using CSS anchor positioning + Interest Invokers API.

- ADD `src/components/Tooltip/Tooltip.astro`
- ADD `src/components/Tooltip/tooltip.css`
- ADD `src/components/Tooltip/TooltipTrigger.astro`
- ADD `src/components/Tooltip/TooltipDemo.astro`
- ADD `src/components/Tooltip/Tooltip.stories.ts`
- MODIFY `src/env.d.ts` - add interestfor attribute

### 5. Migrate SocialLinks to use Tooltip

Replace custom follow-the-leader JS with Tooltip component.

- MODIFY `src/components/SocialLinks/SocialLink.astro`
- MODIFY `src/components/SocialLinks/SocialLinks.astro` - remove old tooltip
- PARTIAL `src/components/SocialLinks/social-links.css` - remove tooltip CSS
- ADD `src/components/SocialLinks/SocialLinkDemo.astro`
- ADD `src/components/SocialLinks/SocialLink.stories.ts`

### 6. Add Mark and Button components

Hand-drawn highlight Mark and polymorphic Button with variants.

- ADD `src/components/Mark/Mark.astro`
- ADD `src/components/Mark/mark.css`
- ADD `src/components/Mark/MarkDemo.astro`
- ADD `src/components/Mark/Mark.stories.ts`
- ADD `src/components/Button/Button.astro`
- ADD `src/components/Button/button.css`
- ADD `src/components/Button/ButtonDemo.astro`
- ADD `src/components/Button/Button.stories.ts`
- PARTIAL `src/styles/global.css` - only button.css import

### 7. Migrate pages to Mark and Button

Replace .highlight and .btn-* from Webflow CSS with new components.

- MODIFY `src/styles/ksru-web.webflow.css` - remove .highlight + button blocks
- MODIFY `src/pages/index.astro` - use Mark
- MODIFY `src/components/UrgentBanner/UrgentBanner.css` - .highlight to .mark
- MODIFY `src/components/Nav/Nav.astro` - use Button
- MODIFY `src/components/Menu/Menu.astro` - use Button
- MODIFY `src/components/DaysOnStrike/DaysOnStrike.astro` - mt-4 margin fix
- MODIFY `src/pages/events/calendar.astro` - mt-4 margin fix
- MODIFY `src/pages/logos.astro` - btn--ghost class

## Staging notes

Three files need partial staging (`git add -p`):
- `global.css` - split between commits 1 and 6
- `social-links.css` - split between commits 2 and 5
- `ksru-web.webflow.css` is fine - both removals land in commit 7
