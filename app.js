require('newrelic');

var http = require("http"),
    express = require("express"),
    MongoClient = require("mongodb").MongoClient,
    Server = require("mongodb").Server,
    habitat = require("habitat"),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cons = require("consolidate"),
    swig = require("swig"),
    validator = require("validator"),
    dba = require('./public/js/db'),
    compression = require('compression'),
    sendEmail = require('./public/js/email');

habitat.load();
var env = new habitat(),
    app = express(),
    server = http.createServer(app),
    port = Number(env.get("PORT") || 8080);

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://blog.plottio.com");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
  next();
});
var routes = require("./routes");

// starting app server, the last function to call
MongoClient.connect('mongodb://localhost:27017/blog', function(err, db) {
  "use strict";
  if(err) throw err;

  // Register our templating engine
  app.engine('html', cons.swig);
  app.set('view engine', 'html');
  app.use(compression()); //use compression
  app.use(express.static(__dirname + '/views'));
  app.engine('html', require('ejs').renderFile);
  // Express middleware to populate 'req.cookies' so we can access cookies
  app.use(express.cookieParser());

  // Express middleware to populate 'req.body' so we can access POST variables
  app.use(express.bodyParser());
  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.static(__dirname + "/public"));

  routes(app, db);

  app.use(function(err, req, res, next) {
    // if error occurs
    res.send(500, { error: 'Sorry something bad happened!' });
  });

  app.post('/', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    console.log("processing email: " + req.body.email);
    var email = req.body.email;
    var username = req.body.username;
    if(username == "") {
      res.end(JSON.stringify({"res": "username required"}));
    }
    if (validator.isEmail(email)){
      dba.testEmail(db, email, username, function(err, msg) {
        if(err) throw err;
        if(msg == null) {
          sendEmail.sendEmail(email);
          res.end(JSON.stringify({"res":"sent"}));
        } else {
          res.end(JSON.stringify({"res": "already used",
                                  "email": email}));
        }
      })
    } else {
      console.log("Bad email");
      res.end(JSON.stringify({"res": "bad email",
                              "email": email}));
    }
  });

  app.listen(port);

  console.log('Express server listening on port ' + port);
});
