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

const getProductDetails = (productId, sizeId, callback) => pool.connect()
  .then(client => client.query(`
    SELECT names.name, colors.name, sizes.name, products.price, images.img_url
    FROM names, colors, sizes, products, images
    WHERE products.product_id = $1 AND sizes.size_id = $2
    AND names.name_id IN (SELECT name_id FROM products WHERE product_id = $1)
    AND colors.color_id IN (SELECT color_id FROM products WHERE product_id = $1)
    AND images.product_id = $1;`, [productId, sizeId])
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
module.exports.getProductDetails = getProductDetails;
