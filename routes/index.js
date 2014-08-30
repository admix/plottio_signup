var ErrorHandler = require('./error').errorHandler;
var dba = require('../public/js/db');
module.exports = exports = function(app, db) {

    // Redirection from www to non-www
    // app.get('/*', function(req, res, next) {
    //   if (req.headers.host.match(/^www/) !== null ) {
    //     res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url);
    //   } else {
    //     next();
    //   }
    // })
    // Home page
    app.get('/', function(res, req, next) {
      // if (req.headers.host.match(/^www/) !== null ) {
      //   res.redirect(301, 'https://' + req.headers.host.replace(/^www\./, '') + req.url);
      // } else {
        res.render("index.html");
      //}
    });

    // Page for Privacy Policy
    app.get('/policy', function(req, res) {
      res.render("policy.html");
    });
    // Page for Unsubscribe
    app.get('/unsubscribe', function(req, res) {
      res.render("unsubscribe.html");
    });
    // Unsubscribe from Plottio POST
    app.post('/unsubscribe', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      console.log("Removing email: " + req.body.email);
      var email = req.body.email;
      dba.removeEmail(db, email, function(err, msg) {
        if(err) throw err;
        res.end(JSON.stringify({"res": "You have been successfuly unsubscribed.",
                                "email": email}));
      });
    });

    // Page for pre-production testing
    // app.get('/test', function(req, res) {
    //   res.render("test.html");
    // });

    // Rendering other requests as 404
    app.get('*', function(req, res) {
      res.render("404.html");
    });

    // Welcome page
    //app.get("/welcome", sessionHandler.displayWelcomePage);

    // Error handling middleware
    app.use(ErrorHandler);
}
