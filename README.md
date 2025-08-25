# kickstarterunited.org

Kickstarter United’s website

## Development

1. Install Ruby

   ```
   rbenv install --skip-existing
   ```

1. Install Ruby dependencies

   ```
   bundle install
   ```

1. Start development server

   ```
   rake dev
   ```

   This will build the site, start a web server at <http://localhost:8080/>, and automatically rebuild when you make changes to files. Press Ctrl+C to stop.

## Manual Build and Serve

If you need to build or serve the site manually without file watching:

1. Build the site

   ```bash
   rake build
   ```

   The built site will get written to the `build/` directory.

1. Serve the site

   ```bash
   rake up
   ```

   This will start a web server that will host the site. This can be accessed at <http://localhost:8080/>.

## Deployment

The website will be automatically deployed to GitHub Pages upon every push to the `main` branch.
