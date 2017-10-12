const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

async function getEntries(type, tag = false) {
  const posts = [];

  try {
    let res;
    if (tag) {
      res = await client.getEntries({
        content_type: type,
        select: 'sys.id,fields.slug',
        'fields.tags[in]': tag,
      });
    } else {
      res = await client.getEntries({
        content_type: type,
        select: 'sys.id,fields.slug',
      });
    }

    res.items.map((item) => {
      posts.push({
        id: item.sys.id,
        url: `/${item.fields.slug}`,
      });
      return true;
    });
  } catch (exception) {
    console.error(exception);
  }
  return posts;
}

async function getFields(id) {
  try {
    const res = await client.getEntries({ 'sys.id': id });
    const pageFields = res.items[0].fields;
    return pageFields;
  } catch (exception) {
    return console.error(exception);
  }
}

async function getTags() {
  const tags = [];

  try {
    const res = await client.getEntries({
      content_type: 'post',
      select: 'sys.id,fields.tags',
    });

    res.items.map((item) => {
      item.fields.tags.map((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
          return true;
        }
        return false;
      });
      return true;
    });
  } catch (exception) {
    console.error(exception);
  }
  return tags;
}

exports.client = client;
exports.getEntries = getEntries;
exports.getFields = getFields;
exports.getTags = getTags;
