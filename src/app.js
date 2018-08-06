const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const handlebars = require('express-handlebars');

const index = require('./routes/index');
const config = require('./config/default');
// 环境变量
const env = process.env.NODE_ENV || 'development';
const isProd = env === 'production' ? true : false;
const port = isProd ? config.port : '3000';

const app = express();

// Connect to MongoDB
const { db } = config;

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb://${db.name}:${db.port}/${db.area}`, { useNewUrlParser: true })
    .then(() => { console.log('🌈 successfully connect to database'); })
    .catch((err) => { console.log(err); })

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.engine('hbs', handlebars({
  layoutsDir: 'views/layouts',
  defaultLayout: 'layout',
  extname: '.hbs'
}))
app.set('view engine', 'hbs');
// 全局变量
app.locals.isProd = isProd;
if (isProd) {
  const manifest = require('../www/rev-manifest.json');
  app.locals.assetsCss = "app/" + manifest['app.css'];
  app.locals.assetsJs = "app/" + manifest['main.js'];
}
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, '../public/img', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(cors());
app.use(compression());
// 静态资源
app.use(express.static(path.join(__dirname, isProd ? '../www' : '../public')));
app.use('/', index);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, () => {
  console.log(`🐳 => Server is running on port ${port}`);
})
