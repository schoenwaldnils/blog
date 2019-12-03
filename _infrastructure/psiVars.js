/* eslint-disable prefer-destructuring */
export const CIRCLE_SHA1 = process.env.CIRCLE_SHA1
export const GOOGLE_PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY
/* eslint-enable prefer-destructuring */

const strategies = ['desktop', 'mobile']

const categories = [
  'accessibility',
  'best-practices',
  'performance',
  'pwa',
  'seo',
]

const combineTests = () => {
  const tests = []

  strategies.forEach(strategy => {
    tests.push({
      strategy,
      categories,
      minExpectedScore: 0.5,
    })
  })

  return tests
}

export const tests = combineTests()
