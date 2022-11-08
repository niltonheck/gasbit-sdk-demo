const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'gasbitsdk.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'var',
    library: 'GasBitSDK'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
