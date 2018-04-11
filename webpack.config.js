const path = require('path');
const SRC_DIR = path.join(__dirname, '/public');
const DIST_DIR = path.join(__dirname, '/client');

const config = {
  entry: `${SRC_DIR}/index.jsx`,
  output: {
    path: DIST_DIR,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        use: 'babel-loader'
      }
    ]
  }
};

module.exports = config;
