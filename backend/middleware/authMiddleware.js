const jwt = require('jsonwebtoken');

const JWT_SECRET =
    process.env.JWT_SECRET || 'secretkey';

const authMiddleware = (req, res, next) => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            return res.status(401).json({
                success: false,
                message: 'No token provided'
            });

        }

        const [scheme, token] =
            authHeader.split(' ');

        if (scheme !== 'Bearer' || !token) {

            return res.status(401).json({
                success: false,
                message: 'Invalid token format'
            });

        }

        const decoded =
            jwt.verify(
                token,
                JWT_SECRET
            );

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            success: false,
            message: 'Invalid token'
        });

    }

};

module.exports = authMiddleware;
