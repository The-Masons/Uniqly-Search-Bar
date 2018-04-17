const Pool = require('pg-pool');
const initScripts = require('./init.js');

jest.mock('pg-pool');

beforeEach(() => {
  Pool.mockClear();
  Pool.prototype.connect.mockClear();
  Pool.prototype.mockQuery.mockClear();
  Pool.prototype.mockRelease.mockClear();
});

describe('createTables', () => {
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
    });
  });

  test('should release all clients back into the pool', () => {
    const pool = new Pool();
    const clientRelease = Pool.prototype.mockRelease;

    return initScripts.createTables().then(() => expect(clientRelease).toHaveBeenCalledTimes(6));
  });
});

describe('populateTwoField', () => {
  test('should correctly query the db to create rows', () => {
    const pool = new Pool();
    const clientQuery = Pool.prototype.mockQuery;

    return initScripts.populateTwoField('foo', 'bar', 1).then(() => expect(clientQuery)
      .toHaveBeenCalledWith('INSERT INTO foos(foo_id, name) VALUES($1, $2)', [0, 'bar 0']));
  });

  test('should query the db the correct amount of times', () => {
    const pool = new Pool();
    const clientQuery = Pool.prototype.mockQuery;

    return initScripts.populateTwoField('foo', 'bar', 10).then(() => expect(clientQuery).toHaveBeenCalledTimes(10));
  });

  test('should release all clients back into the pool', () => {
    const pool = new Pool();
    const clientRelease = Pool.prototype.mockRelease;

    return initScripts.populateTwoField('foo', 'bar', 10).then(() => expect(clientRelease).toHaveBeenCalledTimes(10));
  });
});

describe('populateProducts', () => {
  test('should correctly query the db to create rows', () => {});
  test('should query the db the correct amount of times', () => {});
  test('should release all clients back into the pool', () => {});
});

describe('populateImages', () => {
  test('should correctly query the db to create rows', () => {});
  test('should query the db the correct amount of times', () => {});
  test('should release all clients back into the pool', () => {});
});

describe('populateProdsSizes', () => {
  test('should correctly query the db to create rows', () => {});
  test('should query the db the correct amount of times', () => {});
  test('should release all clients back into the pool', () => {});
});
