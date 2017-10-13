const express = require('express');
const next = require('next');
const { getEntries, getTags } = require('./scripts/contentful');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  // index
  server.get('/', async (req, res) =>
    app.render(req, res, '/index', { posts: await getEntries('post') }));

  try {
    // Custom Pages
    const contentfulPages = await getEntries('page');
    contentfulPages.map((item) => {
      const { id, url } = item;
      server.get(url, (req, res) => {
        return app.render(req, res, '/page', { id });
      });
      return true;
    });

    // Custom Posts
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

  // Custom Tags
  server.get('/tag/:slug', async (req, res) =>
    app.render(req, res, '/tag', {
      tag: req.params.slug,
      tags: await getTags(),
      posts: await getEntries('post', req.params.slug),
    }));

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
