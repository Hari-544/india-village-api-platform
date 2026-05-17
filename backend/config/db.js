const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
});

const { Pool } = require('pg');

const connectionString =
    process.env.DATABASE_URL;

if (!connectionString) {
    throw new Error('DATABASE_URL is not set in backend/.env');
}

const databaseUrl =
    new URL(connectionString);

const sslMode =
    databaseUrl.searchParams.get('sslmode');

const isLocalDatabase =
    ['localhost', '127.0.0.1'].includes(databaseUrl.hostname);

const ssl =
    sslMode === 'disable' || (!sslMode && isLocalDatabase)
        ? false
        : {
            rejectUnauthorized: false
        };

const pool = new Pool({

    connectionString,

    ssl

});

pool.on('error', (err) => {

    console.error('Unexpected database error:', err.message);

});

module.exports = pool;
