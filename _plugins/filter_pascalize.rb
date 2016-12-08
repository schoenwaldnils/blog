module Jekyll
  module Pascalize
    def pascalize(string)
      return nil if string.nil?

      # Strip according to the mode
      slug = string.to_s.gsub(Regexp.new("[^[:alnum:]]+").freeze, '-')
      slug = slug.split('-').map {|s| s.capitalize }.join
      slug[0] = slug[0].downcase

      # Remove leading/trailing hyphen
      slug.gsub!(%r!^\-|\-$!i, "")

      slug
    end

  end
end

Liquid::Template.register_filter(Jekyll::Pascalize)
