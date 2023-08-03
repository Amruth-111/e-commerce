const { expressjwt: jwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.JWT_KEY;
  console.log(secret)
  return jwt({
    secret,
    algorithms: ["HS256"],
  });
}
// console.log(authJwt())

module.exports = authJwt;