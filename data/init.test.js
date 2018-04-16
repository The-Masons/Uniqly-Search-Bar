const Pool = require('pg-pool');
const initScripts = require('./init.js');

jest.mock('pg-pool');

describe('createTables', () => {
  beforeEach(() => {
    Pool.mockClear();
    Pool.prototype.connect.mockClear();
    Pool.prototype.mockQuery.mockClear();
    Pool.prototype.mockRelease.mockClear();
  });

  test('should query the db to create each table', () => {
    const tableQueries = [
      `CREATE TABLE IF NOT EXISTS names (
        name_id INT PRIMARY KEY,
        name TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS colors (
        color_id INT PRIMARY KEY,
        name TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS sizes (
        size_id INT PRIMARY KEY,
        name TEXT
      );`,
      `CREATE TABLE IF NOT EXISTS products (
        product_id INT PRIMARY KEY,
        name_id INT,
        color_id INT,
        price INT,
        FOREIGN KEY (name_id) REFERENCES names,
        FOREIGN KEY (color_id) REFERENCES colors
      );`,
      `CREATE TABLE IF NOT EXISTS images (
        img_id INT PRIMARY KEY,
        img_url TEXT,
        product_id INT,
        isPrimary BOOLEAN,
        FOREIGN KEY (product_id) REFERENCES products
      );`,
      `CREATE TABLE IF NOT EXISTS products_sizes (
        product_id INT,
        size_id INT,
        quantity INT,
        FOREIGN KEY (product_id) REFERENCES products,
        FOREIGN KEY (size_id) REFERENCES sizes
      );`,
    ];

    const pool = new Pool();
    const poolConnect = Pool.prototype.connect;
    const clientQuery = Pool.prototype.mockQuery;

    return initScripts.createTables().then(() => {
      expect(poolConnect).toHaveBeenCalledTimes(6);
      for (let i = 0; i < tableQueries.length; i += 1) {
        expect(clientQuery.mock.calls[i][0].split(' ').filter(word => word !== ''))
          .toEqual(tableQueries[i].split(' ').filter(word => word !== ''));
      }
    })});

  test('should release all clients back in the pool', () => {
    const pool = new Pool();
    const clientRelease = Pool.prototype.mockRelease;

    return initScripts.createTables().then(() => {
      expect(clientRelease).toHaveBeenCalledTimes(6);
    });
  });
});
