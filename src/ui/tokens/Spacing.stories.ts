import SpacingComponent from "./Spacing.astro";
import StoryLayout from "../../stories/StoryLayout.astro";

export default {
  component: SpacingComponent,
};

/**
 * Semantic spacing tokens (--ksru-space-*) for component CSS.
 * Tailwind's default spacing scale is unchanged - these add named
 * intent for values used in component stylesheets.
 */
export const Spacing = {
  args: {},
  decorators: [{ component: StoryLayout, props: { layout: "padded" } }],
};
