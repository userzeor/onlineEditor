'use strict'
const themes = require('../build/build-theme')
module.exports = {
  NODE_ENV: '"production"',
  THEMES: JSON.stringify(themes.findThemes()),
  BASE_API: '"http://172.17.0.62:9999"'
}
