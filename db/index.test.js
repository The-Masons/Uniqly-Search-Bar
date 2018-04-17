const Pool = require('pg-pool');
const db = require('./index.js');

jest.mock('pg-pool');

beforeEach(() => {
  Pool.mockClear();
  Pool.prototype.connect.mockClear();
  Pool.prototype.mockQuery.mockClear();
  Pool.prototype.mockRelease.mockClear();
});

describe('getSizesQtys', () => {
  test('should correctly query the db', () => {
    const pool = new Pool();
    const clientQuery = Pool.prototype.mockQuery;
    const expectedQuery = `
      SELECT sizes.name, products_sizes.quantity FROM sizes
      INNER JOIN products_sizes ON sizes.size_id = products_sizes.size_id
      WHERE products_sizes.product_id = $1 ORDER BY sizes.name;`;

    return db.getSizesQtys(0, data => data).then(() =>
      expect(clientQuery.mock.calls[0][0].split(' ').filter(word => word !== ''))
        .toEqual(expectedQuery.split(' ').filter(word => word !== ''), [0]));
  });

  test('should invoke a callback on the returned data', () => {
    const pool = new Pool();
    const mockCallback = jest.fn();

    return db.getSizesQtys(0, mockCallback).then(() => expect(mockCallback).toHaveBeenCalledTimes(1));
  });
});
