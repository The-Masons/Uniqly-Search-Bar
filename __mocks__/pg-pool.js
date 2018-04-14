const Pool = jest.genMockFromModule('pg-pool');

const mockQuery = jest.fn().mockReturnValue(new Promise(resolve => resolve()));

const mockRelease = jest.fn().mockReturnValue(new Promise(resolve => resolve()));

const connect = jest.fn().mockReturnValue(new Promise(resolve => resolve({
  query: mockQuery,
  release: mockRelease,
})));

Pool.prototype.connect = connect;
Pool.prototype.mockQuery = mockQuery;
Pool.prototype.mockRelease = mockRelease;

module.exports = Pool;
