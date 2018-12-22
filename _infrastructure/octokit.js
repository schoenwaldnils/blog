import rest from '@octokit/rest';

const octokit = rest();

const {
  BOT_GITHUB_TOKEN = '45ea6ad246eccee995b05b9a30f5ea154494b30b',
  CIRCLE_PROJECT_USERNAME = 'schoenwaldnils',
  CIRCLE_PROJECT_REPONAME = 'blog',
} = process.env;

octokit.authenticate({
  type: 'oauth',
  token: BOT_GITHUB_TOKEN,
});

export const gitComments = async (number) => {
  const { data } = await octokit.issues.listComments({
    owner: CIRCLE_PROJECT_USERNAME,
    repo: CIRCLE_PROJECT_REPONAME,
    number,
  });

  return data;
};

export const gitCreateComment = async (number, body) => {
  const { data: { html_url: htmlUrl } } = await octokit.issues.createComment({
    owner: CIRCLE_PROJECT_USERNAME,
    repo: CIRCLE_PROJECT_REPONAME,
    number,
    body,
  });

  return htmlUrl;
};

export const gitStatus = async (sha, options) => {
  const { data } = await octokit.repos.createStatus({
    owner: CIRCLE_PROJECT_USERNAME,
    repo: CIRCLE_PROJECT_REPONAME,
    sha,
    ...options,
  });

  console.log(data);

  return data;
};

