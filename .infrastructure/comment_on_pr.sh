#!/usr/bin/env bash

unset BOT_COMMENT_ID

# uses $BOT_GITHUB_TOKEN to authenticate

REPO_SLUG=$CIRCLE_PROJECT_USERNAME'/'$CIRCLE_PROJECT_REPONAME
CIRCLE_PR_NUMBER=${CIRCLE_PULL_REQUEST##*/}

echo 'REPO_SLUG:' $REPO_SLUG;
echo 'CIRCLE_PR_NUMBER:' $CIRCLE_PR_NUMBER;

if [ $CIRCLE_PULL_REQUEST ] ; then
  echo "Is PR!";
  BOT_COMMENT_ID=$(curl -H "Authorization: token $BOT_GITHUB_TOKEN" -X GET "https://api.github.com/repos/$REPO_SLUG/issues/$CIRCLE_PR_NUMBER/comments" | jq -c '.[] | select(.user | select(.login | contains("schoenwald-bot")))' | jq -c '.id');

  echo $BOT_COMMENT_ID;

  if [ -z $BOT_COMMENT_ID ] ; then
    echo "PR has no PR-Preview comment";
    curl -H "Authorization: token ${BOT_GITHUB_TOKEN}" -X POST \
    -d "{\"body\": \"Preview: [https://${BRANCH_NAME}.schoenwald.media](https://${BRANCH_NAME}.schoenwald.media)\"}" \
    "https://api.github.com/repos/${REPO_SLUG}/issues/${CIRCLE_PR_NUMBER}/comments";
  fi
fi