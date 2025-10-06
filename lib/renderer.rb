# frozen_string_literal: true

require 'haml'

# Simple Haml renderer with caching
class Renderer
  def initialize
    @cache = {}
  end

  def render_with_haml_ext(template_name_with_haml_ext, ...)
    raise 'Template name must end with .haml' unless template_name_with_haml_ext.end_with?('.haml')

    render(template_name_with_haml_ext[...-5], ...)
  end

  def render(template_name, ...)
    (@cache[template_name] ||= Haml::Template.new("#{template_name}.haml")).render(self, ...)
  end
end
