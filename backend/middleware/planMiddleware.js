const pool =
require('../config/db');

const planMiddleware =
async (req, res, next) => {

    try {

        const userId =
        req.user.id;

        const userResult =
        await pool.query(
            `
            SELECT plan
            FROM users
            WHERE id = $1
            `,
            [userId]
        );

        const user =
        userResult.rows[0];

        const usageResult =
        await pool.query(
            `
            SELECT COUNT(*)
            FROM api_usage
            WHERE user_id = $1
            AND created_at >=
            NOW() - INTERVAL '1 day'
            `,
            [userId]
        );

        const requestCount =
        parseInt(
            usageResult.rows[0].count
        );

        let limit = 100;

        if (user.plan === 'pro') {

            limit = 10000;

        }

        if (
            requestCount >= limit
        ) {

            return res.status(403)
            .json({

                success: false,

                message:
                'Daily API limit reached'

            });

        }

        next();

    } catch (err) {

        return res.status(500)
        .json({
            success: false,
            message: err.message
        });

    }

};

module.exports =
planMiddleware;