const express = require('express');
const app = express();
const port = 4000;
const engine = require('ejs-locals');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackDevConfig = require('./build/webpack.dev.conf.js');
console.log(webpackDevConfig);
//const compiler = webpack(webpackDevConfig);

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', engine);

const route = (() => {
  app.get('/', (req, res) => {
    res.render('dist/index.html');
  })
})();

// if(process.env.NODE_ENV !== 'production') {
//   app.use(webpackDevMiddleware(compiler, {
//     noInfo: true
//   }));
//   app.use(webpackHotMiddleware(compiler));
// }

let server = app.use(express.static('dist')).listen(port, () => {
  console.log(`Express server has started on port:${port}`);
});
