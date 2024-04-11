const jwt = require('jsonwebtoken');
const secretKey = "12345678910";
const checkuser = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    req.user = "not_login";
    next();
  }else{
    const token = authorizationHeader.slice(7).replace(/"/g, ''); 
  jwt.verify(token,"12345678910", (err, decoded) => {
    req.user = decoded;
    next();
  });
}
};

module.exports = checkuser;
