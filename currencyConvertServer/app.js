var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var app = express();
var stack = [];

app.set('trust proxy', true);


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Homepage coming in as a GET
app.get('/', (req, res) => {
  res.render(__public + "/index.html");
});

app.get('/api', (req, res) => {
  res.sendFile(path.join(__public + '/api.html'));
  //res.sendFile('../public/api.html');
});

app.post('/euro', function (req, res) {

  let orgFig = parseFloat(req.body.amount);

  //console.log();
  let usr = req.get('user-agent');
  let ip = req.ip;

  console.log(ip);

  let newFi = orgFig / 0.9; // 1 USD=0.9 Euro
  newFi = Math.round((newFi + Number.EPSILON) * 100) / 100;

  item = { "operand": orgFig, "currency": "EUROS", "result": newFi, "usr": usr, "ipAdd": ip };

  var newArray = [item];

  for (var i = 0; i < stack.length; i++) {
    newArray[i + 1] = stack[i];
  }

  stack = newArray;
  res.status(200).send((newFi).toString());
})

app.post('/pounds', function (req, res) {
  let orgFig = parseFloat(req.body.amount);

  let usr = req.get('user-agent');
  let ip = req.ip;

  console.log(ip);

  let newFi = orgFig / 0.78; // 1 USD=0.9 Euro
  newFi = Math.round((newFi + Number.EPSILON) * 100) / 100;

  item = { "operand": orgFig, "currency": "EUROS", "result": newFi, "usr": usr, "ipAdd": ip };
  //item = { "operand": orgFig, "currency": "POUNDS", "result": newFi };

  var newArray = [item];

  for (var i = 0; i < stack.length; i++) {
    newArray[i + 1] = stack[i];
  }
  stack = newArray;

  res.status(200).send((newFi).toString());
})

app.get('/stack', function (req, res) {
  res.status(200).send(stack);
});

app.get('/reset', function (req, res) {
  console.log("resetting...");
  stack = [];
  res.status(200).send();
});

app.get('/pop', function (req, res) {
  console.log("Popping!!!");

  let newArray = [];
  if (stack[0] == undefined) {
    return undefined;
  } else {
    //let numToPop = stack[0];
    for (var i = 0; i < stack.length - 1; i++) {
      newArray[i] = stack[i + 1];
    }
    stack = newArray;
  }
  res.status(200).send();
})

app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
