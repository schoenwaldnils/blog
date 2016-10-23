module Jekyll
  class Component < Liquid::Tag

    def initialize(tag_name, component_name, tokens)
      super
      @component_name = component_name.strip
      @ext = 'html'
    end

    def render(context)
      path = "./source/components/#{@component_name}/"
      filename = "#{@component_name}.#{@ext}"
      Find.find(path+filename) do |file|
        @file = File.open(file, 'r')
        @content = @file.read
        @file.close
      end
      @content
    end
  end
end

Liquid::Template.register_tag('component', Jekyll::Component)
