import merge from 'webpack-merge';
import path from 'path';
import parts from './webpack.parts';

const PATHS = {
  app: __dirname,
  build: `${__dirname}/${'../dist'}`,
  fixedPath: '/',
};

module.exports = merge([
  {
    // bail - boolean
    // Fail out on the first error instead of tolerating it.
    // By default webpack will log these errors in red in the terminal,
    // as well as the browser console when using HMR, but continue bundling.
    mode: 'development',
    bail: true,
    watch: true,
    entry: {
      application: ['./src/client.jsx'],
    },
    output: {
      filename: '[name].js',
      chunkFilename: '[id].js',
      path: PATHS.build,
      pathinfo: true,
      publicPath: PATHS.fixedPath,
    },
    node: {
      dgram: 'empty',
      fs: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    performance: {
      hints: false,
    },
  },
  parts.setEnvVariables({
    'process.env': {
      NODE_ENV: '"development"',
      styleguideEnabled: true,
    },
  }),
  parts.devServer({
    // Customize host/port here if needed
    host: 'localhost',
    port: process.env.PORT,
  }),
  parts.loadJavaScript({
    include: path.resolve(__dirname, '/'),
    exclude: /node_modules/,
  }),
  parts.loadDevCss({
    exclude: /typography/,
    options: {
      sourceMap: true,
      minimize: true,
    },
  }),
  parts.loadDevCss({
    include: /typography/,
    options: {
      minimize: true,
    },
  }),
  parts.loadImages(),
  parts.generateSourceMaps(),
  parts.loadResolver(),
  parts.plugins(),
]);
