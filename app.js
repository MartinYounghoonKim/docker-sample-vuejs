const express = require('express');
const app = express();
const port = 4000;
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const hotMiddleware = require('./build/webpack-dev.server.config');
const webpackDevConfig = require('./build/webpack.base.conf.js');
console.log(webpackDevConfig);
const compiler = webpack(webpackDevConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', engine);

const route = (() => {
  app.get('/', (req, res) => {
    res.render('index.html', {
      build: process.env.NODE_ENV !== 'production' ? null : '/dist'
    });
  })
})();

if(process.env.NODE_ENV !== 'production') {
  app.use(hotMiddleware);
}

let server = app.use(express.static('dist')).listen(port, () => {
  console.log(`Express server has started on port:${port}`);
});
