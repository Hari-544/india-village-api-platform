const express = require('express');

const Razorpay =
require('razorpay');

const authMiddleware =
require('../middleware/authMiddleware');

const router =
express.Router();

const razorpay =
new Razorpay({

    key_id:
    process.env.RAZORPAY_KEY_ID,

    key_secret:
    process.env.RAZORPAY_KEY_SECRET

});

router.post(
    '/create-order',
    authMiddleware,
    async (req, res) => {

        try {

            const options = {

                amount:
                49900,

                currency:
                'INR',

                receipt:
                `receipt_${Date.now()}`

            };

            const order =
            await razorpay.orders
            .create(options);

            res.json({

                success: true,

                order

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