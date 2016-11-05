module Jekyll
  class CurrentTime < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
    end

    def render(context)
      t = Time.now.to_i
      t
    end
  end
end

Liquid::Template.register_tag('current_time', Jekyll::CurrentTime)
