import ColorsComponent from "./Colors.astro";
import StoryLayout from "../../stories/StoryLayout.astro";

export default {
  component: ColorsComponent,
};

/**
 * Semantic color tokens (--ksru-color-*) that adapt to light/dark mode
 * automatically. Always prefer these for UI elements.
 */
export const Colors = {
  args: {},
  decorators: [{ component: StoryLayout, props: { layout: "padded" } }],
};

/**
 * Raw palette shades (--ksru-{family}-{shade}) are not mode-safe.
 * Use these sparingly for one-off decorative styles. For mode-safe
 * usage, wrap in light-dark() combinations.
 */
export const Palettes = {
  args: { view: "shades" },
  decorators: [{ component: StoryLayout, props: { layout: "padded" } }],
};
