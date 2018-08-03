import {
  tests,
  CIRCLE_SHA1,
  testUrl,
  ghrepo,
  statusCallback,
} from './psi_vars';

tests.forEach(({ environment }) => {
  ghrepo.status(CIRCLE_SHA1, {
    state: 'pending',
    target_url: `https://developers.google.com/speed/pagespeed/insights/?url=${testUrl}&tab=${environment}`,
    context: `PSI ${environment}`,
  }, (err) => statusCallback(err, `Github status set "PSI test \'${environment}\' pending"`)); // created status
});
