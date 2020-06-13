# kickstarterunited.org

Kickstarter United’s website

## Development

1. Install Ruby

   ```
   rbenv install
   ```

1. Install Ruby dependencies

   ```
   bundle install
   ```

1. Build the site

   ```
   ./build-site
   ```

   The built site will get written to the `build/` directory.

1. Serve the site

   ```
   ./serve-site
   ```

   This will start a web server that will host the site. This can be accessed at <http://localhost:8080/>.

## Deployment

The website will be automatically deployed to GitHub Pages upon every push to the `master` branch.
