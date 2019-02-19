const viewports = require('./viewports.json');

const viewportsCss = {};

Object.keys(viewports).map((key) => {
  viewportsCss[`--viewport-${key}`] = viewports[key];
  return true;
});

module.exports = viewportsCss;
