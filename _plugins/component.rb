module Jekyll
  class Component < Liquid::Tag
    Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

    def initialize(tag_name, markup, tokens)
      super
      if markup =~ Syntax then
        @component_name = $1.strip

        if $2.nil? then
          @params = {}
        else
          @params = $2
        end
      else
        raise "No component name provided in the \"component\" tag"
      end
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

  class ComponentBlock < Liquid::Block
    Syntax = /^\s*([^\s]+)(\s+(\d+)\s+(\d+)\s*)?/

    def initialize(tag_name, markup, tokens)
      super
      if markup =~ Syntax then
        @component_name = $1.strip

        if $2.nil? then
          @params = {}
        else
          @params = $2
        end
      else
        raise "No component name provided in the \"component\" tag"
      end
      @ext = 'html'
    end

    def render(context)
      output = super(context)
      path = "./source/components/#{@component_name}/"
      filename = "#{@component_name}.#{@ext}"
      Find.find(path+filename) do |file|
        @file = File.open(file, 'r')
        @content = @file.read
        @content.sub! '{{ content }}', output
        @file.close
      end
      @content
    end
  end
end

Liquid::Template.register_tag('component', Jekyll::Component)
Liquid::Template.register_tag('componentBlock', Jekyll::ComponentBlock)
