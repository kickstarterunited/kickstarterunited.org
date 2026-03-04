// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";
import icon from "astro-icon";
import astrobook from "astrobook";
import { redirects } from "./src/data/redirects.ts";

const isDev = process.env.NODE_ENV === "development";

// https://astro.build/config
export default defineConfig({
  site: "https://kickstarterunited.org/",

  redirects,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    preact(),
    icon(),
    isDev
      ? astrobook({
          subpath: "/astrobook",
          directory: "src",
          css: ["./src/styles/global.css", "./src/styles/astrobook.css"],
        })
      : null,
  ].filter(Boolean),

  prefetch: {
    prefetchAll: true,
  },
});
