import { createClient } from 'contentful';
import Vibrant from 'node-vibrant';

const preview = !!process.env.CONTENTFUL_PREVIEW;

const client = createClient({
  space: process.env.CONTENTFUL_SPACE,
  accessToken: preview ? process.env.CONTENTFUL_PREVIEW_TOKEN : process.env.CONTENTFUL_TOKEN,
  host: preview && 'preview.contentful.com',
});

export async function getEntries(type, tag = false) {
  const entries = [];

  let entryOptions = {
    content_type: type,
    select: 'sys.id,fields.slug',
  };

  if (tag) {
    entryOptions = {
      ...entryOptions,
      'fields.tags[in]': tag,
    };
  }

  try {
    const res = await client.getEntries(entryOptions);

    res.items.forEach((item) => {
      entries.push({
        id: item.sys.id,
        url: `/${item.fields.slug}`,
      });
    });
  } catch (exception) {
    console.error(exception);
  }
  return entries;
}

export async function getFields(id) {
  if (!id) return {};
  try {
    const res = await client.getEntries({
      'sys.id': id,
      include: 2,
    });
    const entryFields = res.items[0].fields;
    if (entryFields.image && entryFields.image.fields.file.details) {
      const imageColor = await Vibrant.from(`https:${entryFields.image.fields.file.url}`).getPalette();
      entryFields.image.fields.file.details.color = imageColor.Muted.getHex();
    }
    return entryFields;
  } catch (exception) {
    return console.error(exception);
  }
}

export async function getTags() {
  const tags = [];

  try {
    const res = await client.getEntries({
      content_type: 'post',
      select: 'sys.id,fields.tags',
    });

    res.items.forEach((item) => {
      item.fields.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
    });
  } catch (exception) {
    console.error(exception);
  }
  return tags;
}


export async function fetchPathMapForNextJS(type = 'static') {
  const pathMap = {};
  const serverPaths = [];

  try {
    const contentfulPages = await getEntries('page');

    contentfulPages.forEach((query) => {
      const { url, id } = query;

      pathMap[url] = {
        page: '/page',
        query: {
          id,
        },
      };

      serverPaths.push(query);
    });
  } catch (ex) {
    console.error(ex);
  }

  if (type === 'server') {
    return serverPaths;
  }
  return pathMap;
}

export const serverPathMap = fetchPathMapForNextJS('server');

export default client;
