// const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
  outputDir: 'dist',
  indexPath: 'index.html',
  filenameHashing: false,
  lintOnSave: undefined,
  productionSourceMap: false,
  // chainWebpack: config => {
  //   config.plugin('html').tap((...args) => {
  //     args[0].minify = {
  //       removeComments: true,
  //       collapseWhitespace: false,
  //       removeAttributeQuotes: false,
  //       collapseBooleanAttributes: true,
  //       removeScriptTypeAttributes: false
  //     };
  //     return args;
  //   });
  // }
};