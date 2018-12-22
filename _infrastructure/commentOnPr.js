import { gitComments, gitCreateComment } from './octokit';
import { previewUrl } from './commonVars';

const {
  BOT_NAME = 'schoenwald-bot',
  CIRCLE_PULL_REQUEST = 'https://github.com/schoenwaldnils/blog/pull/314',
} = process.env;

if (!BOT_NAME) throw new Error('Environment variable <BOT_NAME> undefined!');

(async () => {
  if (CIRCLE_PULL_REQUEST) {
    console.log('Is PR!');

    const circlePrNumber = CIRCLE_PULL_REQUEST.match(/\d+$/)[0];
    const comments = await gitComments(circlePrNumber);

    if (comments.some(comment => comment.user.login === BOT_NAME)) {
      console.log('PR already has bot comment.');
      process.exit(0);
    }

    console.log('PR has no bot comment.');
    const commentLink = await gitCreateComment(circlePrNumber, `Preview: ${previewUrl}`);

    if (commentLink) {
      console.log(`Preview comment written on PR: ${commentLink}`);
      process.exit(0);
    }
  }

  console.log('Build has no PR to write on');

  process.exit(0);
})();
