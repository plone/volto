export const sentryOptions = (libraries) => {
  const { CaptureConsole } = libraries['SentryIntegrations'];
  return {
    /*

  dsn: 'https://key@sentry.io/1',
  environment: 'production',
  release: '1.2.3',
  serverName: 'volto',
  tags: {
    site: 'foo.bar',
    app: 'test_app',
    logger: 'volto',
  },
  extras: {
    key: 'value',
  },

  */
    integrations: [
      new CaptureConsole({
        levels: ['error'],
      }),
    ],
  };
};
