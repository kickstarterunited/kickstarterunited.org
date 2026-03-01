import type { ComponentProps } from "astro/types";
import DialogDemo from "./DialogDemo.astro";

type DialogDemoProps = ComponentProps<typeof DialogDemo>;

export default { component: DialogDemo };

export const Dialog = { args: {} satisfies DialogDemoProps };
