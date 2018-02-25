const express = require('express');
const http = require('http');
const engine = require('ejs-locals');
const bodyParser = require('body-parser');

const port = 4000;

const app = express();
const server = http.createServer(app);

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', engine);


const route = (() => {
  app.get('/', (req, res) => {
    console.log('정보', process.env.NODE_ENV);
    res.render('index.html')
    // if(process.env.NODE_ENV !== 'production') {
    //   res.render('/dist/index.html')
    // } else {
    //   res.render('/index.html')
    // }
  })
})();

if(process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('./build/webpack-dev.server.config');
  const webpackDevConfig = require('./build/webpack.base.conf.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackDevConfig);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: 'http://localhost:4000'
  }));
  app.use(webpackHotMiddleware(compiler, {
    log: console.log
  }))
  app.use(config);
}
app.use(express.static('dist'));

server.listen(port, () => {
  console.log(`Express server has started on port:${port}`);
});
/*
  // testing webpack dev server's code
  app.use(express.static('dist'))
  const route = (() => {
    app.get('/', (req, res) => {
      res.render('index.html');
    })
  })();

  let server = app.listen(port, () => {
    console.log(`Express server has started on port:${port}`);
  });

*/
