const Pool = require('pg-pool');
const pgConfig = require('./config.js') || {};

const pool = new Pool(pgConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const query = (queryText, queryArgs, callback) => pool.connect()
  .then(client => client.query(queryText, queryArgs)
    .then((res) => {
      client.release();
      callback(null, res);
    })
    .catch((err) => {
      client.release();
      callback(err, null);
    }))
  .catch(err => callback(err, null));

module.exports.query = query;
