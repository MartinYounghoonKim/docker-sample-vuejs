const express = require('express');
const app = express();
const port = 3000;
const engine = require('ejs-locals');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', __dirname);
app.set('view engine', 'ejs');
app.engine('html', engine);

const route = (() => {
  app.get('/', (req, res) => {
    res.render('dist/index.html');
  })
})();

let server = app.use(express.static('dist')).listen(port, () => {
  console.log(`Express server has started on port:${port}`);
});
