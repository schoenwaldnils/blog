module Jekyll
  class Codepen < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      super
      @markup = markup
    end

    def render(context)
      markup_split = split_params(@markup)

      site = context.registers[:site]
      default_height = site.config['codepen']['default_height']
      default_tabs = site.config['codepen']['default_tabs']
      if (site.config['codepen']['theme_id'])
        theme_id = site.config['codepen']['theme_id']
      else
        theme_id = 'dark'
      end
      user_slug = site.config['codepen']['user']['slug']
      user_name = site.config['codepen']['user']['name']

      slug = markup_split[0].strip
      if (markup_split[1])
        height = markup_split[1].strip
      elsif (default_height)
        height = default_height
      else
        height = 300
      end
      if (markup_split[2])
        tabs = markup_split[2].strip
      elsif (default_tabs)
        tabs = default_tabs
      else
        tabs = 'css,result'
      end

      output = "<p
        data-height='#{height}'
        data-theme-id='#{theme_id}'
        data-slug-hash='#{slug}'
        data-default-tab='#{tabs}'
        data-user='#{user_slug}'
        data-embed-version='2'
        data-pen-title='#{slug}'
        class='codepen'>
        See the Pen <a href='http://codepen.io/#{user_slug}/pen/#{slug}/'>#{slug}</a> by #{user_name} (<a href='http://codepen.io/#{user_slug}'>@#{user_slug}</a>) on <a href='http://codepen.io'>CodePen</a>.</p>"
    end

    def split_params(params)
      params.split("|")
    end
  end
end

Liquid::Template.register_tag('codepen', Jekyll::Codepen)
