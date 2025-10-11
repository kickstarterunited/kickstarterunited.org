import type { NavLinkProps } from "./NavLink.astro";
import type { NavMenuProps } from "./NavMenu.astro";

export const sitemap: (NavLinkProps | NavMenuProps)[] = [
  {
    id: "about",
    label: "About",
    items: [
      { label: "About Us", href: "/about" },
      { label: "Oral History", href: "/oral-history" },
      {
        label: "Every Worker Needs a Union",
        href: "/every-worker-needs-a-union",
      },
      {
        label: "Contact Us",
        href: "https://docs.google.com/forms/d/e/1FAIpQLSd3JgEtyy72nD6zAwdZsIMeJ5PMg3pIOtkwR7l1uooCJI9bTA/viewform",
        target: "_blank",
      },
    ],
  },
  {
    label: "Events",
    href: "/events/calendar",
  },
  {
    id: "resources",
    label: "Resources",
    items: [
      { label: "FAQ", href: "/faq" },
      { label: "Logo Generator", href: "/logos" },
      { label: "Press", href: "/press" },
      { label: "Socials", href: "/socials" },
      { label: "Creator Assets", href: "/union-assets" },
      {
        label: "Projects our Workers Love",
        href: "/projects-our-workers-love",
      },
      { label: "How Creators Can Help", href: "/creators" },
    ],
  },
  {
    id: "contracts",
    label: "Contracts",
    title: "Contracts & Agreements",
    items: [
      { label: "2025 Contract", href: "/contracts/2025" },
      { label: "2022 Contract", href: "/contracts/2022" },
      {
        label: "May Day Severance Agreement",
        href: "/may-day-severance-agreement",
      },
    ],
  },
];
