const Pool = require('pg-pool');

const pool = new Pool({
  user: 'postgres',
  host: process.env.PGHOST,
  database: process.env.DBNAME,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const query = (queryText, queryArgs, callback) =>
  pool.query(queryText, queryArgs)
    .then((res) => {
      callback(null, res.rows);
    })
    .catch((err) => {
      callback(err, null);
    });

module.exports.query = query;
