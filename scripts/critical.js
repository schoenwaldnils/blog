/* eslint-disable */
const critical = require('critical');

const base = 'out';
const dest = '../out/build/main_critical.css';

critical.generate({
  base,
  src: './index.html',
  dest,
  width: 600,
  height: 768,
  minify: true,
}, (err, output) => {
  if (err) {
    console.error(err);
  } else if (output) {
    console.log('Generated critical CSS -> build/main_critical.css');
  }
});
