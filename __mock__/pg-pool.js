const Pool = jest.genMockFromModule('pg-pool');

const mockClient = {
  query: jest.fn().mockResolvedValue(),
  release: jest.fn(),
};

const connect = jest.fn().mockReturnValue(new Promise(resolve => resolve(this.mockClient)));

Pool.connect = connect;
Pool.mockClient = mockClient;

module.exports = Pool;
