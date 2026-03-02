import type { ComponentProps } from "astro/types";
import ButtonDemo from "./ButtonDemo.astro";

type ButtonDemoProps = ComponentProps<typeof ButtonDemo>;

export default { component: ButtonDemo };

export const Button = { args: {} satisfies ButtonDemoProps };
