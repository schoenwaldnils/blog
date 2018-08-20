import fetch from 'isomorphic-fetch';
import {
  tests,
  CIRCLE_SHA1,
  GOOGLE_PAGESPEED_API_KEY,
  testUrl,
  ghrepo,
  statusCallback,
} from './psi_vars';

const threshold = 40;


async function fetchNow() {
  const res = await fetch(testUrl)
  console.log(res);
  console.log(`URL: "${testUrl}", Status ${res.status}`);
  if (res.status === 200) {
    runTests();
  } else {
    setTimeout(() => {
      fetchNow();
    }, 5000);
  }
}

fetchNow();


function runTests() {
  tests.forEach(async ({ environment }) => {
    try {
      const results = await fetch(`https://www.googleapis.com/pagespeedonline/v4/runPagespeed?key=${GOOGLE_PAGESPEED_API_KEY}&url=${testUrl}&strategy=${environment}`);
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
        description: `${state.toUpperCase()}: Score ${score} / Threshold ${threshold}`,
        context: `PSI ${environment}`,
      }, (err) => statusCallback(err, `Github status set "PSI test \'${environment}\' ${state}"`));
    } catch (error) {
      console.error(error);
      process.exit(1)
    }
  });
}
