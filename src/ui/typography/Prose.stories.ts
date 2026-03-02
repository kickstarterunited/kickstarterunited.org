import type { ComponentProps } from "astro/types";
import ProseDemo from "./ProseDemo.astro";
type ProseDemoProps = ComponentProps<typeof ProseDemo>;
export default { component: ProseDemo };
export const Prose = { args: {} satisfies ProseDemoProps };
