/*DB SCHEMA*/
var con = require(__dirname + '/../setups/config.js');
global.thinky = require('thinky')(con.rethinkdb);
global.r = thinky.r;
global.Errors = thinky.Errors;