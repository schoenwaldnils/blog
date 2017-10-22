export const viewports = {
  sm: 481,
  md: 621,
  lg: 769,
};

export const viewportsJs = {};

Object.keys(viewports).map((key) => {
  viewportsJs[key] = `(min-width: ${viewports[key]}px)`;
  return true;
});


export const viewportsCss = {};

Object.keys(viewportsJs).map((key) => {
  viewportsCss[`--${key}-viewport`] = viewportsJs[key];
  return true;
});


export default {
  viewportsCss,
  viewportsJs,
};
