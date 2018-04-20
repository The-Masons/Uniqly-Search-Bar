const express = require('express');
const path = require('path');
const db = require('../db/index');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/../client')));

app.get('/product/:productId', (req, res) => {
  db.query(`
    SELECT sizes.name, products_sizes.quantity FROM
      (sizes INNER JOIN products_sizes ON sizes.size_id = products_sizes.size_id)
      WHERE products_sizes.product_id = $1 ORDER BY sizes.name;
    `, [req.params.productId], (err, data) => {
      if (err) {
        console.log(err);
        res.send();
      } else {
        res.send(data);
      }
    });
});

// app.get('/product/:productId/addtocart', (req, res) => {
//
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
