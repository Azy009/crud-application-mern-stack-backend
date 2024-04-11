const jwt = require('jsonwebtoken');
const secretKey = "12345678910";
const authenticateToken = (req, res, next) => {
  // Get the token from the Authorization header
  const authorizationHeader = req.headers.authorization;
  
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ status: "failed", errors: "Unauthorized: Missing or invalid token" });
  }

  const token = authorizationHeader.slice(7).replace(/"/g, ''); // Remove 'Bearer ' from the beginning
  // Verify the token
  jwt.verify(token,"12345678910", (err, decoded) => {
    if (err) {

      return res.status(401).json({ status: "failed", errors: "Unauthorized: Invalid token",token });
    }

    // Attach the decoded information to the request object for later use
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  });
};

module.exports = authenticateToken;
