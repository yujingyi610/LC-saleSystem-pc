'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path');

module.exports = {
  dev: {
    // Paths

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      // '/api/sys/orgUnit': {
      //   target: 'http://10.100.25.188:7008',
      // },
      // '/api/custom/case': {
      //   target: 'http://10.100.26.156:8007',
      // },
      '/api':{
				// target: ': 'http://192.168.9.48',
				target:  'http://crm-uat.chinagreentown.com',
				// target: ': 'http://crm.chinagreentown.com',	
				// target: ': 'http://10.100.26.241:8014',
				},
      '/api/sys/message':{
        target: 'http://crm-uat.chinagreentown.com',
        // target: 'http://10.100.25.64:7008',
        //target: 'http://10.100.25.21:8006',
        // pathRewrite: {
        //   '^/api/sys': ""
        // }
      },
      '/api/custom/case/addCaseEvaluate':{
        target: 'http://crm-uat.chinagreentown.com',
        // target: 'http://10.100.25.64:7008',
        //target: 'http://10.100.25.21:8006',
        // pathRewrite: {
        //   '^/api/sys': ""
        // }
      },
      '/api/sys':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.25.64:7008',
        //target: 'http://10.100.25.21:8006',
        // pathRewrite: {
        //   '^/api/sys': ""
        // }
      },

      '/api/project':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.24.189:8005',
        // pathRewrite: {
        //   '^/api/project': ""
        // }
      },
      '/api/finance':{
        target: 'http://192.168.9.48'
      },
      '/zuul/api/storage':{
        target: 'http://192.168.9.48',
      },

      // '/api/bpm':{
      //   target: 'http://192.168.9.48',
      // },


      '/resources':{
        target: 'http://192.168.9.48',
      },
      '/houseManage':{
        target: 'http://10.100.24.223:8005',
      },
      '/projectInfo':{
        target: 'http://10.100.24.223:8005',
      },
      '/projectCompany':{
        target: 'http://10.100.24.189:8005',
      },
      '/sys':{
        target: 'http://192.168.9.48',
        pathRewrite: {
          '^/sys': ""
        }
      },
      '/schedule':{
        target: 'http://10.100.24.189:8020',
        
      },
      '/api/bpm':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.27.164:8010'
      },
      '/api/custom':{
        target: 'http://192.168.9.48:7008',
       // http://192.168.9.48:7008/api/custom/custom/saveCustomMore
        
        // target: 'http://10.100.27.164:8010'
      },
      '/api/auth':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.27.164:8010'
      },
      '/trdSubscribeForm': {
        target: 'http://10.100.24.223:8005',
      },
      '/trdRaiseForm': {
        target: 'http://10.100.24.223:8005',
      },
      '/pushPlate': {
        target: 'http://10.100.24.223:8005',
      },
      '/houseQuery': {
        target: 'http://10.100.24.223:8005',
      },
      '/priceScheme': {
        target: 'http://10.100.25.188:8005',
      },
      '/trdSign': {
        // target: 'http://10.100.24.223:8005',
        target: 'http://10.100.26.66:8005',
      },
      '/trdChange': {
        target: 'http://10.100.24.223:8005',
        // target: 'http://10.100.26.66:8005',
      },
      '/indexManage': {
        target: 'http://10.100.24.223:8005',
      },
      '/ZKIDROnline': {
        target: 'http://127.0.0.1:24010',
      },
    },
    //10.100.24.189:8006 //平哥
    //192.168.9.48:8005

    // Various Dev Server settings
    host: 'localhost',
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },
  
  uat: {
    // Paths

    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      
      '/api/sys':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.25.64:7008',
        //target: 'http://10.100.25.21:8006',
        // pathRewrite: {
        //   '^/api/sys': ""
        // }
      },

      '/api/project':{
         target: 'http://192.168.9.48',
       // target: 'http://10.100.24.223:8005',
        // pathRewrite: {
        //   '^/api/project': ""
        // }
      },
      '/api/finance':{
        target: 'http://192.168.9.48'
      },
      '/zuul/api/storage':{
        target: 'http://192.168.9.48',
      },

      // '/api/bpm':{
      //   target: 'http://192.168.9.48',
      // },


      '/resources':{
        target: 'http://192.168.9.48',
      },
      '/houseManage':{
        target: 'http://10.100.24.223:7008',
      },
      '/projectInfo':{
        target: 'http://10.100.25.188:8005',
      },
      '/projectCompany':{
        target: 'http://10.100.24.189:8005',
      },
      '/sys':{
        target: 'http://192.168.9.48',
        pathRewrite: {
          '^/sys': ""
        }
      },
      '/schedule':{
        target: 'http://10.100.24.189:8020',
        
      },
      '/api/bpm':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.27.164:8010'
      },
      '/api/custom':{
        target: 'http://192.168.9.48:7008',
       // http://192.168.9.48:7008/api/custom/custom/saveCustomMore
        
        // target: 'http://10.100.27.164:8010'
      },
      '/api/auth':{
        target: 'http://192.168.9.48',
        // target: 'http://10.100.27.164:8010'
      },
      '/trdSubscribeForm': {
        target: 'http://10.100.25.188:8005',
      },
      '/trdRaiseForm': {
        target: 'http://10.100.25.188:8005',
      },
      '/pushPlate': {
        target: 'http://10.100.25.188:8005',
      },
      '/houseQuery': {
        target: 'http://10.100.25.188:8005',
      },
      '/priceScheme': {
        target: 'http://10.100.24.223:8005',
      },
      '/trdSign': {
        target: 'http://10.100.26.241:8005',
      },
      '/trdChange': {
        target: 'http://10.100.24.223:8005',
      },
    },
    //10.100.24.189:8006 //平哥
    //192.168.9.48:8005

    // Various Dev Server settings
    host: 'localhost',
    port: 8088, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: true,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-


    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',

    /**
     * Source Maps
     */

    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
