import type { ComponentProps } from "astro/types";
import CompositionDemo from "./CompositionDemo.astro";
type CompositionDemoProps = ComponentProps<typeof CompositionDemo>;
export default { component: CompositionDemo };
export const Composition = { args: {} satisfies CompositionDemoProps };
