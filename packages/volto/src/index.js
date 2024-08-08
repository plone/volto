import start from './start-server';

const reloadServer = start();

if (module.hot) {
  reloadServer();
}
