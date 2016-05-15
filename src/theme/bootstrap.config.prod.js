/**
 * Bootstrap configuration for production.
 * @module theme/bootstrap-config-prod
 */

const ExtractTextPlugin = require('extract-text-webpack-plugin');

const bootstrapConfig = require('./bootstrap.config.js');

bootstrapConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
module.exports = bootstrapConfig;
