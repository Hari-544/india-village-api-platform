const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'village_api',
    password: 'Hari5369',
    port: 5432,
});

module.exports = pool;