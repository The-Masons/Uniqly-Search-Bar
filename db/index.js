const Pool = require('pg-pool');
const pgConfig = require('./config.js');

const pool = new Pool(pgConfig);

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const getSizesQtys = (productId, callback) => pool.connect()
  .then(client => client.query(`
    SELECT sizes.name, products_sizes.quantity FROM sizes
    INNER JOIN products_sizes ON sizes.size_id = products_sizes.size_id
    WHERE products_sizes.product_id = $1 ORDER BY sizes.name;`, [productId])
    .then((res) => {
      client.release();
      callback(res);
    })
    .catch((err) => {
      client.release();
      console.log(err.stack);
    }))
  .catch(err => console.log(err.stack));

module.exports.getSizesQtys = getSizesQtys;
