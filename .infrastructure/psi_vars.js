import github from 'octonode';

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_BRANCH,
} = process.env;

export const CIRCLE_SHA1 = process.env.CIRCLE_SHA1;
export const GOOGLE_PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY;

const repoSlug = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`;

const branchName = CIRCLE_BRANCH.replace(/[\/|/.]/g, '-');

export const testUrl = `https://${branchName}.schoenwald.media/`;


export const tests = [
  {
    environment: 'mobile',
    test: 'usability',
    min_expected_score: 85,
  },
  {
    environment: 'desktop',
    test: 'usability',
    min_expected_score: 85,
  },
];

const client = github.client(BOT_GITHUB_TOKEN);
export const ghrepo = client.repo(repoSlug);

export const statusCallback = (err, message) => {
  if (err) {
    console.error(err);
    process.exit(0);
    return;
  }

  return console.log('\x1b[33m%s\x1b[0m', message);  //yellow
}
