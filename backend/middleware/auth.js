const { expressjwt: jwt } = require("express-jwt");
const api=process.env.API
function authJwt() {
  const secret = process.env.JWT_KEY;
  console.log(secret)
  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked:isRevoked
  }).unless({
    path:[
        {url: /\/api\/v1\/public\/uploads(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/v1\/products(.*)/ , methods: ['GET', 'OPTIONS'] },
        {url: /\/api\/v1\/categories(.*)/ , methods: ['GET', 'OPTIONS'] },
        `${api}/users/login`,
        `${api}/users/signup`
    ]
  });
}

async function isRevoked(req,payload,done){
    if(!payload.isAdmin){
        done(null,true)
    }
    done();
}
// console.log(authJwt())

module.exports = authJwt;