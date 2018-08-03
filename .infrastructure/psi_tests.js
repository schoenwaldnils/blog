import psi from 'psi';
import {
  tests,
  CIRCLE_SHA1,
  testUrl,
  ghrepo,
  statusCallback,
} from './psi_vars';


tests.forEach(async ({ environment }) => {
  const results = await psi(testUrl, {
    nokey: 'true',
    strategy: environment,
    threshold: 86,
  });
  console.log(results);
  const { ruleGroups: {
    USABILITY: { score },
   } } = results;

  console.log('score: ', score );

  // const target_url = `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${environment}`;

  // ghrepo.status(CIRCLE_SHA1, {
  //   state: 'pending',
  //   target_url,
  //   description: 'Test pending',
  //   context: `PSI ${environment}`,
  // }, (err) => statusCallback(err, `Github status set "PSI test \'${environment}\' pending"`)); // created status
});
