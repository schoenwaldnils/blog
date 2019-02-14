const { gitComments, gitCreateComment } = require('./octokit');
const { previewUrl } = require('./commonVars');

const {
  BOT_NAME,
  CIRCLE_PULL_REQUEST,
} = process.env;

if (!BOT_NAME) throw new Error('Environment variable <BOT_NAME> undefined!');

(async () => {
  if (CIRCLE_PULL_REQUEST) {
    console.log('Is PR!');

    const circlePrNumber = CIRCLE_PULL_REQUEST.match(/\d+$/)[0];
    const comments = await gitComments(circlePrNumber)
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });

    if (comments.some(comment => comment.user.login === BOT_NAME)) {
      console.log('PR already has bot comment.');
      process.exit(0);
    }

    console.log('PR has no bot comment.');
    const commentLink = await gitCreateComment(circlePrNumber, `Preview: ${previewUrl}`)
      .catch((error) => {
        console.error(error);
        process.exit(1);
      });

    if (commentLink) {
      console.log(`Preview comment written on PR: ${commentLink}`);
      process.exit(0);
    }
  }

  console.log('Build has no PR to write on');

  process.exit(0);
})();
