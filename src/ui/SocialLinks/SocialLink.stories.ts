import type { ComponentProps } from "astro/types";
import SocialLinkDemo from "./SocialLinkDemo.astro";
import SocialLinksComponent from "./SocialLinks.astro";

type SocialLinkDemoProps = ComponentProps<typeof SocialLinkDemo>;
type SocialLinksProps = ComponentProps<typeof SocialLinksComponent>;

export default {
  component: SocialLinkDemo,
};

export const Default = {
  args: {} satisfies SocialLinkDemoProps,
};

export const SocialLinks = {
  component: SocialLinksComponent,
  args: {} satisfies SocialLinksProps,
};
