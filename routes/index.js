var ErrorHandler = require('./error').errorHandler;

module.exports = exports = function(app, db) {

    // The main page of the blog
    app.get('/', function(res, req, next) {
      res.render("index.html");
    });

    // Welcome page
    //app.get("/welcome", sessionHandler.displayWelcomePage);

    // Error handling middleware
    app.use(ErrorHandler);
}
