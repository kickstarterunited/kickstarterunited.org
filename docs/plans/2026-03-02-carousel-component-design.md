# Carousel Component Design

Progressive enhancement carousel using CSS Overflow Module Level 5 primitives with JS fallback.

## Goals

- Use native CSS `::scroll-button()` when available (Chrome 135+)
- Fall back to HTML buttons + vanilla JS when not supported
- Layout-agnostic: component renders internals in the same DOM order as CSS pseudo-elements; consumer applies positioning/sizing/colors via CSS
- For now: scroll buttons only (markers, pages, etc. are future work)

## Component API

```astro
<Carousel scrollButtons>
  <slot name="prev-button"><!-- custom prev content --></slot>
  <slot name="next-button"><!-- custom next content --></slot>
  <CarouselItem itemLabel="Item 1">...</CarouselItem>
  <CarouselItem itemLabel="Item 2">...</CarouselItem>
</Carousel>
```

### Props

| Prop            | Type      | Default | Description                     |
| --------------- | --------- | ------- | ------------------------------- |
| `scrollButtons` | `boolean` | `false` | Render prev/next scroll buttons |

### Slots

| Slot          | Default | Description                     |
| ------------- | ------- | ------------------------------- |
| (default)     | -       | Carousel items                  |
| `prev-button` | `‹`     | Content for the previous button |
| `next-button` | `›`     | Content for the next button     |

### CSS Custom Properties

| Property                  | Default                | Description                       |
| ------------------------- | ---------------------- | --------------------------------- |
| `--carousel-snap-align`   | `center`               | Snap alignment for items          |
| `--carousel-prev-content` | `"\2039" / "Previous"` | CSS scroll-button content (left)  |
| `--carousel-next-content` | `"\203A" / "Next"`     | CSS scroll-button content (right) |

## DOM Structure

Matches the CSS pseudo-element placement order from the spec:

```html
<div class="carousel carousel--buttons" data-carousel>
  <button class="carousel__btn" data-dir="prev" aria-label="Previous">
    <!-- slot: prev-button -->
  </button>
  <button class="carousel__btn" data-dir="next" aria-label="Next">
    <!-- slot: next-button -->
  </button>
  <div class="carousel__scroller">
    <!-- slot: default (carousel items) -->
  </div>
</div>
```

## Three-Layer Progressive Enhancement

### Layer 1: Base CSS (all browsers)

- `.carousel__scroller`: `overflow-x: auto`, `scroll-snap-type: x mandatory`, `scroll-behavior: smooth`
- `.carousel__scroller > *`: snap alignment via `--carousel-snap-align`
- `.carousel__btn`: minimal reset, disabled state
- No layout, positioning, sizing, gaps, or colors - all consumer concerns

### Layer 2: CSS Scroll-Buttons (Chrome 135+)

```css
@supports selector(::scroll-button(*)) {
  .carousel--buttons .carousel__btn {
    display: none;
  }
  .carousel--buttons .carousel__scroller::scroll-button(left) {
    content: var(--carousel-prev-content, "\2039"/ "Previous");
  }
  .carousel--buttons .carousel__scroller::scroll-button(right) {
    content: var(--carousel-next-content, "\203A"/ "Next");
  }
}
```

HTML buttons hidden; native pseudo-elements take over.

### Layer 3: JS Fallback (inline script)

Gated behind `!CSS.supports("selector(::scroll-button(*))")`. For each `[data-carousel]`:

- Attach click handlers to `[data-dir]` buttons
- Scroll by one item width + gap per click
- Update `disabled` attribute on scroll (boundary detection)

## File Plan

```
src/ui/Carousel/
  Carousel.astro          # Component
  CarouselItem.astro      # Unchanged
  carousel.css            # Base + @supports layers
  Carousel.stories.ts     # Astrobook story
  CarouselDemo.astro      # 3 demo configurations
```

Old Carousel.astro and carousel.css are deleted (unused).

## Demo Plan

### Demo 1: Basic with buttons

Horizontal card carousel. Consumer CSS sets grid layout, gap, item sizing, and positions buttons at carousel edges.

### Demo 2: Custom button content

Named slots with Icon components. CSS custom properties for pseudo-element equivalents.

### Demo 3: Minimal (no buttons)

Just the snap scroller. Shows the component works standalone.

Each demo includes inline consumer CSS to make the boundary between component and consumer explicit.

