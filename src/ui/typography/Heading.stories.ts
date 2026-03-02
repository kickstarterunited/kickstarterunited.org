import type { ComponentProps } from "astro/types";
import HeadingDemo from "./HeadingDemo.astro";

type HeadingDemoProps = ComponentProps<typeof HeadingDemo>;

export default { component: HeadingDemo };

export const Heading = { args: {} satisfies HeadingDemoProps };
