import type { ComponentProps } from "astro/types";
import TypeDemo from "./TypeDemo.astro";

type TypeDemoProps = ComponentProps<typeof TypeDemo>;

export default { component: TypeDemo };

export const Type = { args: {} satisfies TypeDemoProps };
