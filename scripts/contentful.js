const contentful = require('contentful');

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_TOKEN,
});

async function getEntries(type) {
  const posts = [];

  try {
    const res = await client.getEntries({
      content_type: type,
      select: 'sys.id,fields.slug',
    });

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

exports.client = client;
exports.getEntries = getEntries;
exports.getFields = getFields;
