const strategies = [
  'desktop',
  'mobile',
];

const categories = [
  'accessibility',
  'best-practices',
  'performance',
  'pwa',
  'seo',
];

const combineTests = () => {
  const tests = [];

  strategies.forEach((strategy) => {
    tests.push({
      strategy,
      categories,
      minExpectedScore: 0.5,
    });
  });

  return tests;
};

module.exports = {
  CIRCLE_SHA1: process.env.CIRCLE_SHA1,
  GOOGLE_PAGESPEED_API_KEY: process.env.GOOGLE_PAGESPEED_API_KEY,
  tests: combineTests(),
};
