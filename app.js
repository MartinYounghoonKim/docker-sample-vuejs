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

if (!isProduction) {
  const bundle = require('./server/bundle.js');
  bundle();

  app.all('/build/*', function (req, res) {
    proxy.web(req, res, {
      target: 'http://localhost:8080'
    });
  });
}

proxy.on('error', function(e) {
  console.log('Could not connect to proxy, please try again...');
});

app.listen(port, function () {
  console.log('Server running on port ' + port);
});
