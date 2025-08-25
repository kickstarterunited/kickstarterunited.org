# frozen_string_literal: true

require 'haml'
require 'tilt/haml'

task default: :build

desc 'Build site'
task :build do
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
end

desc 'Start server'
task up: :build do
  sh 'bundle exec ruby -run -e httpd build'
end
