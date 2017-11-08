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
  try {
    const space = await client.getSpace(process.env.CONTENTFUL_SPACE);
    const entry = await space.getEntry(id);
    entry.fields[field]['en-US'] = value;
    const res = await entry.update();
    console.log('Updated');
    console.log(res);
    console.log(res.isPublished());
    console.log(res.isUpdated());
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
    console.log('Published');
    console.log(res);
    console.log(res.isPublished());
    return res;
  } catch (exception) {
    return console.error(exception);
  }
}

// exports.getEditorInterfaceForContentType = getEditorInterfaceForContentType;
exports.updateField = updateField;
exports.publishEntry = publishEntry;
