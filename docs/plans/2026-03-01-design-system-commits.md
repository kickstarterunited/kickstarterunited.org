# Design System Commits - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Organize uncommitted design system work into 7 atomic commits, each building on the last.

**Architecture:** All code already exists in the working tree. This plan stages and commits files in dependency order: color tokens first, then dev tooling, then leaf components, then migrations that wire components into existing pages.

**Tech Stack:** git (partial staging via `git add -p` for shared files)

**Working directory:** `kickstarterunited.org/`

---

### Task 1: Commit color tokens

Stage and commit the new color system foundation.

**Files:**
- Add: `src/styles/base/colors.css`
- Add: `src/styles/base/palettes.css`
- Add: `src/styles/base/Colors.astro`
- Add: `src/styles/base/Colors.stories.ts`
- Partial: `src/styles/global.css` (first hunk only - colors + palettes imports)

**Step 1: Stage new color files**

```bash
git add src/styles/base/colors.css src/styles/base/palettes.css src/styles/base/Colors.astro src/styles/base/Colors.stories.ts
```

**Step 2: Partially stage global.css**

`global.css` has two hunks. Accept the FIRST hunk (colors.css + palettes.css imports), reject the SECOND (button.css import).

```bash
# Interactive: answer y to first hunk, n to second
git add -p src/styles/global.css
```

Hunk 1 (ACCEPT - `y`): adds `@import "./base/colors.css"` and `@import "./base/palettes.css"` after `@import "tailwindcss"`
Hunk 2 (REJECT - `n`): adds `@import "../components/Button/button.css"` inside `@layer components`

**Step 3: Verify staging**

```bash
git diff --cached --stat
```

Expected: 5 files (4 new + global.css partial)

**Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
Add design system color tokens

Introduce oklch color palettes (neutral, emerald, cyan, amber, brown, red)
and semantic color tokens with light/dark mode support via light-dark().
EOF
)"
```

**Step 5: Verify**

```bash
git log --oneline -1
git diff --stat  # should still show remaining uncommitted changes
```

---

### Task 2: Commit color theming migration

Apply the new color tokens to existing layout components.

**Files:**
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/components/page.css`
- Partial: `src/components/SocialLinks/social-links.css` (color changes only, not tooltip removal)
- Modify: `src/components/UrgentBanner/UrgentBanner.astro`

**Step 1: Stage full-file changes**

```bash
git add src/layouts/BaseLayout.astro src/styles/components/page.css src/components/UrgentBanner/UrgentBanner.astro
```

**Step 2: Partially stage social-links.css**

`social-links.css` has 4 hunks. Accept the first 3 (color token + oklch changes), reject the last (tooltip CSS deletion).

```bash
git add -p src/components/SocialLinks/social-links.css
```

Hunk 1 (ACCEPT - `y`): adds `color: var(--ksru-color-icon);` to `.social-link__list`
Hunk 2 (ACCEPT - `y`): changes `srgb` to `oklch` in `:hover`
Hunk 3 (ACCEPT - `y`): changes `srgb` to `oklch` in `:active`
Hunk 4 (REJECT - `n`): removes all the tooltip/arrow CSS (large deletion block)

**Step 3: Verify staging**

```bash
git diff --cached --stat
```

Expected: 4 files changed

**Step 4: Commit**

```bash
git commit -m "$(cat <<'EOF'
Apply color theming to layout

Add data-theme attributes to body, header, and footer for light/dark mode.
Replace hardcoded color values with semantic tokens in page and social links.
EOF
)"
```

---

### Task 3: Commit Astrobook setup

Stage and commit the dev-only component story viewer.

**Files:**
- Modify: `package.json`
- Modify: `bun.lock`
- Modify: `astro.config.mjs`
- Add: `src/styles/astrobook.css`
- Add: `src/stories/StoryLayout.astro`

**Step 1: Stage all files**

```bash
git add package.json bun.lock astro.config.mjs src/styles/astrobook.css src/stories/StoryLayout.astro
```

**Step 2: Verify staging**

```bash
git diff --cached --stat
```

Expected: 5 files (3 modified + 2 new)

**Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
Set up Astrobook for component stories

