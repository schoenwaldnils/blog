import { createClient } from 'contentful-management';

const client = createClient({
  accessToken: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
});

// async function getEditorInterfaceForContentType(typeId) {
//   try {
//     const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
//     const editorInterface = space.getEditorInterfaceForContentType(typeId);
//     console.log(editorInterface);
//     return editorInterface;
//   } catch (exception) {
//     return console.error(exception);
//   }
// }

async function updateField(id, field, value) {
  if (!id) return console.error('missing id');
  if (!field) return console.error('missing field');
  if (!value) return console.error('missing value');

  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const entry = await space.getEntry(id);
    entry.fields[field]['en-US'] = value;
    const res = await entry.update();
    console.log(res);
    console.log('updated', res.isUpdated());
    return res;
  } catch (exception) {
    return console.error(exception);
  }
}

async function publishEntry(id) {
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const entry = await space.getEntry(id);
    const res = await entry.publish();
    console.log(res);
    console.log('published', res.isPublished());
    return res;
  } catch (exception) {
    return console.error(exception);
  }
}

// exports.getEditorInterfaceForContentType = getEditorInterfaceForContentType;
exports.updateField = updateField;
exports.publishEntry = publishEntry;
