#!/bin/bash
set -e # Exit with nonzero exit code if anything fails

if [ "$TRAVIS" = "true" ]
then
  git config --global user.name "$COMMIT_AUTHOR_NAME"
  git config --global user.email "$COMMIT_AUTHOR_EMAIL"
fi

# Get the deploy key by using Travis's stored variables to decrypt deploy_key.enc

ENCRYPTED_KEY_VAR="encrypted_1d97a522c7ba_key"
ENCRYPTED_IV_VAR="encrypted_1d97a522c7ba_iv"
ENCRYPTED_KEY=${!ENCRYPTED_KEY_VAR}
ENCRYPTED_IV=${!ENCRYPTED_IV_VAR}
openssl aes-256-cbc -K $ENCRYPTED_KEY -iv $ENCRYPTED_IV -in deploy_key.enc -out deploy_key -d
chmod 600 deploy_key
eval `ssh-agent -s`
ssh-add deploy_key

./node_modules/.bin/gh-pages --dist _site
