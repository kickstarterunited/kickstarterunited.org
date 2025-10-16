// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: 'https://kickstarterunited.org/',

  redirects: {
    "/events": "/events/calendar",
    "/first-contract": "/contracts/2022",
    "/boston": "https://actionnetwork.org/events/kickstarter-on-strike-rally-boston/",
    "/picket": "https://us06web.zoom.us/j/86330623364?pwd=pJl3JSb3M5LWT1ZbJRHudhNbbalUpt.1"
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  },

  integrations: [preact()]
});