Add astrobook integration (dev-only) with custom styles and story layout.
Available at /astrobook during development.
EOF
)"
```

---

### Task 4: Commit Tooltip component

New popover-based tooltip using CSS anchor positioning and Interest Invokers API.

**Files:**
- Add: `src/components/Tooltip/Tooltip.astro`
- Add: `src/components/Tooltip/tooltip.css`
- Add: `src/components/Tooltip/TooltipTrigger.astro`
- Add: `src/components/Tooltip/TooltipDemo.astro`
- Add: `src/components/Tooltip/Tooltip.stories.ts`
- Modify: `src/env.d.ts`

**Step 1: Stage all files**

```bash
git add src/components/Tooltip/ src/env.d.ts
```

**Step 2: Verify staging**

```bash
git diff --cached --stat
```

Expected: 6 files (5 new + env.d.ts modified)

**Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
Add Tooltip component

Popover-based tooltip using CSS anchor positioning and the Interest
Invokers API (interestfor attribute) for hover/focus triggering.
EOF
)"
```

---

### Task 5: Commit SocialLinks tooltip migration

Replace the custom follow-the-leader JS tooltip with the new Tooltip component.

**Files:**
- Modify: `src/components/SocialLinks/SocialLink.astro`
- Modify: `src/components/SocialLinks/SocialLinks.astro`
- Remaining: `src/components/SocialLinks/social-links.css` (tooltip CSS deletion)
- Add: `src/components/SocialLinks/SocialLinkDemo.astro`
- Add: `src/components/SocialLinks/SocialLink.stories.ts`

**Step 1: Stage all SocialLinks files**

The remaining unstaged change in `social-links.css` is exactly the tooltip removal we want, so stage the whole directory.

```bash
git add src/components/SocialLinks/
```

**Step 2: Verify staging**

```bash
git diff --cached --stat
```

Expected: 5 files (3 modified + 2 new)

**Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
Migrate SocialLinks to Tooltip component

Replace custom follow-the-leader JS tooltip and CSS anchor positioning
with the declarative Tooltip component using the Interest Invokers API.
EOF
)"
```

---

### Task 6: Commit Mark and Button components

New hand-drawn highlight and polymorphic button with variants.

**Files:**
- Add: `src/components/Mark/Mark.astro`
- Add: `src/components/Mark/mark.css`
- Add: `src/components/Mark/MarkDemo.astro`
- Add: `src/components/Mark/Mark.stories.ts`
- Add: `src/components/Button/Button.astro`
- Add: `src/components/Button/button.css`
- Add: `src/components/Button/ButtonDemo.astro`
- Add: `src/components/Button/Button.stories.ts`
- Remaining: `src/styles/global.css` (button.css import)

**Step 1: Stage all files**

The remaining unstaged change in `global.css` is exactly the button.css import, so stage it fully.

```bash
git add src/components/Mark/ src/components/Button/ src/styles/global.css
```

**Step 2: Verify staging**

```bash
git diff --cached --stat
```

Expected: 9 files (8 new + global.css)

**Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
Add Mark and Button components

Mark: hand-drawn text highlight with SVG displacement filter and
six color variants. Button: polymorphic component with primary,
accent, ghost, and unstyled variants.
EOF
)"
```

---

### Task 7: Commit page migrations to Mark and Button

Replace old .highlight and button classes from Webflow CSS with the new components.

**Files:**
- Modify: `src/styles/ksru-web.webflow.css`
- Modify: `src/pages/index.astro`
- Modify: `src/components/UrgentBanner/UrgentBanner.css`
- Modify: `src/components/Nav/Nav.astro`
- Modify: `src/components/Menu/Menu.astro`
- Modify: `src/components/DaysOnStrike/DaysOnStrike.astro`
- Modify: `src/pages/events/calendar.astro`
- Modify: `src/pages/logos.astro`

**Step 1: Stage all remaining changes**

At this point, all remaining unstaged changes belong to this commit.

```bash
git add src/styles/ksru-web.webflow.css src/pages/index.astro src/components/UrgentBanner/UrgentBanner.css src/components/Nav/Nav.astro src/components/Menu/Menu.astro src/components/DaysOnStrike/DaysOnStrike.astro src/pages/events/calendar.astro src/pages/logos.astro
```

**Step 2: Verify staging and clean working tree**

```bash
git diff --cached --stat
git status
```

Expected: 8 files changed, working tree should be clean (except docs/plans/)

**Step 3: Commit**

```bash
git commit -m "$(cat <<'EOF'
Migrate pages to Mark and Button components

Replace .highlight spans with <Mark> and raw button/anchor elements with
<Button>. Remove extracted styles from legacy Webflow CSS.
EOF
)"
```

**Step 4: Final verification**

```bash
git log --oneline -7
git status
```

Expected: 7 new commits, clean working tree (except docs/plans/)
