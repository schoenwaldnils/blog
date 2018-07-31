import fetch from 'isomorphic-fetch';

const {
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_PULL_REQUEST,
  CIRCLE_BRANCH,
} = process.env;

const REPO_SLUG = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`;
const CIRCLE_PR_NUMBER = CIRCLE_PULL_REQUEST.match(/[^/]+$/);

const BRANCH_NAME = CIRCLE_BRANCH.replace(/\//, '-');


console.log('REPO_SLUG', REPO_SLUG);
console.log('CIRCLE_PULL_REQUEST', CIRCLE_PULL_REQUEST);
console.log('CIRCLE_BRANCH', CIRCLE_BRANCH);
console.log('BRANCH_NAME', BRANCH_NAME);
console.log('CIRCLE_PR_NUMBER', CIRCLE_PR_NUMBER);

// const testUrl = 'http://test.schoenwald.media/'; // FIXME: url static
// const githubUrl = `https://api.github.com/repos/${TRAVIS_REPO_SLUG}/statuses/${CIRCLE_SHA1}`;

// // npm github api module?

// fetch(
//   githubUrl,
//   {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Content-Type': 'application/json',
//       Authorization: `token ${BOT_GITHUB_TOKEN}`,
//     },
//     body: {
//       state: 'pending',
//       description: 'PSI tests pending',
//       context: 'test/psi/desktop/index',
//     },
//   },
// );

exit(0);
