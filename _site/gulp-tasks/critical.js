const critical = require('critical').stream;
// import { steam as critical } from 'critical';

module.exports = () => critical({
  inline: false,
  base: '_site',
  src: 'index.html',
  dest: 'build/main-critical.css',
  width: 320,
  height: 480,
  minify: true,
}).on('error', err => console.log(err.message));
