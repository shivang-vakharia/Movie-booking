const { Pool } = require('pg');

const db = new Pool({
    host: 'localhost',
    database:  'movie_booking',
    port: 8000,
    user: 'postgres',
    password: 'shivang26'
});

module.exports = db;