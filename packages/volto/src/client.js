import client from './start-client';

client();

if (module.hot) {
  module.hot.accept();
}
