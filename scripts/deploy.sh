#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

# Save some useful information
REPO=`git config remote.origin.url`
SSH_REPO=${REPO/https:\/\/github.com\//git@github.com:}
SHA=`git rev-parse --verify HEAD`


if [ "$TRAVIS" = "true" ]
then
  git config --global user.name "$COMMIT_AUTHOR_NAME"
  git config --global user.email "$COMMIT_AUTHOR_EMAIL"
fi

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc

ENCRYPTED_KEY_VAR="encrypted_${ENCRYPTION_LABEL}_key"
ENCRYPTED_IV_VAR="encrypted_${ENCRYPTION_LABEL}_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

sudo cp .nojekyll out/
sudo cp CNAME out/

ls -a out

./node_modules/.bin/gh-pages --repo $SSH_REPO --dist out --src '{**/*.*, **/.*}'
