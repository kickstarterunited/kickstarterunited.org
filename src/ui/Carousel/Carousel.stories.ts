import type { ComponentProps } from "astro/types";
import CarouselDemo from "./CarouselDemo.astro";

type CarouselDemoProps = ComponentProps<typeof CarouselDemo>;

export default { component: CarouselDemo };

export const Carousel = { args: {} satisfies CarouselDemoProps };
