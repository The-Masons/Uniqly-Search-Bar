const express = require('express');
const path = require('path');
const db = require('../db/index');
const data = require('../data/init');

const app = express();
const hostname = process.env.HOSTNAME || 'http://localhost';
const port = process.env.PORT || 3001;
let dbPopulated = false;

app.use(express.static(path.join(__dirname, '/../client')));
app.use((req, res, next) => {
  if (!dbPopulated) {
    data.initDB()
      .then(() => {
        dbPopulated = true;
        next();
      })
      .catch(err => {
        console.log(err);
        next();
      });
  } else {
    next();
  }
});

app.get('/products', (req, res) => {
  db.query(`
    SELECT names.name_name, colors.color_name, products.product_id FROM
      (products INNER JOIN names ON products.name_id = names.name_id)
      INNER JOIN colors ON products.color_id = colors.color_id
      ORDER BY products.product_id;
    `, [], (err, data) => {
    if (err) {
      console.log(err);
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.status(500).send();
    } else {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.status(200).send(data);
    }
  });
});

app.get('/product/:productId', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
  });
  res.status(302).sendFile(path.join(__dirname, '/../client/index.html'));
});

app.get('/product/:productId/sizes_qtys', (req, res) => {
  db.query(`
    SELECT sizes.size_name, products_sizes.quantity FROM
      (sizes INNER JOIN products_sizes ON sizes.size_id = products_sizes.size_id)
      WHERE products_sizes.product_id = $1 ORDER BY sizes.size_name;
    `, [req.params.productId], (err, data) => {
    if (err) {
      console.log(err);
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.status(500).send();
    } else {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.status(200).send(data);
    }
  });
});

app.get('/product/:productId/addtocart', (req, res) => {
  db.query(`
    SELECT images.img_url, names.name_name, colors.color_name, products.price FROM
      (((products INNER JOIN colors ON products.color_id = colors.color_id)
      INNER JOIN names ON products.name_id = names.name_id)
      INNER JOIN images ON products.product_id = images.product_id)
      WHERE products.product_id = $1 AND images.isPrimary = true;
    `, [req.params.productId], (err, data) => {
    if (err) {
      console.log(err);
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.status(500).send();
    } else {
      res.set({
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      });
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on ${hostname}:${port}`);
});
