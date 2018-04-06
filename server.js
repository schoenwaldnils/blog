import express from 'express';
import next from 'next';
import { getEntries, getTags } from './scripts/contentful';

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(async () => {
  const server = express();

  // index
  server.get('/', async (req, res) =>
    app.render(req, res, '/', {
      posts: await getEntries('post'),
    }));

  server.get('/tag', async (req, res) =>
    app.render(req, res, '/', {
      posts: await getEntries('post'),
      tags: await getTags(),
    }));

  try {
    // Custom Pages
    const contentfulPages = await getEntries('page');
    contentfulPages.map((item) => {
      const { id, url } = item;
      server.get(url, (req, res) => {
        return app.render(req, res, '/page', {
          id,
          type: 'page',
        });
      });
      return true;
    });

    // Custom Posts
    const contentfulPosts = await getEntries('post');
    contentfulPosts.map((item) => {
      const { id, url } = item;
      server.get(url, (req, res) => {
        return app.render(req, res, '/page', {
          id,
          type: 'post',
        });
      });
      return true;
    });
  } catch (exception) {
    console.error(exception);
  }

  // Custom Tags
  server.get('/tag/:slug', async (req, res) =>
    app.render(req, res, '/', {
      posts: await getEntries('post', req.params.slug),
      tags: await getTags(),
      tag: req.params.slug,
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
