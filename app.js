var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');

var createRouter = require('./routes/index');

//Database
const db = require('./config/db')
db.connectDB()

// db.con.query('select * from book', (err, result) => {
//   if (err) throw err
//   console.log(result)
// })

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

createRouter(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // send error
  res.status(err.status || 500);
  res.send({ error: err })
});

module.exports = app;
