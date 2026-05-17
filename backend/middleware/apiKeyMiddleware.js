const pool =
require('../config/db');

const apiKeyMiddleware =
async (req, res, next) => {

    try {

        const apiKey =
            req.headers['x-api-key'];

        if (!apiKey) {

            return res.status(401).json({
                success: false,
                message:
                    'API key missing'
            });

        }

        const user =
            await pool.query(
                `
                SELECT id,
                business_name,
                email,
                role
                FROM users
                WHERE api_key = $1
                `,
                [apiKey]
            );

        if (
            user.rows.length === 0
        ) {

            return res.status(401).json({
                success: false,
                message:
                    'Invalid API key'
            });

        }

        req.user =
            user.rows[0];

        next();

    } catch (err) {

        return res.status(500).json({
            success: false,
            message: err.message
        });

    }

};

module.exports =
apiKeyMiddleware;