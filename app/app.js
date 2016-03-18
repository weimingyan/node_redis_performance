var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var DataSource = require('./redis/redis_monitor');
var dataSource = new DataSource();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//initial socket io
var numOfUsers = 0;
io.on('connection', function(socket){
  numOfUsers++;
  _io_emit();
  socket.on('disconnect', function(){
    numOfUsers--;
  });
});

function _io_emit() {
  if(numOfUsers >0) {
    console.log('fetch data');
    dataSource.fetch('memory', 'used_memory', function(data) {
      console.log('got data:'+ data);
      var current = new Date();
      io.emit('mu_data_update', {
        hours: current.getHours(), 
        minutes: current.getMinutes(), 
        seconds: current.getSeconds(), 
        value: data}); 
      console.log('sending data to front end');
      setTimeout(_io_emit, 5000);
    });
  }
}

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});
module.exports = app;
