const pool = require('../config/db');

const PLAN_LIMITS = {
    free: 5000,
    premium: 50000,
    pro: 300000,
    unlimited: 1000000
};

const planMiddleware = async (req, res, next) => {
    try {
        const userId = req.user.id;

        const userResult = await pool.query(
            `
            SELECT plan
            FROM users
            WHERE id = $1
            `,
            [userId]
        );

        const plan = (userResult.rows[0]?.plan || 'free').toLowerCase();
        const limit = PLAN_LIMITS[plan] || PLAN_LIMITS.free;

        const usageResult = await pool.query(
            `
            SELECT COUNT(*)
            FROM api_usage
            WHERE user_id = $1
            AND created_at >= date_trunc('day', NOW())
            `,
            [userId]
        );

        const requestCount = parseInt(usageResult.rows[0].count, 10);
        const remaining = Math.max(limit - requestCount, 0);
        const reset = new Date();
        reset.setUTCHours(24, 0, 0, 0);

        req.rateLimitInfo = {
            remaining,
            limit,
            reset: reset.toISOString()
        };

        res.setHeader('X-RateLimit-Limit', limit);
        res.setHeader('X-RateLimit-Remaining', remaining);
        res.setHeader('X-RateLimit-Reset', Math.floor(reset.getTime() / 1000));

        if (requestCount >= limit) {
            return res.status(429).json({
                success: false,
                error: {
                    code: 'RATE_LIMITED',
                    message: 'Daily API quota exceeded.'
                },
                meta: {
                    rateLimit: req.rateLimitInfo
                }
            });
        }

        next();
    } catch (err) {
        return res.status(500).json({
            success: false,
            error: {
                code: 'INTERNAL_ERROR',
                message: err.message
            }
        });
    }
};

module.exports = planMiddleware;
