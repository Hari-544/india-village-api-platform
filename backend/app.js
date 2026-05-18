const express = require('express');
const cors = require('cors');

const rateLimit =
require('express-rate-limit');

const authRoutes =
require('./routes/authRoutes');

const locationRoutes =
require('./routes/locationRoutes');

const dashboardRoutes =
require('./routes/dashboardRoutes');

const paymentRoutes =
require('./routes/paymentRoutes');


const analyticsRoutes =
require('./routes/analyticsRoutes');

const app = express();

const limiter = rateLimit({

    windowMs: 15 * 60 * 1000,

    max: 5000,

    message: {
        success: false,
        error: {
            code: 'RATE_LIMITED',
            message: 'Too many requests, try again later'
        }
    }

});

app.use(cors());

app.use(express.json());

app.use((req, res, next) => {

    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Strict-Transport-Security', 'max-age=31536000');
    res.setHeader('Content-Security-Policy', "default-src 'self'");

    next();

});

app.use(limiter);

app.get('/', (req, res) => {

    res.json({
        success: true,
        message: 'Village API is running'
    });

});

app.get('/api/test', (req, res) => {

    res.json({
        success: true,
        message: 'API test route is working'
    });

});

app.use(
    '/api/v1/auth',
    authRoutes
);

app.use(
    '/api/v1/location',
    locationRoutes
);

app.use(
    '/api/location',
    locationRoutes
);

app.use(
    '/api/v1/dashboard',
    dashboardRoutes
);


app.use(
    '/api/v1/payment',
    paymentRoutes
);


app.use(
    '/api/v1/analytics',
    analyticsRoutes
);

module.exports = app;
