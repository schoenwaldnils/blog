import fetch from 'isomorphic-fetch';

const {
  CIRCLE_REPOSITORY_URL,
  CIRCLE_PR_NUMBER,
  CIRCLE_PR_REPONAME,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
} = process.env;

console.log('CIRCLE_REPOSITORY_URL', CIRCLE_REPOSITORY_URL);
console.log('CIRCLE_PR_NUMBER', CIRCLE_PR_NUMBER);
console.log('CIRCLE_PR_REPONAME', CIRCLE_PR_REPONAME);
console.log('CIRCLE_PROJECT_USERNAME', CIRCLE_PROJECT_USERNAME);
console.log('CIRCLE_PROJECT_REPONAME', CIRCLE_PROJECT_REPONAME);

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
