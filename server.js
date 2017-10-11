const express = require('express');
const next = require('next');
const { client, getEntries } = require('./scripts/contentful');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();
  try {
    // CUSTOM ROUTES GO HERE
    const contentfulPages = await getEntries('page');
    contentfulPages.map((item) => {
      const { id, url } = item;
      server.get(url, (req, res) => {
        return app.render(req, res, '/page', { id });
      });
      return true;
    });

    const contentfulPosts = await getEntries('post');
    contentfulPosts.map((item) => {
      const { id, url } = item;
      server.get(url, (req, res) => {
        return app.render(req, res, '/page', { id });
      });
      return true;
    });
  } catch (exception) {
    console.error(exception);
  }

  server.get('/', async (req, res) =>
    app.render(req, res, '/index', { posts: await getEntries('post') }),
  );

  server.get('/tag/:slug', async (req, res) => {
    try {
      const postsWithTag = await client.getEntries({
        content_type: 'post',
        'fields.tags[in]': req.params.slug,
      });
      return app.render(req, res, '/tag', {
        posts: postsWithTag,
      });
    } catch (exception) {
      console.error(exception);
    }
  });

  // THIS IS THE DEFAULT ROUTE, DON'T EDIT THIS
  server.get('*', (req, res) => {
    return handle(req, res);
  });

  const port = 3000;

  server.listen(port, (err) => {
    if (err) throw err;
    console.warn(`> Ready on port ${port}...`);
  });
});
