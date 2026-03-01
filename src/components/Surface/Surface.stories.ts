import type { ComponentProps } from "astro/types";
import SurfaceDemo from "./SurfaceDemo.astro";

type SurfaceDemoProps = ComponentProps<typeof SurfaceDemo>;

export default { component: SurfaceDemo };

export const Surface = { args: {} satisfies SurfaceDemoProps };
