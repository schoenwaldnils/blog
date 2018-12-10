import fetch from 'isomorphic-fetch';
import qs from 'qs';
import {
  tests,
  CIRCLE_SHA1,
  GOOGLE_PAGESPEED_API_KEY,
  testUrl,
  ghrepo,
  statusCallback,
} from './psi_vars';

async function fetchNow() {
  let counter = 0;
  try {
    const res = await fetch(testUrl)
    console.log(`URL: "${testUrl}", Status ${res.status}`);
    if (res.status === 200) {
      setTimeout(() => {
        runTests();
      }, 5000);
    } else {
      setTimeout(() => {
        fetchNow();
      }, 5000);
    }
  } catch (error) {
    counter =+ 1;
    console.error(error);
    if (counter >= 5) {
      process.exit(1);
    }
    setTimeout(() => {
      fetchNow();
    }, 5000);
  }
}

fetchNow();


const sortObjectArrayByValue = (arrayOfObjects, sortKey, reversed = false) => {
  if (arrayOfObjects.length < 1) return arrayOfObjects;

  arrayOfObjects.sort((a, b) => {
    if (Number.isInteger(a[sortKey]) && Number.isInteger(b[sortKey])) return a[sortKey] - b[sortKey];
    return a[sortKey].localeCompare(b[sortKey]);
  });

  if (reversed) return arrayOfObjects.reverse();
  return arrayOfObjects;
};



async function runTests() {
  const testResults = {
    mobile: [],
    desktop: [],
  };

  await Promise.all(tests.map(async ({ strategy, category, minExpectedScore }) => {
    try {
      const params = {
        key: GOOGLE_PAGESPEED_API_KEY,
        category,
        strategy,
        url: testUrl,
      };

      const icons = {
        'mobile': '📱',
        'destop': '💻',
      }

      const res = await fetch(`https://www.googleapis.com/pagespeedonline/v5/runPagespeed?${qs.stringify(params)}`);
      const result = await res.json();

      if (result.error) {
        throw(result.error);
      }

      const { score } = result.lighthouseResult.categories[category];

      let state = 'error';
      if (score) {
        state = score >= minExpectedScore ? 'success' : 'failure';
      }

      await testResults[strategy].push({
        category,
        score,
        state,
      });

      const target_url = `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${strategy}`;

      ghrepo.status(CIRCLE_SHA1, {
        state,
        target_url,
        description: `${state.toUpperCase()}: Score: ${100 * score}; min: ${100 * minExpectedScore}`,
        context: `PSI ${icons[strategy]} ${category}`,
      }, (err) => statusCallback(err, `Github status set "PSI test '${strategy} - ${category}' ${state}"`));
    } catch (error) {
      console.error(error);
      process.exit(1)
    }
  }));

  sortObjectArrayByValue(testResults.mobile, 'category');
  sortObjectArrayByValue(testResults.desktop, 'category');

  console.log(testResults);
}
