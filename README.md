# kickstarterunited.org

Kickstarter United’s website

## Setup

1. Install [Node.js](https://nodejs.org/).
2. Enable pnpm via `corepack enable` (or install pnpm directly).
3. `pnpm install` to install packages.
4. `pnpm dev` to start your local dev server.

## Astro

All commands are run from the root of the project, from a terminal:

| Command               | Action                                           |
| :-------------------- | :----------------------------------------------- |
| `pnpm install`            | Installs dependencies                            |
| `pnpm dev`                | Starts local dev server at `localhost:4321`      |
| `pnpm run build`          | Build your production site to `./dist/`          |
| `pnpm preview`            | Preview your build locally, before deploying     |
| `pnpm exec astro ...`     | Run CLI commands like `astro add`, `astro check` |
| `pnpm exec astro --help`  | Get help using the Astro CLI                     |

See: [Astro documentation](https://docs.astro.build)

## Deployment

The website will be automatically deployed to GitHub Pages upon every push to the `main` branch.
