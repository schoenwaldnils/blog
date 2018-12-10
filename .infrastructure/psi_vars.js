import github from 'octonode';

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
  CIRCLE_BRANCH,
} = process.env;

export const CIRCLE_SHA1 = process.env.CIRCLE_SHA1;
export const GOOGLE_PAGESPEED_API_KEY = process.env.GOOGLE_PAGESPEED_API_KEY || 'AIzaSyAf7UuNR1g9QNohPNtn-7WcYN4oL_FmeyA';

const repoSlug = `${CIRCLE_PROJECT_USERNAME}/${CIRCLE_PROJECT_REPONAME}`;

const branchName = CIRCLE_BRANCH && CIRCLE_BRANCH.replace(/[\/|/.|_]/g, '-').replace(/@/g, '');

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
]

const combineTests = () => {
  const tests = [];

  strategies.forEach(strategy => {
    categories.forEach(category => {
      tests.push({
        strategy,
        category,
        minExpectedScore: 0.5,
      });
    });
  });

  return tests;
};

export const tests = combineTests();


const client = github.client(BOT_GITHUB_TOKEN);
export const ghrepo = client.repo(repoSlug);

export const statusCallback = (err, message) => {
  if (err) {
    console.error(err);
    process.exit(1);
    return;
  }

  return console.log('\x1b[33m%s\x1b[0m', message);  //yellow
}
