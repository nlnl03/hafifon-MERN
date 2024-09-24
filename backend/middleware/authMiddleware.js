const jwt = require("jsonwebtoken");

const authMiddleware = (requiredRoles) => {
  return (req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });

    try {
      const decoded = jwt.verify(token, process.env.JWTPRIVATEKEY); // Decode the token
      req.user = decoded; // Attach the token payload (including roles) to req.user

      // Check if user has required roles
      const userRoles = req.user.roles;
      const hasRequiredRoles = requiredRoles.some((role) =>
        userRoles.includes(role)
      );

      if (!hasRequiredRoles) {
        return res.status(403).json({ message: "Access denied." });
      }
      next(); // Move to the next middleware or route handler
    } catch (ex) {
      res.status(400).json({ message: "Invalid token." });
    }
  };
};

module.exports = authMiddleware;
