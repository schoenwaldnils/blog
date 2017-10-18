export const viewportsCss = {
  '--sm-viewport': '(min-width: 481px)',
  '--md-viewport': '(min-width: 621px)',
  '--lg-viewport': '(min-width: 769px)',
};

export const viewportsJs = {};

Object.keys(viewportsCss).map((key) => {
  viewportsJs[key.replace('--', '').replace('-viewport', '')] = viewportsCss[key];
  return true;
});

export default {
  viewportsCss,
  viewportsJs,
};
