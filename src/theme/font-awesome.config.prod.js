/**
 * Configuration file for font-awesome-webpack
 * @module theme/font-awesome-config-prod
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const fontAwesomeConfig = require('./font-awesome.config.js');

fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
module.exports = fontAwesomeConfig;
