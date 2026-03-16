/**
 * Single source of truth for site redirects.
 * Used by astro.config.mjs and page components that need to check
 * whether a redirect route is active.
 */
export const redirects: Record<string, string> = {
  "/is-it-over": "/contracts/2025",
  "/events": "/events/calendar",
  "/first-contract": "/contracts/2022",
  "/boston":
    "https://actionnetwork.org/events/kickstarter-on-strike-rally-boston/",
  "/picket":
    "https://us06web.zoom.us/j/86330623364?pwd=pJl3JSb3M5LWT1ZbJRHudhNbbalUpt.1",
  "/rally": "https://us02web.zoom.us/meeting/register/plLF1q1GQvamUkXaiqDxJg",
  "/petition":
    "https://actionnetwork.org/letters/kickstarter-stop-the-retaliation-reinstate-our-teammates-now/",
  "/merch": "https://shop.worxprinting.coop/collections/ksru",
};
