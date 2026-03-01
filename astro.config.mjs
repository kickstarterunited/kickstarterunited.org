// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

import preact from "@astrojs/preact";
import icon from "astro-icon";
import { redirects } from "./src/data/redirects.ts";

// https://astro.build/config
export default defineConfig({
  site: 'https://kickstarterunited.org/',

  redirects,

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
