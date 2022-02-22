var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose')
require('./db')
mongoose.connect('mongodb://127.0.0.1/coches', {useNewUrlParser: true, useUnifiedTopology: true})
const hbs = require('hbs')
const Store = require('express-session').Store
const MongooseStore = require('mongoose-express-session')(Store)
const passport = require('passport')
require('./lib/passport')
require('dotenv').config()


var indexRouter = require('./routes/index');
var cochesRouter = require('./routes/coches');
const { hasSubscribers } = require('diagnostics_channel');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'))
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
    secret: 'hola',
    resave: false,
    rolling: false,
    saveUninitialized: false,
    store: new MongooseStore({mongoose: mongoose})
}))

app.use(passport.initialize())
app.use(passport.session())

app.use((req, res, next) => {
  app.locals.user = req.user
  next()
})

app.use('/', indexRouter);
app.use('/coches', cochesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
