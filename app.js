const express = require('express');
const http = require('http');
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const hotMiddleware = require('./build/webpack-dev.server.config');
const webpackDevConfig = require('./build/webpack.base.conf.js');
const port = 4000;
const compiler = webpack(webpackDevConfig);

const app = express();
const server = http.createServer(app);

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
app.use(express.static('dist'));

server.listen(port, () => {
  console.log(`Express server has started on port:${port}`);
});
