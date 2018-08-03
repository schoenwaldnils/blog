import psi from 'psi';
import {
  tests,
  CIRCLE_SHA1,
  testUrl,
  ghrepo,
  statusCallback,
} from './psi_vars';

const threshold = 86;

tests.forEach(async ({ environment }) => {
  const results = await psi(testUrl, {
    nokey: 'true',
    strategy: environment,
    threshold,
  });
  console.log(results);
  const { ruleGroups: {
    SPEED: { score },
   } } = results;

  console.log('score: ', score );

  const target_url = `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${environment}`;

  let state = 'error';
  if (score) {
    state = score >= threshold ? 'success' : 'failure';
  }

  ghrepo.status(CIRCLE_SHA1, {
    state,
    target_url,
    description: `Test ${state}`,
    context: `PSI ${environment}`,
  }, (err) => statusCallback(err, `Github status set "PSI test \'${environment}\' ${state}"`)); // created status
});
