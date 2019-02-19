const Octokit = require('@octokit/rest');

const {
  BOT_GITHUB_TOKEN,
  CIRCLE_PROJECT_USERNAME,
  CIRCLE_PROJECT_REPONAME,
} = process.env;

if (!BOT_GITHUB_TOKEN) throw new Error('Environment variable <BOT_GITHUB_TOKEN> undefined!');

const octokit = new Octokit({
  auth: `token ${BOT_GITHUB_TOKEN}`,
});


const repoOptions = {
  owner: CIRCLE_PROJECT_USERNAME,
  repo: CIRCLE_PROJECT_REPONAME,
};

const gitComments = (number) => {
  return octokit.issues.listComments({
    ...repoOptions,
    number,
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

const gitCreateComment = (number, body) => {
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

const gitStatus = async ({
  sha,
  state,
  target_url, // eslint-disable-line camelcase
  description,
  context,
}) => {
  return octokit.repos.createStatus({
    ...repoOptions,
    sha,
    state,
    target_url,
    description,
    context,
  })
    .then(({ data }) => data)
    .catch((error) => {
      throw new Error(error);
    });
};

module.exports = {
  gitComments,
  gitCreateComment,
  gitStatus,
};
