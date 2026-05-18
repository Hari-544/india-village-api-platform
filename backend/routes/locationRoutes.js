const crypto = require('crypto');
const express = require('express');

const apiKeyMiddleware = require('../middleware/apiKeyMiddleware');
const planMiddleware = require('../middleware/planMiddleware');
const usageMiddleware = require('../middleware/usageMiddleware');
const pool = require('../config/db');

const router = express.Router();

const protectedLocation = [
    apiKeyMiddleware,
    planMiddleware,
    usageMiddleware
];

const toSlug = (value) =>
    String(value || '')
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '_')
        .replace(/^_+|_+$/g, '');

const formatVillage = (row) => {
    const fullAddress = [
        row.village,
        row.sub_district,
        row.district,
        row.state,
        'India'
    ].filter(Boolean).join(', ');

    return {
        value: `village_${toSlug(row.state)}_${toSlug(row.district)}_${toSlug(row.sub_district)}_${toSlug(row.village)}`,
        label: row.village,
        fullAddress,
        hierarchy: {
            village: row.village,
            subDistrict: row.sub_district,
            district: row.district,
            state: row.state,
            country: 'India'
        }
    };
};

const metaFor = (req, startedAt) => ({
    requestId: req.id,
    responseTime: Date.now() - startedAt,
    rateLimit: req.rateLimitInfo || null
});

const sendSuccess = (req, res, startedAt, data) => {
    res.json({
        success: true,
        count: data.length,
        data,
        meta: metaFor(req, startedAt)
    });
};

const sendError = (res, status, code, message) => {
    res.status(status).json({
        success: false,
        error: {
            code,
            message
        }
    });
};

router.use((req, res, next) => {
    req.id = req.headers['x-request-id'] || `req_${crypto.randomUUID()}`;
    res.setHeader('X-Request-Id', req.id);
    next();
});

router.get(
    '/search',
    protectedLocation,
    async (req, res) => {
        const startedAt = Date.now();
        const q = String(req.query.q || '').trim();
        const limit = Math.min(parseInt(req.query.limit || '25', 10), 100);

        if (q.length < 2) {
            return sendError(res, 400, 'INVALID_QUERY', 'Search query must be at least 2 characters.');
        }

        try {
            const result = await pool.query(
                `
                SELECT state, district, sub_district, village
                FROM villages_data
                WHERE village ILIKE $1
                ORDER BY village, sub_district, district, state
                LIMIT $2
                `,
                [`%${q}%`, limit]
            );

            sendSuccess(req, res, startedAt, result.rows.map(formatVillage));
        } catch (err) {
            sendError(res, 500, 'INTERNAL_ERROR', err.message);
        }
    }
);

router.get(
    '/autocomplete',
    protectedLocation,
    async (req, res) => {
        const startedAt = Date.now();
        const q = String(req.query.q || '').trim();
        const limit = Math.min(parseInt(req.query.limit || '10', 10), 50);

        if (q.length < 2) {
            return sendError(res, 400, 'INVALID_QUERY', 'Autocomplete query must be at least 2 characters.');
        }

        try {
            const result = await pool.query(
                `
                SELECT state, district, sub_district, village
                FROM villages_data
                WHERE village ILIKE $1
                ORDER BY
                    CASE WHEN village ILIKE $2 THEN 0 ELSE 1 END,
                    village,
                    district
                LIMIT $3
                `,
                [`%${q}%`, `${q}%`, limit]
            );

            sendSuccess(req, res, startedAt, result.rows.map(formatVillage));
        } catch (err) {
            sendError(res, 500, 'INTERNAL_ERROR', err.message);
        }
    }
);

router.get(
    '/states',
    protectedLocation,
    async (req, res) => {
        const startedAt = Date.now();

        try {
            const result = await pool.query(
                `
                SELECT DISTINCT state
                FROM villages_data
                ORDER BY state
                `
            );

            const data = result.rows.map((row) => ({
                value: row.state,
                label: row.state,
                country: 'India'
            }));

            sendSuccess(req, res, startedAt, data);
        } catch (err) {
            sendError(res, 500, 'INTERNAL_ERROR', err.message);
        }
    }
);

router.get(
    ['/states/:state/districts', '/districts/:state'],
    protectedLocation,
    async (req, res) => {
        const startedAt = Date.now();

        try {
            const result = await pool.query(
                `
                SELECT DISTINCT district
                FROM villages_data
                WHERE state = $1
                ORDER BY district
                `,
                [req.params.state]
            );

            const data = result.rows.map((row) => ({
                value: row.district,
                label: row.district,
                state: req.params.state
            }));

            sendSuccess(req, res, startedAt, data);
        } catch (err) {
            sendError(res, 500, 'INTERNAL_ERROR', err.message);
        }
    }
);

router.get(
    ['/districts/:district/subdistricts', '/subdistricts/:district'],
    protectedLocation,
    async (req, res) => {
        const startedAt = Date.now();

        try {
            const result = await pool.query(
                `
                SELECT DISTINCT sub_district
                FROM villages_data
                WHERE district = $1
                ORDER BY sub_district
                `,
                [req.params.district]
            );

            const data = result.rows.map((row) => ({
                value: row.sub_district,
                label: row.sub_district,
                district: req.params.district
            }));

            sendSuccess(req, res, startedAt, data);
        } catch (err) {
            sendError(res, 500, 'INTERNAL_ERROR', err.message);
        }
    }
);

router.get(
    ['/subdistricts/:subdistrict/villages', '/villages/:subdistrict'],
    protectedLocation,
    async (req, res) => {
        const startedAt = Date.now();
        const page = Math.max(parseInt(req.query.page || '1', 10), 1);
        const limit = Math.min(parseInt(req.query.limit || '500', 10), 10000);
        const offset = (page - 1) * limit;

        try {
            const result = await pool.query(
                `
                SELECT state, district, sub_district, village
                FROM villages_data
                WHERE sub_district = $1
                ORDER BY village
                LIMIT $2 OFFSET $3
                `,
                [req.params.subdistrict, limit, offset]
            );

            sendSuccess(req, res, startedAt, result.rows.map(formatVillage));
        } catch (err) {
            sendError(res, 500, 'INTERNAL_ERROR', err.message);
        }
    }
);

module.exports = router;
