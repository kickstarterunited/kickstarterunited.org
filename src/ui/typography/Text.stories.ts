import type { ComponentProps } from "astro/types";
import TextDemo from "./TextDemo.astro";

type TextDemoProps = ComponentProps<typeof TextDemo>;

export default { component: TextDemo };

export const Text = { args: {} satisfies TextDemoProps };
