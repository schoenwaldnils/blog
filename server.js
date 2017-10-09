const express = require('express');
const next = require('next');
const jf = require('jsonfile');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // custom route for index
  server.get('/', (req, res) =>
    jf.readFile('./content/summary.json', (err, obj) => {
      if (err) {
        return handle(req, res);
      }
      return app.render(req, res, '/index', {
        summary: obj,
      });
    }),
  );

  // custom route for tags
  server.get('/tag/:slug', (req, res) =>
    jf.readFile('./content/summary.json', (err, obj) => {
      if (err) {
        return handle(req, res);
      }
      return app.render(req, res, '/tag', {
        tag: req.params.slug,
        summary: obj,
      });
    }),
  );

  server.get('*', (req, res) => {
    const url = req.originalUrl.replace(/\/$/, '');
    return jf.readFile(`./content${url}.json`, (err, obj) => {
      if (err) {
        return handle(req, res);
      }
      return app.render(req, res, '/post', {
        post: req.params.slug,
        postData: obj,
      });
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
});