---

## Implementation Plan

**Goal:** Build a progressive-enhancement Carousel component with CSS `::scroll-button()` support and JS fallback.

**Architecture:** Astro component with three layers - base CSS for all browsers, `@supports` block for native CSS scroll-buttons, inline `<script>` for JS fallback. Layout-agnostic: component provides scroll/snap behavior and button wiring only; consumers apply their own layout CSS.

**Tech Stack:** Astro 5, Tailwind CSS v4, vanilla JS, CSS Overflow Module Level 5

---

### Task 1: Delete old Carousel component

**Files:**

- Delete: `src/ui/Carousel/Carousel.astro`
- Delete: `src/ui/Carousel/carousel.css`

**Step 1: Delete old files**

```bash
rm src/ui/Carousel/Carousel.astro src/ui/Carousel/carousel.css
```

**Step 2: Verify CarouselItem.astro still exists**

```bash
ls src/ui/Carousel/
```

Expected: Only `CarouselItem.astro` remains.

**Step 3: Verify build still works**

```bash
bun run build
```

Expected: Clean build (old Carousel was unused).

**Step 4: Commit**

```bash
git add -A src/ui/Carousel/
git commit -m "chore: remove unused CSS-only Carousel component"
```

---

### Task 2: Create carousel.css (Layer 1 + Layer 2)

**Files:**

- Create: `src/ui/Carousel/carousel.css`

**Step 1: Write the CSS file**

```css
@layer components {
  /* ── Layer 1: Base (all browsers) ── */

  .carousel__scroller {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    overscroll-behavior-x: contain;
  }

  .carousel__scroller > * {
    scroll-snap-align: var(--carousel-snap-align, center);
  }

  .carousel__btn {
    all: unset;
    box-sizing: border-box;
    cursor: pointer;
  }

  .carousel__btn:disabled {
    cursor: not-allowed;
  }

  /* ── Layer 2: CSS Scroll-Buttons (Chrome 135+) ── */

  @supports selector(::scroll-button(*)) {
    .carousel--buttons .carousel__btn {
      display: none;
    }

    .carousel--buttons .carousel__scroller {
      scrollbar-width: none;
    }

    .carousel--buttons .carousel__scroller::scroll-button(left) {
      content: var(--carousel-prev-content, "\2039"/ "Previous");
    }

    .carousel--buttons .carousel__scroller::scroll-button(right) {
      content: var(--carousel-next-content, "\203A"/ "Next");
    }
  }
}
```

**Step 2: Verify it compiles**

```bash
bun run build
```

Expected: Clean build (CSS is loaded on-demand via import, nothing references it yet).

**Step 3: Commit**

```bash
git add src/ui/Carousel/carousel.css
git commit -m "feat(Carousel): add base + CSS scroll-button styles"
```

---

### Task 3: Create Carousel.astro (template + JS fallback)

**Files:**

- Create: `src/ui/Carousel/Carousel.astro`

**Step 1: Write the component**

