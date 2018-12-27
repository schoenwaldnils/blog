import fetch from 'isomorphic-fetch';
import qs from 'qs';

import { gitStatus } from './octokit';
import { previewUrl as testUrl } from './commonVars';

import {
  tests,
  CIRCLE_SHA1,
  GOOGLE_PAGESPEED_API_KEY,
} from './psiVars';

async function runPagespeed({ strategy, categories }) {
  const categoriesEdited = categories.map(category => `category=${category}`);

  const params = {
    key: GOOGLE_PAGESPEED_API_KEY,
    category: 'REPLACEME',
    strategy,
    url: testUrl,
  };

  const paramString = qs.stringify(params).replace('category=REPLACEME', categoriesEdited.join('&'));

  return fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${paramString}`)
    .then((res) => {
      if (res.status >= 400) throw new Error('Bad response from server');

      const result = res.json();

      if (result.error) throw (result.error);

      return result;
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

async function postgithubStatus({
  strategy, category, score, state, minExpectedScore,
}) {
  const targetUrl = `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${strategy}`;

  const result = await gitStatus({
    sha: CIRCLE_SHA1,
    state,
    target_url: targetUrl,
    description: `${state.toUpperCase()}: Score: ${100 * score}; min: ${100 * minExpectedScore}`,
    context: `PSI ${strategy} ${category}`,
  })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });


  if (result) {
    console.log(result);

    const message = `Github status set "PSI test '${strategy} - ${category}' ${state}"`;
    console.log('\x1b[33m%s\x1b[0m', message); // yellow
  }
}


function runTests() {
  console.log('Running PSI tests.');

  Promise.all(tests.map(async ({ strategy, categories, minExpectedScore }) => {
    const result = await runPagespeed({ strategy, categories });

    categories.forEach((category) => {
      const { score } = result.lighthouseResult.categories[category];

      let state = 'error';
      if (score) {
        state = score >= minExpectedScore ? 'success' : 'failure';
      }

      console.log({
        strategy,
        category,
        score,
        state,
        minExpectedScore,
      });

      postgithubStatus({
        strategy,
        category,
        score,
        state,
        minExpectedScore,
      });
    });
  }))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}

async function fetchNow() {
  let counter = 0;

  await fetch(testUrl)
    .then((res) => {
      console.log(`URL: "${testUrl}", Status ${res.status}`);
      if (res.status === 200) {
        setTimeout(() => runTests(), 5000);
      } else {
        throw new Error(`${res.status} Page not ready yet.`);
      }
    })
    .catch((error) => {
      counter = +1;
      console.error(counter, error);
      if (counter >= 5) {
        process.exit(1);
      }
      setTimeout(() => {
        fetchNow();
      }, 5000);
    });
}

fetchNow();
