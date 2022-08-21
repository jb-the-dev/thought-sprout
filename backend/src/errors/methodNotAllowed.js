// This error handler sends a message telling a user when an attempted HTTP method is not allowed on a certain route

function methodNotAllowed(req, res, next) {
    next({
      status: 405,
      message: `${req.method} not allowed for ${req.originalUrl}`,
    });
  }
  
  module.exports = methodNotAllowed;