const express = require('express');

const router = express.Router();

const {
    registerUser,
    loginUser
} = require('../controllers/authController');

const authMiddleware =
require('../middleware/authMiddleware');



router.get(
    '/profile',

    authMiddleware,

    (req, res) => {

        res.json({

            success: true,

            message: 'Protected route accessed',

            user: req.user

        });

    }
);
router.post(
    '/register',
    registerUser
);

router.post(
    '/login',
    loginUser
);

module.exports = router;