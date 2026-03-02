import type { ComponentProps } from "astro/types";
import TooltipDemo from "./TooltipDemo.astro";

type TooltipDemoProps = ComponentProps<typeof TooltipDemo>;

export default {
  component: TooltipDemo,
};

export const Tooltip = {
  args: {} satisfies TooltipDemoProps,
};
