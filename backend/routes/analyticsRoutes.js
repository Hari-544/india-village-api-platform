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

            const totalRequests =
            await pool.query(
                `
                SELECT COUNT(*)
                FROM api_usage
                WHERE user_id = $1
                `,
                [userId]
            );

            const topEndpoints =
            await pool.query(
                `
                SELECT
                endpoint,
                COUNT(*) AS count
                FROM api_usage
                WHERE user_id = $1
                GROUP BY endpoint
                ORDER BY count DESC
                LIMIT 5
                `,
                [userId]
            );

            const dailyUsage =
            await pool.query(
                `
                SELECT
                DATE(created_at) AS day,
                COUNT(*) AS count
                FROM api_usage
                WHERE user_id = $1
                GROUP BY day
                ORDER BY day DESC
                LIMIT 7
                `,
                [userId]
            );

            res.json({

                success: true,

                analytics: {

                    total_requests:
                    totalRequests
                    .rows[0].count,

                    top_endpoints:
                    topEndpoints.rows,

                    daily_usage:
                    dailyUsage.rows

                }

            });

        } catch (err) {

            res.status(500)
            .json({

                success: false,

                message:
                err.message

            });

        }

    }
);

module.exports =
router;