#!/usr/bin/env bash

unset BOT_COMMENT_ID

BOT_USERNAME=schoenwald-bot

# uses $BOT_GITHUB_TOKEN to authenticate

echo 'CIRCLE_PR_NUMBER: ' + $CIRCLE_PR_NUMBER;
echo 'CIRCLE_REPOSITORY_URL: ' + $CIRCLE_REPOSITORY_URL;
echo 'CIRCLE_PR_NUMBER: ' + $CIRCLE_PR_NUMBER;

if [ -z "$CIRCLE_PULL_REQUEST" ] ; then
  echo 'TRAVIS_REPO_SLUG: ' + $CIRCLE_REPOSITORY_URL;
  echo 'TRAVIS_PULL_REQUEST: ' + $CIRCLE_PR_NUMBER;

  BOT_COMMENT_ID=$(curl -H "Authorization: token $BOT_GITHUB_TOKEN" -X GET "https://api.github.com/repos/$CIRCLE_REPOSITORY_URL/issues/$CIRCLE_PR_NUMBER/comments" | jq -c ".[] | select(.user | select(.login | contains($BOT_USERNAME)))" | jq -c '.id');

  echo $BOT_COMMENT_ID;

  if [ -z $BOT_COMMENT_ID ] ; then
    echo "PR has no PR-Preview comment";
    curl -H "Authorization: token ${BOT_GITHUB_TOKEN}" -X POST \
    -d "{\"body\": \"Preview: [https://${BRANCH_NAME}.schoenwald.media](https://${BRANCH_NAME}.schoenwald.media)\"}" \
    "https://api.github.com/repos/${CIRCLE_REPOSITORY_URL}/issues/${CIRCLE_PR_NUMBER}/comments";
  fi
fi
