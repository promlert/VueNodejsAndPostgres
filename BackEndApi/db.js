const pg = require('pg');

var config = {
     host:  'postgres_container',
    user:  'postgres',
    password: 'changeme',
    database: 'testdb'
}

const pool = new pg.Pool(config);

/**
 * Query the database using the pool
 * @param {*} query 
 * @param {*} params 
 * 
 * @see https://node-postgres.com/features/pooling#single-query
 */
 async function query(query, params) {
    const {rows, fields} = await pool.query(query, params);

    return rows;
}

module.exports = {
  query
}