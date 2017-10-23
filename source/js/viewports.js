const viewports = {
  sm: 481,
  md: 621,
  lg: 769,
};

const viewportsJs = {};

Object.keys(viewports).map((key) => {
  viewportsJs[key] = `(min-width: ${viewports[key]}px)`;
  return true;
});


const viewportsCss = {};

Object.keys(viewportsJs).map((key) => {
  viewportsCss[`--${key}-viewport`] = viewportsJs[key];
  return true;
});

exports.viewports = viewports;
exports.viewportsJs = viewportsJs;
exports.viewportsCss = viewportsCss;
