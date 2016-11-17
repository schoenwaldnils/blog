Jekyll::Hooks.register :posts, :pre_render do |post|
  if post.data['header_image']
    puts post.data['image']
    post.data['image'] = post.data['header_image']
    puts post.data['image']
  end
end
