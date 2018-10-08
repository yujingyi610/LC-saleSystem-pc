'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  REPORT_ROOT: '"//10.100.26.150:8020/api/report/"'
})
