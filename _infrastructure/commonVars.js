const {
  CIRCLE_BRANCH,
  DOMAIN_NAME,
} = process.env;

if (!DOMAIN_NAME) throw new Error('Environment variable <DOMAIN_NAME> undefined!');

const branchName = CIRCLE_BRANCH && CIRCLE_BRANCH
  .replace('/npm_and_yarn', '')
  .replace(/[/|/.|_]/g, '-')
  .replace(/@/g, '');

export const previewUrl = branchName ? `https://${branchName}.${DOMAIN_NAME}/` : `https://${DOMAIN_NAME}/`;

export default {
  previewUrl,
};