```astro
---
import type { HTMLAttributes } from "astro/types";

import "./carousel.css";

/**
 * Progressive-enhancement carousel with CSS `::scroll-button()` and JS fallback.
 *
 * Layout-agnostic: the component handles scroll-snap and button wiring.
 * Apply your own CSS to `.carousel`, `.carousel__btn`, and `.carousel__scroller`
 * for layout, sizing, and visual styling.
 *
 * @see CarouselDemo.astro and Carousel.stories.ts for usage examples.
 */
interface Props extends HTMLAttributes<"div"> {
  /**
   * Render prev/next scroll buttons.
   *
   * When CSS `::scroll-button()` is supported, native pseudo-elements handle
   * scrolling and the HTML buttons are hidden. Otherwise, an inline script
   * wires the HTML buttons with click-to-scroll and boundary detection.
   *
   * Customize button content with the `prev-button` and `next-button` named slots.
   * Customize CSS pseudo-element content with `--carousel-prev-content` and
   * `--carousel-next-content` custom properties.
   */
  scrollButtons?: boolean;
}

const { scrollButtons = false, class: cls, ...props } = Astro.props;
---

<div
  {...props}
  class:list={["carousel", { "carousel--buttons": scrollButtons }, cls]}
  data-carousel
>
  {
    scrollButtons && (
      <>
        <button class="carousel__btn" data-dir="prev" aria-label="Previous">
          <slot name="prev-button">&lsaquo;</slot>
        </button>
        <button class="carousel__btn" data-dir="next" aria-label="Next">
          <slot name="next-button">&rsaquo;</slot>
        </button>
      </>
    )
  }
  <div class="carousel__scroller">
    <slot />
  </div>
</div>

<script>
  if (!CSS.supports("selector(::scroll-button(*))")) {
    for (const root of document.querySelectorAll<HTMLElement>(
      "[data-carousel].carousel--buttons",
    )) {
      const scroller = root.querySelector<HTMLElement>(".carousel__scroller");
      const prevBtn =
        root.querySelector<HTMLButtonElement>('[data-dir="prev"]');
      const nextBtn =
        root.querySelector<HTMLButtonElement>('[data-dir="next"]');

      if (!scroller || !prevBtn || !nextBtn) continue;

      const updateButtons = () => {
        const { scrollLeft, scrollWidth, clientWidth } = scroller;
        prevBtn.disabled = scrollLeft <= 2;
        nextBtn.disabled = scrollLeft >= scrollWidth - clientWidth - 2;
      };

      const scrollByItem = (dir: number) => {
        const firstChild = scroller.firstElementChild;
        if (!firstChild) return;
        const gap = parseFloat(getComputedStyle(scroller).columnGap) || 0;
        scroller.scrollBy({
          left: (firstChild.offsetWidth + gap) * dir,
          behavior: "smooth",
        });
      };

      prevBtn.addEventListener("click", () => scrollByItem(-1));
      nextBtn.addEventListener("click", () => scrollByItem(1));
      scroller.addEventListener("scroll", updateButtons, { passive: true });
      updateButtons();
    }
  }
</script>
```

**Step 2: Run type check**

```bash
bun astro check
```

Expected: No errors from the new component.

**Step 3: Verify build**

```bash
bun run build
```

Expected: Clean build.

**Step 4: Commit**

```bash
git add src/ui/Carousel/Carousel.astro
git commit -m "feat(Carousel): add component with JS scroll-button fallback"
```

---

### Task 4: Create CarouselDemo.astro and Carousel.stories.ts

**Files:**

- Create: `src/ui/Carousel/CarouselDemo.astro`
- Create: `src/ui/Carousel/Carousel.stories.ts`

**Step 1: Write the demo component**

Create `src/ui/Carousel/CarouselDemo.astro` with three sections:

1. **Basic with buttons** - A horizontal card carousel. Consumer CSS uses grid layout on `.carousel__scroller`, anchor-positions the buttons at the scroller edges, and styles the buttons with project tokens.
2. **Custom button content** - Uses `prev-button` / `next-button` named slots with `astro-icon` `Icon` components. Sets `--carousel-prev-content` / `--carousel-next-content` for the CSS pseudo-element equivalents.
3. **Minimal (no buttons)** - Just `<Carousel>` with items. Consumer CSS adds grid + gap on the scroller only.

Each section includes its consumer CSS in a scoped `<style>` block so the separation is visible. Use colored `Surface` or simple `<div>` cards as carousel items. 5-8 items per carousel so scrolling is demonstrated.

Use the project's design tokens (`--ksru-color-*`, `--ksru-color-border`, etc.) in the consumer styles. See `src/ui/Button/ButtonDemo.astro` for the demo structure pattern (sections with headings in a grid).

**Step 2: Write the story file**

```typescript
// src/ui/Carousel/Carousel.stories.ts
import type { ComponentProps } from "astro/types";
import CarouselDemo from "./CarouselDemo.astro";

type CarouselDemoProps = ComponentProps<typeof CarouselDemo>;

export default { component: CarouselDemo };

export const Carousel = { args: {} satisfies CarouselDemoProps };
```

**Step 3: Run type check and build**

```bash
bun astro check && bun run build
```

Expected: No errors.

**Step 4: Visually verify in dev server**

```bash
bun dev
```

Open Astrobook and verify the Carousel story renders all three demo sections. Check:

- Basic: buttons visible, clicking scrolls one item, disabled at boundaries
- Custom: icon content in buttons
- Minimal: smooth snap scrolling without buttons
- Both light and dark themes

**Step 5: Commit**

```bash
git add src/ui/Carousel/CarouselDemo.astro src/ui/Carousel/Carousel.stories.ts
git commit -m "feat(Carousel): add story and demo with 3 consumer configurations"
```
