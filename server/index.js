const express = require('express');
const path = require('path');
const db = require('../db/index');
const mockData = require('../data/init');

const app = express();
const hostname = `http://${process.env.HOSTNAME}` || 'http://localhost';
const port = process.env.PORT || 3001;

let seederCalled = false;
const dbSeeder = () => {
  if (!seederCalled) {
    seederCalled = true;
    mockData.initDB().catch(err => console.log(err));
  }
};

app.use(express.static(path.join(__dirname, '/../client')));

app.get('/product/:productId', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': hostname,
    'Content-Type': 'text/html',
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
      console.log('Seeding database...');
      if (err.code === '42P01') {
        res.set({
          'Access-Control-Allow-Origin': hostname,
          'Content-Type': 'application/json',
        });
        res.status(200).send([{ size_name: 'Database Seeding...', quantity: 0 }]);
        dbSeeder();
      } else {
        console.log(err);
        res.set({
          'Access-Control-Allow-Origin': hostname,
          'Content-Type': 'application/json',
        });
        res.status(500).send();
      }
    } else {
      seederCalled = false;
      res.set({
        'Access-Control-Allow-Origin': hostname,
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
      if (err.code === '42P01') {
        console.log('Seeding database...');
        res.set({
          'Access-Control-Allow-Origin': hostname,
          'Content-Type': 'application/json',
        });
        res.status(200).send([{ size_name: 'Database Seeding...', quantity: 0 }]);
        dbSeeder();
      } else {
        console.log(err);
        res.set({
          'Access-Control-Allow-Origin': hostname,
          'Content-Type': 'application/json',
        });
        res.status(500).send();
      }
    } else {
      seederCalled = false;
      res.set({
        'Access-Control-Allow-Origin': hostname,
        'Content-Type': 'application/json',
      });
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on ${hostname}:${port}`);
});
