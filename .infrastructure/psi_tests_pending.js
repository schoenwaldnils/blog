import github from 'octonode';

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_SHA1,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_PULL_REQUEST,
  CIRCLE_BRANCH,
} = process.env;

const REPO_SLUG = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`;
const CIRCLE_PR_NUMBER = CIRCLE_PULL_REQUEST.match(/[^/]+$/) && CIRCLE_PULL_REQUEST.match(/[^/]+$/)[0];

const BRANCH_NAME = CIRCLE_BRANCH.replace(/\//, '-');


console.log('CIRCLE_SHA1', CIRCLE_SHA1);
console.log('REPO_SLUG', REPO_SLUG);
console.log('CIRCLE_PULL_REQUEST', CIRCLE_PULL_REQUEST);
console.log('CIRCLE_BRANCH', CIRCLE_BRANCH);
console.log('BRANCH_NAME', BRANCH_NAME);
console.log('CIRCLE_PR_NUMBER', CIRCLE_PR_NUMBER);

const testUrl = `https://${BRANCH_NAME}.schoenwald.media/`;


const client = github.client(BOT_GITHUB_TOKEN);
const ghrepo = client.repo(REPO_SLUG);

console.log(ghrepo.issues(data => console.log(data)));

ghrepo.status(CIRCLE_SHA1, {
  state: 'pending',
  target_url: `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=mobile`,
  description: 'PSI test mobile pending',
  context: 'PSI',
}, (err, data, headers) => {
  console.log("error: " + err);
  console.log("data: " + data);
  console.log("headers:" + headers);
}); // created status

ghrepo.status(CIRCLE_SHA1, {
  state: 'pending',
  target_url: `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=desktop`,
  description: 'PSI test desktop',
  context: 'PSI',
}, (err, data, headers) => {
  console.log("error: " + err);
  console.log("data: " + data);
  console.log("headers:" + headers);
}); // created status
