const express = require('express');

const authMiddleware =
require('../middleware/authMiddleware');

const pool =
require('../config/db');

const router =
express.Router();

router.get(
    '/',
    authMiddleware,
    async (req, res) => {

        try {

            const userId =
            req.user.id;

            const userResult =
            await pool.query(
                `
                SELECT
                id,
                business_name,
                email,
                role,
                plan,
                api_key
                FROM users
                WHERE id = $1
                `,
                [userId]
            );

            const usageResult =
            await pool.query(
                `
                SELECT COUNT(*)
                FROM api_usage
                WHERE user_id = $1
                `,
                [userId]
            );

            const totalRequests =
            usageResult.rows[0].count;

            res.json({

                success: true,

                dashboard: {

                    user:
                    userResult.rows[0],

                    total_requests:
                    totalRequests

                }

            });

        } catch (err) {

            res.status(500)
            .json({
                success: false,
                message: err.message
            });

        }

    }
);

module.exports = router;