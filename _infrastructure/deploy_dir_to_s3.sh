#!/usr/bin/env bash

# This script deploys a directory to S3
#
# usage: deploy_dir_to_s3 <source_dir> <s3_target_dir>
#
# preconditions:
#   * AWS credentials in environment variables $AWS_ACCESS_KEY_ID and $AWS_SECRET_ACCESS_KEY


function print() {
    STRING=$1
    echo "#### ${STRING} ####"
}

function check_aws_cli() {
    if ! $(which aws > /dev/null 2>&1); then
        echo "AWS CLI is not installed" && exit 1
    fi
}

function check_preconditions() {
    [ -z "$AWS_ACCESS_KEY_ID" ] && echo "AWS_ACCESS_KEY_ID missing" && exit 1
    [ -z "$AWS_SECRET_ACCESS_KEY" ] && echo "AWS_SECRET_ACCESS_KEY missing" && exit 1
    [ -z "$SOURCE_DIR" ] && echo "SOURCE_DIR missing" && exit 1
    [ -z "$S3_TARGET_DIR" ] && echo "S3_TARGET_DIR missing" && exit 1

    check_aws_cli
}

check_preconditions

print "Starting deploying the local directory $SOURCE_DIR to the S3 target directory $S3_TARGET_DIR"

print "Sync normal files"

aws s3 sync $SOURCE_DIR $S3_TARGET_DIR --region eu-central-1 --include "*" --exclude "*.css" --exclude "*.js" --exclude "*.png" --exclude "*.jpg" --exclude "*.jpeg" --exclude "*.gif" --exclude "*.ico" --exclude "*.svg"

print "Sync long cacheable files"

aws s3 sync $SOURCE_DIR $S3_TARGET_DIR --region eu-central-1 --cache-control "max-age=315360000" --exclude "*" --include "*.css" --include "*.js" --include "*.png" --include "*.jpg" --include "*.jpeg" --include "*.gif" --include "*.ico" --include "*.svg"

if [ ! -z "$CLOUDFRONT_DISTRIBUTION_ID" ]; then

print "Invalidate cache of cloudfront distribution with ID $CLOUDFRONT_DISTRIBUTION_ID"

aws cloudfront create-invalidation --distribution-id $CLOUDFRONT_DISTRIBUTION_ID --paths "/*"

fi



print "Finished deploy of the local directory $SOURCE_DIR to the S3 target directory $S3_TARGET_DIR"
