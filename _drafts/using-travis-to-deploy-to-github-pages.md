---
layout: post
title: Using travis to deploy to Github-Pages
tags:
  travis
  deployment
  gh-pages
---

## Create gh-pages branch
```bash
git checkout --orphan gh-pages
git rm -rf .
touch README.md
git add README.md
git commit -m "Init gh-pages"
git push --set-upstream origin gh-pages
git checkout master
```

`ssh-keygen -t rsa -b 4096 -C "your_email@example.com"`
`travis encrypt-file id_rsa`

```
$ travis encrypt-file id_rsa
encrypting deploy_key for domenic/travis-encrypt-file-example
storing result as deploy_key.enc
storing secure env variables for decryption

Please add the following to your build script (before_install stage in your .travis.yml, for instance):

    openssl aes-256-cbc -K $encrypted_0a6446eb3ae3_key -iv $encrypted_0a6446eb3ae3_key -in super_secret.txt.enc -out super_secret.txt -d

Pro Tip: You can add it automatically by running with --add.

Make sure to add deploy_key.enc to the git repository.
Make sure not to add deploy_key to the git repository.
Commit all changes to your .travis.yml.
```

Make note of that encryption label, here "0a6446eb3ae3". This can be public information; it just says which environment variables to use on the Travis server when decrypting this file.

You should follow the instructions and commit deploy_key.enc to the repository. 

<https://gist.github.com/domenic/ec8b0fc8ab45f39403dd#get-encrypted-credentials>

`npm install --save-dev gh-pages`
