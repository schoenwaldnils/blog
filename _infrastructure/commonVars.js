const {
  BRANCH_NAME,
  DOMAIN_NAME,
} = process.env;

if (!DOMAIN_NAME) throw new Error('Environment variable <DOMAIN_NAME> undefined!');

export const previewUrl = BRANCH_NAME ? `https://${BRANCH_NAME}.${DOMAIN_NAME}/` : `https://${DOMAIN_NAME}/`;

export default {
  previewUrl,
};
