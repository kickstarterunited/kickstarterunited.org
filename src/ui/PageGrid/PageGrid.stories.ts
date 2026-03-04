import type { ComponentProps } from "astro/types";
import PageGridDemo from "./PageGridDemo.astro";

type PageGridDemoProps = ComponentProps<typeof PageGridDemo>;

export default { component: PageGridDemo };

export const PageGrid = { args: {} satisfies PageGridDemoProps };
