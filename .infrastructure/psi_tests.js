import psi from 'psi';
import {
  tests,
  CIRCLE_SHA1,
  testUrl,
  ghrepo,
  statusCallback,
} from './psi_vars';

const threshold = 40;

tests.forEach(async ({ environment }) => {
  let state = 'error';

  try {
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

    if (score) {
      state = score >= threshold ? 'success' : 'failure';
    }
  } catch (error) {
    console.error(error);
  }

  ghrepo.status(CIRCLE_SHA1, {
    state,
    target_url,
    description: `${state.toUpperCase()}: Score ${score} / Threshold ${threshold}`,
    context: `PSI ${environment}`,
  }, (err) => statusCallback(err, `Github status set "PSI test \'${environment}\' ${state}"`));
});
