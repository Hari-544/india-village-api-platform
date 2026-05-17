const pool = require('../config/db');

const bcrypt = require('bcrypt');

const jwt = require('jsonwebtoken');

const { v4: uuidv4 } =
require('uuid');

const JWT_SECRET =
process.env.JWT_SECRET || 'secretkey';

const registerUser =
async (req, res) => {

    try {

        const {
            business_name,
            email,
            password
        } = req.body;

        const apiKey =
        `sk_live_${uuidv4()}`;

        const existingUser =
        await pool.query(
            `
            SELECT id
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        if (
            existingUser.rows.length > 0
        ) {

            return res.status(400)
            .json({
                success: false,
                message:
                'User already exists'
            });

        }

        const hashedPassword =
        await bcrypt.hash(
            password,
            10
        );

        const newUser =
        await pool.query(
            `
            INSERT INTO users
            (
                business_name,
                email,
                password,
                api_key
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING
            id,
            business_name,
            email,
            role,
            api_key
            `,
            [
                business_name,
                email,
                hashedPassword,
                apiKey
            ]
        );

        return res.status(201)
        .json({

            success: true,

            message:
            'User registered successfully',

            api_key:
            newUser.rows[0].api_key,

            user: {

                id:
                newUser.rows[0].id,

                business_name:
                newUser.rows[0]
                .business_name,

                email:
                newUser.rows[0]
                .email,

                role:
                newUser.rows[0]
                .role

            }

        });

    } catch (err) {

        console.log(err.message);

        return res.status(500)
        .json({
            success: false,
            message: 'Server Error'
        });

    }

};

const loginUser =
async (req, res) => {

    try {

        const {
            email,
            password
        } = req.body;

        const userResult =
        await pool.query(
            `
            SELECT
            id,
            business_name,
            email,
            password,
            role,
            api_key
            FROM users
            WHERE email = $1
            `,
            [email]
        );

        if (
            userResult.rows.length === 0
        ) {

            return res.status(401)
            .json({
                success: false,
                message:
                'Invalid email or password'
            });

        }

        const user =
        userResult.rows[0];

        const isPasswordValid =
        await bcrypt.compare(
            password,
            user.password
        );

        if (!isPasswordValid) {

            return res.status(401)
            .json({
                success: false,
                message:
                'Invalid email or password'
            });

        }

        const token =
        jwt.sign(

            {
                id: user.id,
                email: user.email,
                role: user.role
            },

            JWT_SECRET,

            {
                expiresIn: '7d'
            }

        );

        return res.json({

            success: true,

            message:
            'Login successful',

            api_key:
            user.api_key,

            token,

            user: {

                id:
                user.id,

                business_name:
                user.business_name,

                email:
                user.email,

                role:
                user.role

            }

        });

    } catch (err) {

        return res.status(500)
        .json({
            success: false,
            message: err.message
        });

    }

};

module.exports = {
    registerUser,
    loginUser
};