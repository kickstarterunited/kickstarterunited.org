import type { ComponentProps } from "astro/types";
import MarkDemo from "./MarkDemo.astro";

type MarkDemoProps = ComponentProps<typeof MarkDemo>;

export default { component: MarkDemo };

export const Mark = { args: {} satisfies MarkDemoProps };
