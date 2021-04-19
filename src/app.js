var createError = require('http-errors');
var express = require('express');
var cors=require('cors')
var dotenv=require('dotenv')
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var userRoleRouter = require('./routes/role');
var authRouter = require('./routes/auth');
var model=require('./models/index')
var app = express();
dotenv.config();
app.use(cors());
//db connect
const { coerce } = require('debug');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/userRole', userRoleRouter);
app.use('/auth', authRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
const errHandler=(err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(res.headersSent){
    return next(err)
  }
  // render the error page
  res.status(err.status || 500).json({error:err});
  // res.render('error');
}

app.use(errHandler);
module.exports = app;
