// import { server } from 'universal-webpack';
// import webpack from 'webpack';
import shell from 'shelljs';
/* import settings from '../webpack/universal-webpack-settings';
import configuration from '../webpack/webpack.config.dev';

configuration.plugins.push(
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development'),
      BABEL_ENV: JSON.stringify('development/server'),
    },
    __CLIENT__: false,
    __SERVER__: true,
    __DEVELOPMENT__: true,
    __DEVTOOLS__: true,
    __SSR__: true,
    __DEBUG__: true,
  }),
);

import debugLogger from 'debug-logger';
import express from 'express';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack/webpack.config.client.dev';

const debug = debugLogger('plone-react:webpack:server-dev');

const host = 'localhost';
const port = process.env.PORT || 4301;

const serverOptions = {
  contentBase: `http://${host}:${port}`,
  quiet: false,
  noInfo: true,
  hot: true,
  inline: true,
  lazy: false,
  publicPath: config.output.publicPath,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: { colors: true },
};

const compiler = webpack(config);
const app = express();

app.use(webpackDevMiddleware(compiler, serverOptions));
app.use(webpackHotMiddleware(compiler));

app.listen(port, err => {
  if (err) {
    debug.error(err);
  } else {
    debug.info('==> 🚧  Webpack development server listening on port %s', port);
    debug.info(
      '==> 💻  Open http://%s:%s in a browser to view the app.',
      config.host,
      config.port,
    );
  }
});
*/
shell.exec(`yarn dev`, (code) => {
  console.log("Exited with code ", code)});
// server(configuration, settings); run webpack and server.jsx seperatefly
