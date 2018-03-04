/**
 * @description express에 필요한 모듈 추가
 */
const express = require('express');
const path = require('path');

const app = express();
/**
 * @description 개발/상용에 따라 설정값 분기
 */
const isProduction = process.env.NODE_ENV === 'production';
const port = isProduction ? process.env.PORT : 4000

const publicPath = path.resolve(__dirname, 'dist');

const http = require('http');
const engine = require('ejs-locals');
const bodyParser = require('body-parser');

const server = http.createServer(app);

app.use(express.static(publicPath));
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', engine);
/**
 *
 * @type {webpack}
 */
const webpack = require('webpack');



// const route = (() => {
//   app.get('/', (req, res) => {
//     console.log('정보', process.env.NODE_ENV);
//     res.render('index.html')
//     // if(process.env.NODE_ENV !== 'production') {
//     //   res.render('/dist/index.html')
//     // } else {
//     //   res.render('/index.html')
//     // }
//   })
// })();

if(process.env.NODE_ENV !== 'production') {
  const devConfig = require('./build/webpack.dev.conf');
  const webpackDevConfig = require('./build/webpack.base.conf.js');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackDevConfig);

  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: 'http://localhost:4000',
    quiet: false,
    lazy: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: true
    },
    stats: {
      colors: true,
    }
  });

  const bundlePath = path.join(__dirname, 'dist/index.html');
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  app.get('*', function response(req, res) {
    res.render('index.html')
    res.end();
  });


}

server.listen(port, () => {
  console.log(`Express server has started on port:${port}`);
});
