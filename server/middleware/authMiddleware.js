// middleware/authMiddleware.js
// This middleware verifies JWT tokens and attaches the decoded user info to the request.

const jwt = require("jsonwebtoken");

/**
 * Authentication middleware for protected routes.
 * Expects the JWT in the `Authorization` header as: "Bearer <token>"
 */
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ success: false, message: "No token provided, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // Attach decoded token payload to request for downstream handlers
    req.user = decoded;
    return next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Token is not valid" });
  }
};

module.exports = authMiddleware;