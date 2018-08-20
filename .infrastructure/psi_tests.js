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
  let counter = 0;
  try {
    const res = await fetch(testUrl)
    console.log(`URL: "${testUrl}", Status ${res.status}`);
    if (res.status === 200) {
      runTests();
    } else {
      setTimeout(() => {
        fetchNow();
      }, 5000);
    }
  } catch (error) {
    counter =+ 1;
    console.error(error);
    setTimeout(() => {
      fetchNow();
    }, 5000);
    if (counter >= 5) {
      process.exit(1)
    }
  }
}

fetchNow();


function runTests() {
  tests.forEach(async ({ environment }) => {
    try {
      const res = await fetch(`https://www.googleapis.com/pagespeedonline/v4/runPagespeed?key=${GOOGLE_PAGESPEED_API_KEY}&url=${testUrl}&strategy=${environment}`);
      const result = await res.json();
      console.log(result);
      const { ruleGroups: {
        SPEED: { score },
       } } = result;

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
