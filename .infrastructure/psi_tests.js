import github from 'octonode';
import psi from 'psi';

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

export const tests = [
  {
    environment: 'mobile',
    test: 'speed',
    min_expected_score: 85,
  },
  {
    environment: 'mobile',
    test: 'usability',
    min_expected_score: 85,
  },
  {
    environment: 'desktop',
    test: 'speed',
    min_expected_score: 85,
  },
  {
    environment: 'desktop',
    test: 'usability',
    min_expected_score: 85,
  },
];

tests.forEach(async ({ environment, test }) => {
  const results = await psi(testUrl, {
    nokey: 'true',
    strategy: environment,
    threshold: 86,
  });
  console.log(results);
  const { ruleGroups: {
    SPEED: { score: speed_score },
    USABILITY: { score: usability_score },
   } } = results;

  const target_url = `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${environment}`;

  ghrepo.status(CIRCLE_SHA1, {
    state: 'pending',
    target_url,
    description: `PSI test \'${environment} ${test}\' pending`,
    context: `psi/${environment}/${test}`,
  }, (err) => statusCallback(err, `Github status set "PSI test \'${environment} ${test}\' pending"`)); // created status
});
