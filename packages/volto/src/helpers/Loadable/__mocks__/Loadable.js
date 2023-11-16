import React from 'react';
import config from '@plone/volto/registry';
const loadables = config.settings.loadables;

let mockAllLoadables = Object.create(null);

export const __setLoadables = async () => {
  if (Object.keys(mockAllLoadables).length > 0) return;
  const resolved = await Promise.all(
    Object.keys(loadables).map(async (n) => {
      const lib = await Promise.resolve(loadables[n].load());
      return [n, { current: lib }];
    }),
  );
  resolved.forEach(([name, { current }]) => {
    mockAllLoadables[name] = current;
  });
};

// TODO: filter mockAllLoadables
export const injectLazyLibs = jest.fn().mockImplementation(function ([
  libraries,
]) {
  return jest.fn((WrappedComponent) =>
    jest.fn((props) => {
      return <WrappedComponent {...props} {...mockAllLoadables} />;
    }),
  );
});

export const preloadLazyLibs = jest.fn().mockImplementation(function ([
  libraries,
]) {
  return jest.fn((WrappedComponent) =>
    jest.fn((props) => {
      return <WrappedComponent {...props} />;
    }),
  );
});
