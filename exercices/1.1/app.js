var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');


//1.2
app.use((req, res, next) => {

  
  let path = Object.keys(req);
  let method = req.method(); 
  console.log("path :" + path);
  console.log ("methods :" + method)
  console.log("GET:");
  console.log("GET /films:");
  console.log("POST /films:");
  console.log("DELETE /films:");
  next();
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films',filmsRouter);

module.exports = app;
