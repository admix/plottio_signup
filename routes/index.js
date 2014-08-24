var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    // The main page of the blog
    app.get('/', function(res, req, next) {
      res.render("index.html");
    });

    // Page for pre-production testing
    app.get('/test', function(req, res) {
      res.render("test.html");
    });

    // Rendering other requests as 404
    app.get('*', function(req, res) {
      res.render("404.html");
    });

    // Welcome page
    //app.get("/welcome", sessionHandler.displayWelcomePage);

    // Error handling middleware
    app.use(ErrorHandler);
}
