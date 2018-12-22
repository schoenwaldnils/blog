const {
  CIRCLE_BRANCH,
  DOMAIN_NAME,
} = process.env;

const branchName = CIRCLE_BRANCH && CIRCLE_BRANCH.replace(/[/|/.|_]/g, '-').replace(/@/g, '');

export const previewUrl = branchName ? `https://${branchName}.${DOMAIN_NAME}/` : `https://${DOMAIN_NAME}/`;

export default {
  previewUrl,
};
