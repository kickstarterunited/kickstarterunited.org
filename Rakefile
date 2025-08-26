# frozen_string_literal: true

require 'haml'
require 'tilt/haml'

task default: :build

# Initialize rebuild callbacks array
@rebuild_callbacks = []

desc 'Start server with watch and hot-reloading'
task :dev do
  require_relative 'dev_server'

  puts "Starting development server with live reload..."

  # Start dev server in background thread
  dev_server = DevServer.new
  Thread.new { dev_server.start }

  # Give server time to start
  sleep 1

  # Register a callback for when watch rebuilds
  @rebuild_callbacks << -> { dev_server.reload }

  # Now run the watch task
  Rake::Task[:watch].invoke
end

desc 'Watch for changes and rebuild'
task watch: :build do
  require 'listen'

  puts "Watching for changes..."
  puts "Press Ctrl+C to stop"

  # Initial build
  Rake::Task[:build].invoke

  # Set up file watcher
  listener = Listen.to('pages', 'templates', 'static') do |modified, added, removed|
    puts "\nChanges detected:"
    puts "Modified: #{modified}" unless modified.empty?
    puts "Added: #{added}" unless added.empty?
    puts "Removed: #{removed}" unless removed.empty?

    # Rebuild
    Rake::Task[:build].reenable
    Rake::Task[:build].invoke

    # Call any registered callbacks
    @rebuild_callbacks.each(&:call)
  end

  listener.start

  # Keep the script running
  begin
    sleep
  rescue Interrupt
    puts "\nStopping watch..."
    listener.stop
  end
end

desc 'Build site'
task :build do
  puts "Building site..."
  raise 'foobar!!!!!!!'
  # Clean up old build
  rm_rf 'build'

  # Copy static files into build
  cp_r 'static', 'build'

  # Render HAML
  layout = Tilt::HamlTemplate.new('templates/layout.haml')
  Dir['pages/**/*.haml'].each do |source|
    template = Tilt::HamlTemplate.new(source)
    content  = layout.render { template.render }
    target   = source.sub(/^pages(.*?)\.haml$/, 'build\1.html')
    dirname  = File.dirname(target)
    mkdir_p dirname unless Dir.exist? dirname
    touch target
    File.open(target, 'w') { |file| file.write(content) }
  end
  puts "Build complete!"
end

desc 'Start server'
task up: :build do
  sh 'bundle exec ruby -run -e httpd build'
end
