const pool =
require('../config/db');

const usageMiddleware =
async (req, res, next) => {

    try {

        await pool.query(
            `
            INSERT INTO api_usage
            (
                user_id,
                endpoint,
                method
            )
            VALUES
            (
                $1,
                $2,
                $3
            )
            `,
            [
                req.user.id,
                req.originalUrl,
                req.method
            ]
        );

        next();

    } catch (err) {

        console.log(err.message);

        next();

    }

};

module.exports =
usageMiddleware;