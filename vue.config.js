const path = require('path');

module.exports = {
  publicPath: '/dist/',
  outputDir: path.resolve(__dirname, './dist'),
  indexPath: 'index.html',
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    }
  }
};