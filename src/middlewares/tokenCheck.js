const jsonwebtoken = require('jsonwebtoken');
const config = require('../../config');

function verifyToken(req, next) {
  const token = req.cookies.token;
  console.log(token)
  let userId;

  jsonwebtoken.verify(token, config.jwtSecret, (err, token) => {
    if (err) {
      err.message = "登录已过期，请重新登录"
      return next(err);
    } else {
      userId = token.userId;
    }
  });

  return userId;
}

module.exports = verifyToken;
