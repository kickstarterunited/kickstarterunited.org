# frozen_string_literal: true

require 'haml'
require 'tilt/haml'

task default: :build

desc 'Start server with watch (rebuilds on file changes)'
task :dev do
  require 'listen'

  puts "Starting development server with file watching..."
  puts "Server will be available at http://localhost:8080"
  puts "Press Ctrl+C to stop"

  # Initial build
  Rake::Task[:build].invoke

  # Set up file watcher
  listener = Listen.to('pages', 'templates', 'static') do |modified, added, removed|
    puts "\nChanges detected, rebuilding..."
    Rake::Task[:build].reenable
    Rake::Task[:build].invoke
    puts "Rebuild complete!"
  end

  listener.start

  # Start server in a separate thread
  server_thread = Thread.new do
    sh 'bundle exec ruby -run -e httpd build -p 8080'
  end

  # Keep the script running
  begin
    server_thread.join
  rescue Interrupt
    puts "\nStopping development server..."
    listener.stop
    server_thread.kill
  end
end

desc 'Build site'
task :build do
  puts "Building site..."
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

desc 'Watch for changes and rebuild'
task :watch do
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

desc 'Start server'
task up: :build do
  sh 'bundle exec ruby -run -e httpd build'
end
