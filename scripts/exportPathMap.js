const fs = require('fs');
const { createClient } = require('contentful');

async function exportPathMap({
  space,
  accessToken,
  host = false,
}) {
  try {
    const { getEntries } = createClient({ space, accessToken, host });

    const resPages = await getEntries({
      content_type: 'page',
    });

    const resPosts = await getEntries({
      content_type: 'post',
    });

    const posts = resPosts.items.map((post) => {
      const editedPost = {
        id: post.sys.id,
        url: `/${post.fields.slug}/`,
        ...post.fields,
        image: post.fields.image ? {
          color: post.fields.image.fields.file.details.color || null,
          url: post.fields.image.fields.file.url,
          alt: post.fields.image.fields.title,
        } : null,
      };

      return editedPost;
    });

    const tags = [];

    resPosts.items.forEach((item) => {
      item.fields.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });

    const pathMap = {};

    // index
    pathMap['/'] = {
      page: '/',
      query: {
        posts,
      },
    };

    // tag overview
    pathMap['/tag'] = {
      page: '/',
      query: {
        tags,
        posts,
      },
    };

    tags.forEach((tag) => {
      pathMap[`/tag/${tag}`] = {
        page: '/',
        query: {
          tag,
          tags,
          posts: posts.filter(post => post.tags.includes(tag)),
        },
      };
    });

    resPages.items.forEach(({ sys: { id }, fields }) => {
      const {
        title,
        slug,
        image,
        description,
        date,
        tags: postTags,
        content,
      } = fields;
      const url = `/${slug}/`;

      pathMap[url] = {
        page: '/page',
        query: {
          id,
        },
      };

      const data = JSON.stringify({
        type: 'page',
        fields: {
          id,
          title,
          slug,
          image: image ? {
            url: image.fields.file.url,
            alt: image.fields.title,
          } : null,
          description,
          date: date || null,
          tags: postTags || null,
          content,
        },
      });

      fs.writeFile(`./source/contentfulPages/${id}.json`, data, (writeErr) => {
        if (writeErr) return console.log(writeErr);
      });

    });


    resPosts.items.forEach(({ sys: { id }, fields }) => {
      const {
        title,
        slug,
        image,
        description,
        date,
        tags: postTags,
        content,
      } = fields;
      const url = `/${slug}/`;

      pathMap[url] = {
        page: '/page',
        query: {
          id,
        },
      };

      const data = JSON.stringify({
        type: 'post',
        fields: {
          id,
          title,
          slug,
          image: image ? {
            url: image.fields.file.url,
            alt: image.fields.title,
          } : null,
          description,
          date: date || null,
          tags: postTags || null,
          content,
        },
      });

      fs.writeFile(`./source/contentfulPages/${id}.json`, data, (writeErr) => {
        if (writeErr) return console.log(writeErr);
      });
    });


    return pathMap;
  } catch (error) {
    console.error(error);
  }
}

module.exports = exportPathMap;
