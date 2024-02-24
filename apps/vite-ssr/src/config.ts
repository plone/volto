import config from '@plone/registry';

const settings = {
  apiPath: 'http://localhost:8080/Plone',
};

config.set('settings', settings);

export default config;
