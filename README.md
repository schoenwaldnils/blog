[![Travis](https://img.shields.io/travis/schoenwaldnils/blog.svg?style=flat-square)](https://travis-ci.org/schoenwaldnils/blog)

# Blog

Using [zeit/next.js](https://github.com/zeit/next.js)


## Favicons

To update the favicons run `npm run favicons-generate`. This takes the file in `/static/assets/images/favicon.png` and generates the images to `/static/assets/images/favicons`.

This also generates a json-file [faviconData.json](faviconData.json) witch is read by the [\<Meta/\>](source/components/Meta/Meta.js) component.

More settings: [faviconDescription.json](faviconDescription.json)
