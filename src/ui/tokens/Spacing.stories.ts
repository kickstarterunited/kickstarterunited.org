import SpacingComponent from "./Spacing.astro";
import StoryLayout from "../../stories/StoryLayout.astro";

export default {
	component: SpacingComponent,
};

/**
 * A 4px-based, 9-step spacing scale used for all padding, margin, and gap values.
 * Steps 1-4 match Tailwind defaults. Steps 5-9 use alternating ~1.5x and ~1.33x ratios.
 */
export const Spacing = {
	args: {},
	decorators: [{ component: StoryLayout, props: { layout: "padded" } }],
};
