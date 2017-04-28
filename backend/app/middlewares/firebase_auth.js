var FirebaseAuth = require('../models/firebase_auth');

module.exports = function(req, res, next) {
  var token = req.headers.authorization;
  if (token) {
    FirebaseAuth.isValidToken(token, function(result) {
      if (result) {
        req.query.uid = result.uid;
        next();
      } else {
        res.status(401).json({
          code: 401,
          reason: 'Token invalid or user not found'
        }).end();
      }
    });
  } else {
    res.status(401).json({
      code: 401,
      reason: 'Token is null'
    }).end();
  }
};
