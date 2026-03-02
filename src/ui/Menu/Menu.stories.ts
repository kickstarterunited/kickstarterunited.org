import type { ComponentProps } from "astro/types";
import MenuDemo from "./MenuDemo.astro";

type MenuDemoProps = ComponentProps<typeof MenuDemo>;

export default { component: MenuDemo };

export const Menu = { args: {} satisfies MenuDemoProps };
