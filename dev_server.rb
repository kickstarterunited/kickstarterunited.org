#!/usr/bin/env ruby
# frozen_string_literal: true

require 'webrick'
require 'em-websocket'
require 'listen'
require 'json'

class DevServer
  LIVE_RELOAD_SCRIPT = <<~JS
    <script>
      (function() {
        var ws = new WebSocket('ws://localhost:35729');
        ws.onmessage = function(event) {
          var data = JSON.parse(event.data);
          if (data.command === 'reload') {
            console.log('Live reload: reloading page');
            window.location.reload();
          }
        };
        ws.onopen = function() {
          console.log('Live reload connected');
        };
        ws.onclose = function() {
          console.log('Live reload disconnected');
        };
      })();
    </script>
  JS

  def initialize(build_dir = 'build', port = 8080, livereload_port = 35729)
    @build_dir = build_dir
    @port = port
    @livereload_port = livereload_port
    @clients = []
  end

  def start
    start_livereload_server
    start_build_watcher
    start_http_server
  end

  def reload
    reload_clients
  end

  private

  def start_livereload_server
    Thread.new do
      EM.run do
        EM::WebSocket.run(host: "0.0.0.0", port: @livereload_port) do |ws|
          ws.onopen { |handshake|
            @clients << ws
            puts "Live reload client connected (#{@clients.length} total)"
          }

          ws.onclose {
            @clients.delete(ws)
            puts "Live reload client disconnected (#{@clients.length} remaining)"
          }
        end
      end
    end
    puts "Live reload server started on port #{@livereload_port}"
  end

  def start_build_watcher
    listener = Listen.to('build') do |modified, added, removed|
      puts "Build change detected!"
      reload_clients
    end
    listener.start
    puts "Build watcher started - listening for changes in build/"
  end

  def start_http_server
    server = WEBrick::HTTPServer.new(
      Port: @port,
      DocumentRoot: @build_dir,
      Logger: WEBrick::Log.new('/dev/null'),
      AccessLog: []
    )

    # Inject live reload script into HTML files
    server.mount_proc '/' do |req, res|
      file_path = File.join(@build_dir, req.path)
      file_path = File.join(file_path, 'index.html') if File.directory?(file_path)

      if File.exist?(file_path) && file_path.end_with?('.html')
        content = File.read(file_path)
        if content.include?('</body>')
          content = content.gsub('</body>', "#{LIVE_RELOAD_SCRIPT}</body>")
        else
          content += LIVE_RELOAD_SCRIPT
        end
        res.content_type = 'text/html'
        res.body = content
      else
        WEBrick::HTTPServlet::FileHandler.new(server, @build_dir).service(req, res)
      end
    end

    puts "Development server running at http://localhost:#{@port}"
    puts "Live reload enabled - changes will auto-refresh your browser"

    trap('INT') do
      puts "\nShutting down server..."
      EM.stop if EM.reactor_running?
      server.shutdown
    end

    server.start
  end

  def reload_clients
    return if @clients.empty?

    puts "Sending reload signal to #{@clients.length} client(s)"
    message = JSON.generate({ command: 'reload' })
    @clients.each { |client| client.send(message) }
  end
end

if __FILE__ == $0
  server = DevServer.new
  server.start
end
