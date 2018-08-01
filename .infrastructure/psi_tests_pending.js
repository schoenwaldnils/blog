import github from 'octonode';
import { tests } from './psi_tests';

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_SHA1,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_BRANCH,
} = process.env;

const REPO_SLUG = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`;

const BRANCH_NAME = CIRCLE_BRANCH.replace(/\//, '-');

const testUrl = `https://${BRANCH_NAME}.schoenwald.media/`;


const client = github.client(BOT_GITHUB_TOKEN);
const ghrepo = client.repo(REPO_SLUG);

const statusCallback = (err, message) => {
  if (err) {
    console.error(err.red);
    process.exit(0);
    return;
  }

  return console.log('\x1b[33m%s\x1b[0m', message);  //yellow
}

tests.forEach(({ environment, test }) => {
  ghrepo.status(CIRCLE_SHA1, {
    state: 'pending',
    target_url: `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${environment}`,
    description: `PSI test \'${environment} ${test}\' pending`,
    context: `psi/${environment}/${test}`,
  }, (err) => statusCallback(err, `Github status set "PSI test \'${environment} ${test}\' pending"`)); // created status
});
