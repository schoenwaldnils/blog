module Jekyll
  class ParseTags < Generator
    def generate(site)

      rawtags = []
      for post in site.posts.docs
        for postTag in post['tags']
          postTag = postTag.downcase.strip.gsub(' ', '-').gsub(/[^\w-]/, '')
          rawtags.push(postTag)
        end
      end

      tags = []
      for siteTag in rawtags
        if siteTag != ''
          unless tags.include? siteTag
            tags.push(siteTag)
          end
        end
      end

      site.config['post_tags'] = tags

    end
  end
end
