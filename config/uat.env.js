'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"uat"',
  REPORT_ROOT: '"//crm-uat.chinagreentown.com/api/report/"'
})
