// Error handling middleware

exports.errorHandler = function(err, req, res, next) {
    "use strict";
    //console.error(err.message);
    //console.error(err.stack);
    res.status(404);
    res.render('404', { error: err });
}
