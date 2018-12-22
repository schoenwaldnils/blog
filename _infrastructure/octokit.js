import rest from '@octokit/rest';

const octokit = rest();

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
} = process.env;

if (!BOT_GITHUB_TOKEN) throw new Error('Environment variable <BOT_NAME> undefined!');

octokit.authenticate({
  type: 'oauth',
  token: BOT_GITHUB_TOKEN,
});

const repoOptions = {
  owner: CIRCLE_PROJECT_USERNAME,
  repo: CIRCLE_PROJECT_REPONAME,
};

export const gitComments = (number) => {
  return octokit.issues.listComments({
    ...repoOptions,
    number,
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

export const gitCreateComment = (number, body) => {
  return octokit.issues.createComment({
    ...repoOptions,
    number,
    body,
  })
    .then(({ data: { html_url: htmlUrl } }) => htmlUrl)
    .catch((error) => {
      throw new Error(error);
    });
};

export const gitStatus = async (sha, options) => {
  return octokit.repos.createStatus({
    ...repoOptions,
    sha,
    ...options,
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

