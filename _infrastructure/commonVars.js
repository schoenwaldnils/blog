const branchName = require('./setBranchName');

const { DOMAIN_NAME } = process.env;
let { BRANCH_NAME } = process.env;

if (!BRANCH_NAME) {
  BRANCH_NAME = branchName;
}

if (!DOMAIN_NAME) throw new Error('Environment variable <DOMAIN_NAME> undefined!');

export const previewUrl = BRANCH_NAME ? `https://${BRANCH_NAME}.${DOMAIN_NAME}/` : `https://${DOMAIN_NAME}/`;

export default {
  previewUrl,
};
