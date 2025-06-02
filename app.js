var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const router = express.Router();
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var usersTasks = require('./routes/tasks');
var usersGoals= require('./routes/goals');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/desarrolloweb';
mongoose.connect(mongoUri)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch((err) => console.error("🔴 Error al conectar a MongoDB:", err));


var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
router.use((req, res, next) => {
  if( req.headers.authorization && req.headers.authorization === '13005169@br.gal'){
    next();
    }else{
      res.status(401).send({message: 'No se encontró Autorización'});
      }
})
app.use('/', router);

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks', usersTasks);
app.use('/goals', usersGoals);


app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
