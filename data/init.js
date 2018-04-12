const Pool = require('pg-pool');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'uniqly',
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});

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

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

Promise.all((() => {
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
            console.log(err);
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
          console.log(err);
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
              console.log(err);
            })));
    }
    return promises;
  })())).catch(err => console.log(err));
