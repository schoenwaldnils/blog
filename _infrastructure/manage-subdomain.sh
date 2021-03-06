#!/bin/bash
echo BRANCH_NAME = ${BRANCH_NAME}
echo DOMAIN_NAME = ${DOMAIN_NAME}
ssh root@5.35.245.22 plesk bin subdomain -i ${BRANCH_NAME}.${DOMAIN_NAME}

returnCode=$?

if [ $returnCode != 0 ]
then
  ssh root@5.35.245.22 plesk bin subdomain --create ${BRANCH_NAME} -domain ${DOMAIN_NAME} -ssl true -ssl-redirect true -empty-document-root true -www-root www/schoenwald/$CIRCLE_PROJECT_REPONAME/$BRANCH_NAME
  ssh root@5.35.245.22 plesk bin subdomain --update ${BRANCH_NAME} -domain ${DOMAIN_NAME} -certificate-name \"Lets Encrypt ${DOMAIN_NAME}\"
  # ssh root@5.35.245.22 plesk bin extension --exec letsencrypt cli.php -d ${BRANCH_NAME}.${DOMAIN_NAME} -m nils@schoenwald.media
else
  echo "Subdomain already exists"
  exit 0
fi
