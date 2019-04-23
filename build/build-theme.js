const path = require("path");
const fs = require('fs');
const glob = require('glob');
const getFileList = function () {
  let cssPath = []
  let scssPath = []
  glob.sync('./src/style/themes/**/*').forEach(function (name) {
    if (/\.css$/.test(name)) {
      cssPath.push(name)
    }
    if (/\.scss$/.test(name)) {
      scssPath.push(name)
    }
  })
  return {
    cssPath: cssPath,
    scssPath: scssPath
  }
}
const findThemes = function () {
  return fs.readdirSync(path.join('src', 'style', 'themes', 'dark' )).
  filter(function(filename) {
    return filename;
  }).
  map(function(theme) {
    return theme.replace(/\.js$/, '');
  });
}

module.exports = {
  'getFileList': getFileList,
  'findThemes': findThemes
}
