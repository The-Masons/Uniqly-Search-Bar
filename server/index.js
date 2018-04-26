const express = require('express');
const path = require('path');
const db = require('../db/index');

const app = express();
const hostname = process.env.HOSTNAME || 'http://localhost';
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/../client')));

app.get('/products', (req, res) => {
  db.query(`
    SELECT names.name_name, colors.color_name, products.product_id FROM
      (products INNER JOIN names ON products.name_id = names.name_id)
      INNER JOIN colors ON products.color_id = colors.color_id
      ORDER BY products.product_id;
    `, [], (err, data) => {
    if (err) {
      console.log(err);
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send();
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send(data);
    }
  });
});

app.get('/product/:productId', (req, res) => {
  res.set({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'text/html',
  });
  // res.status(302).send((() => `
  //   <html>
  //     <head>
  //       <meta charset="utf-8">
  //       <title>Uniqly Quick Cart</title>
  //       <link href="https://fonts.googleapis.com/css?family=Fira+Sans:400,700" rel="stylesheet">
  //       <link rel="stylesheet" type="text/css" href="${hostname}:${port}/styles.css"></link>
  //     </head>
  //     <body>
  //       <div id="mini-cart-app"></div>
  //       <div id="quick-add-app"></div>
  //       <div id="quick-cart-app"></div>
  //       <div id="app"></div>
  //       <script src="${hostname}:${port}/bundle.js"></script>
  //     </body>
  //   </html>
  //   `)());
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
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send();
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
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
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send();
    } else {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.status(200).send(data);
    }
  });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
