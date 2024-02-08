import start from '@plone/volto/start-server';

const reloadServer = start();

if (module.hot) {
  reloadServer();
}
