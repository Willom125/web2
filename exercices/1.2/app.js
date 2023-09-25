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


/**Faire l'exercice 1.2  Et ne pas oublier d'ajouter le code dans les autres exercices */

let Stat = [];

app.use("/", (req, res, next) => {
   const currentOperartion = `${req.method} ${req.path}`;
   const currentOperartionCounter = Stat[currentOperartion];
   if (currentOperartion === undefined) Stat[currentOperartion] = 0
   Stat[currentOperartion += 1]
   const statsMessage = `Request counter : \n${Object.keys(Stat)
      .map((operation) => `- ${operation} : ${stats[operation]}`)
      .join('\n')}`;
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films',filmsRouter);

module.exports = app;
