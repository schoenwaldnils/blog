import { createClient } from 'contentful';
import getConfig from 'next/config';

const {
  serverRuntimeConfig: {
    contentfulSpace,
    contentfulToken,
  } = {},
} = getConfig() || {};

export const client = createClient({
  space: contentfulSpace,
  accessToken: contentfulToken,
});

export async function getEntries(type, tag = false) {
  const entries = [];

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
      entries.push({
        id: item.sys.id,
        url: `/${item.fields.slug}`,
      });
      return true;
    });
  } catch (exception) {
    console.error(exception);
  }
  return entries;
}

export async function getFields(id) {
  try {
    const res = await client.getEntries({ 'sys.id': id });
    const entryFields = res.items[0].fields;
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
