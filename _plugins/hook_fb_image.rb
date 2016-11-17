Jekyll::Hooks.register :posts, :pre_render do |post|
  if post.data['header_image']
    post.data['image'] = post.data['header_image']
  end
end
