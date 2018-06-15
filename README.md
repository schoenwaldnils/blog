[![Coverage Status](https://coveralls.io/repos/github/schoenwaldnils/blog/badge.svg)](https://coveralls.io/github/schoenwaldnils/blog) [![Greenkeeper badge](https://badges.greenkeeper.io/schoenwaldnils/blog.svg)](https://greenkeeper.io/)

# Blog


Using [zeit/next.js](https://github.com/zeit/next.js)


## Favicons

To update the favicons run `npm run favicons-generate`. This takes the file in `/static/assets/images/favicon.png` and generates the images to `/static/assets/images/favicons`.

This also generates a json-file [faviconData.json](faviconData.json) witch is read by the [\<Meta/\>](source/components/Meta/Meta.js) component.

More settings: [faviconDescription.json](faviconDescription.json)
