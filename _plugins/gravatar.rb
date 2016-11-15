require 'digest/md5'

module Jekyll
  class Gravatar < Liquid::Tag
    def initialize(tag_name, markup, tokens)
      if markup
        @markup = markup
      end
      super
    end

    def render(context)
      site = context.registers[:site]

      if @markup != ''
        mail = @markup
      else
        mail = site.config['email']
      end
      puts @markup
      puts mail
      src = 'https://www.gravatar.com/avatar/' + Digest::MD5.hexdigest(mail.strip) + '?s=200'
      puts src
      src
    end
  end
end

Liquid::Template.register_tag('gravatar', Jekyll::Gravatar)
