// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import preact from "@astrojs/preact";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  site: 'https://kickstarterunited.org/',

  redirects: {
    "/is-it-over": "/contracts/2025",
    "/events": "/events/calendar",
    "/first-contract": "/contracts/2022",
    "/boston": "https://actionnetwork.org/events/kickstarter-on-strike-rally-boston/",
    "/picket": "https://us06web.zoom.us/j/86330623364?pwd=pJl3JSb3M5LWT1ZbJRHudhNbbalUpt.1",
    "/rally": "https://us02web.zoom.us/meeting/register/plLF1q1GQvamUkXaiqDxJg",
    "/petition": "https://actionnetwork.org/letters/kickstarter-stop-the-retaliation-reinstate-our-teammates-now/"
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  integrations: [preact(), icon()],

  prefetch: {
    prefetchAll: true
  }
});
