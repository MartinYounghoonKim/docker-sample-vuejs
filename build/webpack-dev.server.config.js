// import historyFallback from 'connect-history-api-fallback';
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config  = require('./webpack.base.conf');
const webpack = require('webpack');
const bundler = webpack(config);
const middleware = [
  webpackDevMiddleware(bundler, {
    filename: config.output.filename,
    publicPath: config.output.publicPath,
    hot: true,
    stats: {
      colors: true,
    },
  }),
  webpackHotMiddleware(bundler, {
    log: console.log, // eslint-disable-line no-console
  })
];
module.exports = middleware;
