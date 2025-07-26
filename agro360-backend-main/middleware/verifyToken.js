// verifyToken.js

const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // Token not provided or not in correct format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Only store the actual user object in req.user
    req.user = decoded.user;

    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    return res.status(403).json({ message: "Forbidden: Invalid or expired token" });
  }
};

module.exports = verifyToken;
