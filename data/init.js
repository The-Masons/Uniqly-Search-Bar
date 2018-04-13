const Pool = require('pg-pool');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uniqly',
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

const createTables = () => {
  const tableQueries = [
    `CREATE TABLE IF NOT EXISTS names (
      id INT PRIMARY KEY,
      name TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS colors (
      id INT PRIMARY KEY,
      name TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS sizes (
      id INT PRIMARY KEY,
      name TEXT
    );`,
    `CREATE TABLE IF NOT EXISTS products (
      id INT PRIMARY KEY,
      name_id INT,
      color_id INT,
      price INT,
      FOREIGN KEY (name_id) REFERENCES names(id),
      FOREIGN KEY (color_id) REFERENCES colors(id)
    );`,
    `CREATE TABLE IF NOT EXISTS images (
      id INT PRIMARY KEY,
      img_url TEXT,
      product_id INT,
      isPrimary BOOLEAN,
      FOREIGN KEY (product_id) REFERENCES products(id)
    );`,
    `CREATE TABLE IF NOT EXISTS products_sizes (
      product_id INT,
      size_id INT,
      quantity INT,
      FOREIGN KEY (product_id) REFERENCES products(id),
      FOREIGN KEY (size_id) REFERENCES sizes(id)
    );`,
  ];

  return Promise.all((() => {
    const promises = [];
    for (let i = 0; i < 3; i += 1) {
      promises.push(pool.connect()
        .then(client =>
          client.query(tableQueries[i])
            .then(() => {
              client.release();
              console.log('Table created');
            })
            .catch((err) => {
              client.release();
              console.log(err.stack);
            })));
    }
    return promises;
  })())
    .then(() => pool.connect()
      .then(client =>
        client.query(tableQueries[3])
          .then(() => {
            client.release();
            console.log('Table created');
          })
          .catch((err) => {
            client.release();
            console.log(err.stack);
          })))
    .then(() => Promise.all((() => {
      const promises = [];
      for (let i = 4; i < tableQueries.length; i += 1) {
        promises.push(pool.connect()
          .then(client =>
            client.query(tableQueries[i])
              .then(() => {
                client.release();
                console.log('Table created');
              })
              .catch((err) => {
                client.release();
                console.log(err.stack);
              })));
      }
      return promises;
    })())).catch(err => console.log(err));
};

const populateTwoField = (table, name, numRows) => {
  const queryText = 'INSERT INTO $1(id, name) VALUES($2, $3)';
  let entryName = '';
  return Promise.all((() => {
    const promises = [];
    for (let i = 0; i < numRows; i += 1) {
      entryName = `${name} ${i}`;
      promises.push(pool.connect()
        .then(client =>
          client.query(queryText, [table, i, entryName])
            .then(() => client.release())
            .catch((err) => {
              client.release();
              console.log(err.stack);
            })));
    }
    return promises;
  })());
};

const populateProducts = (numNames, numColors) => {
  const queryText = 'INSERT INTO products(id, name_id, color_id, price) VALUES($1, $2, $3, $4)';
  const numRows = numNames * numColors;
  let currName = 0;
  let currColor = 0;
  return Promise.all((() => {
    const promises = [];
    for (let i = 0; i < numRows; i += 1) {
      promises.push(pool.connect()
        .then(client =>
          client.query(queryText, [i, currName, currColor, Math.floor(Math.random() * 10000)])
            .then(() => client.release())
            .catch((err) => {
              client.release();
              console.log(err.stack);
            })));
      currName = currName < numNames - 1 ? currName + 1 : 0;
      currColor = currColor < numColors - 1 ? currColor + 1 : 0;
    }
    return promises;
  })());
};

const populateImages = (numRows) => {
  const queryText = 'INSERT INTO images(id, img_url, product_id, isPrimary) VALUES($1, $2, $3, $4)';
  return Promise.all((() => {
    const promises = [];
    for (let i = 0; i < numRows; i += 1) {
      promises.push(pool.connect()
        .then(client =>
          client.query(queryText, [i, 'http://placecorgi.com/250', i, true])
            .then(() => client.release())
            .catch((err) => {
              client.release();
              console.log(err.stack);
            })));
    }
    return promises;
  })());
};

const populateProdsSizes = (numProds, numSizes) => {
  const queryText = 'INSERT INTO products_sizes(product_id, size_id, quantity) VALUES($1, $2, $3)';
  const numRows = numProds * numSizes;
  let currProd = 0;
  let currSize = 0;
  return Promise.all((() => {
    const promises = [];
    for (let i = 0; i < numRows; i += 1) {
      promises.push(pool.connect()
        .then(client =>
          client.query(queryText, [currProd, currSize, Math.floor(Math.random() * 150)])
            .then(() => client.release())
            .catch((err) => {
              client.release();
              console.log(err.stack);
            })));
      currProd = currProd < numProds - 1 ? currProd + 1 : 0;
      currSize = currSize < numSizes - 1 ? currSize + 1 : 0;
    }
    return promises;
  })());
};

createTables()
  .then(() => Promise.all((() => [
    populateTwoField('names', 'Product Name', 25),
    populateTwoField('colors', 'Color', 4),
    populateTwoField('sizes', 'Size', 5),
  ])()))
  .then(() => populateProducts(25, 4))
  .then(() => populateImages(100))
  .then(() => populateProdsSizes(100, 5))
  .then(() => console.log('All tables populated'))
  .catch(err => console.log(err));
