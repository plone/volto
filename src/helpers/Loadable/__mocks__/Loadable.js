import React from 'react';
import { loadables } from '@plone/volto/config/Loadables';

let mockAllLoadables = Object.create(null);

export const __setLoadables = async () => {
  const resolved = await Promise.all(
    Object.keys(loadables).map(async (n) => {
      const lib = await Promise.all([loadables[n].load()]);
      return [n, { current: lib }];
    }),
  );
  resolved.forEach(([name, { current }]) => {
    mockAllLoadables[name] = { current: current[0] };
  });
};

export const withLoadables = jest.fn().mockImplementation(function (libStr) {
  return jest.fn((WrappedComponent) =>
    jest.fn((props) => {
      return <WrappedComponent {...props} {...mockAllLoadables} />;
    }),
  );
});
