var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var filmsRouter = require('./routes/films');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/**Faire l'exercice 1.2 */
let Stat = [];

app.use((req, res, next) => {
  const currentOperation = `${req.method} ${req.path}`;
  const currentOperationCounter = stats[currentOperation];
  if (currentOperationCounter === undefined) stats[currentOperation] = 0;
  stats[currentOperation] += 1;
  const statsMessage = `Request counter : \n${Object.keys(stats)
    .map((operation) => `- ${operation} : ${stats[operation]}`)
    .join("\n")}
      `;
  console.log(statsMessage);
  next();
});


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films',filmsRouter);

module.exports = app;
