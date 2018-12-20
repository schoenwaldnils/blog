import github from 'octonode';

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_BRANCH,
} = process.env;

/* eslint-disable prefer-destructuring */
export const CIRCLE_SHA1 = process.env.CIRCLE_SHA1;
export const GOOGLE_PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;
/* eslint-enable prefer-destructuring */

const repoSlug = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`;

const branchName = CIRCLE_BRANCH && CIRCLE_BRANCH.replace(/[/|/.|_]/g, '-').replace(/@/g, '');

export const testUrl = branchName ? `https://${branchName}.schoenwald.media/` : 'https://schoenwald.media/';

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

export const tests = combineTests();


const client = github.client(BOT_GITHUB_TOKEN);
export const ghrepo = client.repo(repoSlug);
