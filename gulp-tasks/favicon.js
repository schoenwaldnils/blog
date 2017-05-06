import realFavicon from 'gulp-real-favicon';
import fs from 'fs';

// File where the favicon markups are stored
const FAVICON_DATA_FILE = '../faviconData.json';

// Generate the icons. This task takes a few seconds to complete.
// You should run it at least once to create the icons. Then,
// you should run it whenever RealFaviconGenerator updates its
// package (see the check-for-favicon-update task below).
module.exports = done => {
  realFavicon.generateFavicon({
    masterPicture: `${dirs.src}assets/images/favicon.png`,
    dest: `${dirs.dest}favicons`,
    iconsPath: `/${dirs.dest}favicons`,
    design: {
      ios: {
        pictureAspect: 'backgroundAndMargin',
        backgroundColor: '#cccccc',
        margin: '14%',
        assets: {
          ios6AndPriorIcons: false,
          ios7AndLaterIcons: false,
          precomposedIcons: false,
          declareOnlyDefaultIcon: true
        }
      },
      desktopBrowser: {},
      windows: {
        pictureAspect: 'noChange',
        backgroundColor: '#cccccc',
        onConflict: 'override',
        assets: {
          windows80Ie10Tile: false,
          windows10Ie11EdgeTiles: {
            small: false,
            medium: true,
            big: false,
            rectangle: false
          }
        }
      },
      androidChrome: {
        pictureAspect: 'noChange',
        themeColor: '#cccccc',
        manifest: {
          name: 'schoenwald.media',
          display: 'standalone',
          orientation: 'notSet',
          onConflict: 'override',
          declared: true
        },
        assets: {
          legacyIcon: false,
          lowResolutionIcons: false
        }
      }
    },
    settings: {
      compression: 1,
      scalingAlgorithm: 'Mitchell',
      errorOnImageTooSmall: false
    },
    versioning: {
      paramName: 'v',
      paramValue: 'm2d7xOWWzl'
    },
    markupFile: FAVICON_DATA_FILE
  }, () => {
    done();
  });

  gulp.src([ '_includes/favicons.html' ])
    .pipe(realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
    .pipe(gulp.dest('_includes'));
});
