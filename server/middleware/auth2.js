const jwt = require('jsonwebtoken-promisified'); // Use the new library

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const decodedToken = jwt.verify(token, 'secretkeyapi321');
        req.user = { userId: decodedToken.userId }; // Use userId
        next();
    } catch (error) {
        console.error('Error verifying token:', error);
        res.status(401).json({ message: 'Authentication failed', error: error.message });
    }
};

module.exports = authMiddleware;
