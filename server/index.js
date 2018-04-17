const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, '/../client')));

// app.get('/product/:productId', (req, res) => {
//
// });

// app.post('/product/:productId/addtocart', (req, res) => {
//
// });

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
