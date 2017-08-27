
// The basics
var express = require('express');
var fusion = require('fusion');
var path = require('path');

// Framework TODO: This probably shouldn't be global
global.live = Const.live;

// Better debug messages
require('debug-trace')({
  always: true,
});

var datefmt = require('dateformat');
datefmt.masks.sql = 'yyyy-mm-dd HH:MM:ss';

// Default 3rd party middleware
var bodyParser = require('body-parser');
var subdomain = require('express-subdomain');

// Login middleware
var passport = require('passport');

// Framework configuration
var framework = require('analysis/framework');

// Custom middleware
var sessions = require('./request/sessions'); // Framework TODO: sessions should probably be turned into middleware
var logger = require('./request/logger');
var nocache = require('./request/middleware/nocache');

// The server
var http = require('http');

// Create the express.js app
var app = express();

// Determine if we're using a port map
if (Const.portMap) {
  var processName = path.basename(process.argv[1],'.js');
  var id = processName.split('-');
  var port = Const.portMap[id[1]];
  if (!port) var port = Const.port;
} else var port = Const.port;

// Port the server listens on locally
app.set('port', port);

app.use(logger({id: port, useColor: !Const.live}));

// Prevented all caching on live server
if (global.live)
  app.use(nocache);

// HTTP request body parser
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb', parameterLimit: 5000 }));

// Session parser
sessions.configure(express,app);

// Passport authentication support for fb and gmail login
app.use(passport.initialize());
app.use(passport.session());

fusion.configure(framework);

// URL routing
if (global.live) {
  app.use(subdomain(Const.server.split('//')[1].split('.')[0], fusion.router('genes')));
} else app.use(fusion.router('genes'));

var server = http.createServer(app);

server.listen(app.get('port'),'localhost', function() {
  console.log('listening on port '+app.get('port'));
  // The uncaughtException handler makes sure that an uncaught error cannot
  // bring down the server. The uncaughtException handler is added after the
  // server starts listening just in case that another process is already running
  process.addListener("uncaughtException", function (err) {
    console.error("Uncaught exception: " + err.message);
    console.error(err.stack);
  });

  // Pre-load all methods so that the user doesn't have to wait
  fusion.preload();

  console.log('Ready');
});

