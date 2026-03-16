// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

import preact from "@astrojs/preact";
import icon from "astro-icon";
import astrobook from "astrobook";
import { redirects } from "./src/data/redirects.ts";

const isDev = process.env.NODE_ENV === "development";

// https://astro.build/config
export default defineConfig({
  site: "https://kickstarterunited.org/",

  fonts: [
    {
      provider: fontProviders.google(),
      name: "Jost",
      cssVariable: "--font-jost",
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
    {
      provider: fontProviders.google(),
      name: "Libre Franklin",
      cssVariable: "--font-libre-franklin",
      weights: [400, 500, 600, 700],
      styles: ["normal", "italic"],
      subsets: ["latin"],
    },
  ],

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
