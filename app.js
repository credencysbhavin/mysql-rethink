/**
 * For setting environment variable based configuration 
 */
var argv = require('yargs')
        .command('environment', function (yargs) {
            yargs.options({
                location: {
                    demand: true,
                    alias: 'e',
                    type: 'string'
                }
            });
        })
        .help('help')
        .argv;
testEnv = argv.e;

require('dotenv').config({path: ".env." + testEnv});
var port = process.env.PORT || 3000;

global.express = require('express');
global.logger = require('morgan');
global.router = express.Router();
global.bodyParser = require('body-parser');
global.path = require('path');
global.favicon = require('serve-favicon');
global.cookieParser = require('cookie-parser');
global.http = require('http');
global.decode = require('isodate-convert').decode;
global.validator = require('validator');
global.dateTime = require('date-time');

var app = express();
global.cors = require('cors');
app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
global.multer  = require('multer');
var upload = multer();

app.use(function (req, res, next) {
    res.header("Access-Control-Expose-Headers", "x-access-token");
    //console.log('req.decoded',req.decoded);
    next();
});

/**
 * Adding different routs for available modules
 */
var order = require('./routes/order');

// for file upload
var fs = require('fs');
var path = require('path');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.use(favicon());
app.set('port', process.env.PORT || 4300);
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

/*
 * MySQL Connection
 */
var connection  = require('express-myconnection'); 
global.mysql = require('mysql');

app.use(
    connection(mysql,{
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        port: process.env.MYSQL_PORT,
        database: process.env.MYSQL_DATABASE
        }, 'pool')
);


// routes for the ------ engagementtypeMaster----------
app.post('/order/add', order.createOrder);
app.get('/orders', order.getOrdersList);
app.get('/order/:id?', order.getOrderDetail);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    console.log(err)
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
  console.log(err)
  res.render('error', {
    message: err.message,
    error: {}
  });
});

console.log("ENV : " + process.env.ENVIRONMENT);
http.createServer(app).listen(port, function(){
    console.log('Express server listening on port ' + port);
});

module.exports = app;
