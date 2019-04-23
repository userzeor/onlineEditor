'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
const themes = require('../build/build-theme')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  THEMES: JSON.stringify(themes.findThemes()),
  BASE_API: '"http://172.17.0.62:9999"'
})
