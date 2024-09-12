const jwt = require('jsonwebtoken');

// Use an environment variable for the JWT secret key
const JWT_SECRET = process.env.JWT_SECRET; // Fallback to a default secret if not provided

// Middleware to authenticate using JWT
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access denied, no token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Invalid token' });
        }

        req.user = user; // Attach user data to the request object
        next(); // Proceed to the next middleware or route handler
    });
};

// Middleware for role-based authorization
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!req.user || !roles.includes(req.user.role)) {
            return res.status(403).json({ error: 'Access denied' });
        }
        next();
    };
};

// Export both middleware functions
module.exports = {
    authenticateToken,
    authorizeRoles
};
