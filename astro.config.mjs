// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite'

// https://astro.build/config
export default defineConfig({
  site: 'https://kickstarterunited.org/',
  redirects: {
    "/events": "/events/calendar",
    "/first-contract": "/contracts/2022",
    "/pickets/1": "https://us06web.zoom.us/webinar/register/WN_IlRTeoRrRYGlqzK4d2dcbQ",
    "/pickets/2": "https://us06web.zoom.us/webinar/register/WN_4wYSXn3DTDSKxym7vKGXOw",
    "/pickets/3": "https://us06web.zoom.us/j/85647234791?pwd=waI7hgqpLk2DGT0bzHlGWT99ZNmTAQ.1",
    "/pickets/4": "https://us06web.zoom.us/j/86774183137?pwd=US2oOVlVT9uvD8LC7UTrthevBBUtOm.1"
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
});
