const fs = require('fs');
const glob = require('glob');


glob('out/**/*.html', (globErr, files) => {
  console.log(files);

  files.forEach((file) => {
    fs.readFile(file, 'utf8', (readErr, data) => {
      if (readErr) {
        return console.log(readErr);
      }
      const result = data.replace('rel="stylesheet"', 'rel="preload" as="stylesheet"');

      fs.writeFile(file, result, 'utf8', (writeErr) => {
        if (writeErr) return console.log(writeErr);
      });
    });
  });
});
