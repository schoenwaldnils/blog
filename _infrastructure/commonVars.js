const {
  CIRCLE_BRANCH,
  DOMAIN_NAME,
} = process.env;

if (!DOMAIN_NAME) throw new Error('Environment variable <DOMAIN_NAME> undefined!');

const branchName = CIRCLE_BRANCH && CIRCLE_BRANCH.replace(/[/|/.|_]/g, '-').replace(/@/g, '');

const testUrl = branchName ? `https://${branchName}.${DOMAIN_NAME}/` : `https://${DOMAIN_NAME}/`;

module.exports = {
  testUrl,
};
