const contentful = require("contentful");
const Vibrant = require("node-vibrant");

const client = contentful.createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
  host: "preview.contentful.com"
});

async function getEntries(type, tag = false) {
  const entries = [];

  try {
    let res;
    if (tag) {
      res = await client.getEntries({
        content_type: type,
        select: "sys.id,fields.slug",
        "fields.tags[in]": tag
      });
    } else {
      res = await client.getEntries({
        content_type: type,
        select: "sys.id,fields.slug"
      });
    }

    res.items.map(item => {
      entries.push({
        id: item.sys.id,
        url: `/${item.fields.slug}`
      });
      return true;
    });
  } catch (exception) {
    console.error(exception);
  }
  return entries;
}

async function getFields(id) {
  if (!id) return {};
  try {
    const res = await client.getEntries({ "sys.id": id });
    const entryFields = res.items[0].fields;
    if (entryFields.image && entryFields.image.fields.file.details) {
      const imageColor = await Vibrant.from(
        `https:${entryFields.image.fields.file.url}`
      ).getPalette();
      entryFields.image.fields.file.details.color = imageColor.Muted.getHex();
    }
    return entryFields;
  } catch (exception) {
    return console.error(exception);
  }
}

async function getTags() {
  const tags = [];

  try {
    const res = await client.getEntries({
      content_type: "post",
      select: "sys.id,fields.tags"
    });

    res.items.map(item => {
      item.fields.tags.map(tag => {
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
