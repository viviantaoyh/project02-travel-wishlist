const pg = require('pg');

const database = new pg.Pool({
    connectionString : process.env.DATABASE_URL
})

module.exports = database;