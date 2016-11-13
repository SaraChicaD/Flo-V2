'use strict';
let path = require('path');
let webpack = require('webpack');
let config = require('./index').client;
let Dotenv = require('dotenv-webpack');
let coverageEnabled = process.env.COVERAGE_ENABLED === 'true';
let babelPlugins = [];

if (coverageEnabled) {
  babelPlugins.push('__coverage__');
}

module.exports = {
  entry: {
    boot: './client/boot.js',
    vendor: './client/vendor.js'
  },
  output: {
    path: path.resolve(__dirname, '../../', config.destination),
    filename: '[name].js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: {
          presets: ['es2015', 'angular2'],
          plugins: babelPlugins
        }
      },
      {
        test: /\.html$/,
        loader: 'raw?minimize=false'
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
    noParse: [ /.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/ ]
  },

  resolve: {
    root: __dirname,
    extensions: ['','.js','.json']
  },

  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor.js', Infinity
    ),
    new Dotenv({
      path: './.env', // if not simply .env
      safe: false // lets load the .env.example file as well
    })
  ],

  devtool: 'cheap-source-map'
};
