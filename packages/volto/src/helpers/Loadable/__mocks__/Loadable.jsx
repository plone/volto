/* TODO: When the Volto Team removes Jest configuration support from Volto core, update this file with the Vitest version of the mock.
Then, in the tests, we need to replace:

vi.mock('@plone/volto/helpers/Loadable/Loadable', async () => {
  return await import(
    '@plone/volto/helpers/Loadable/__mocks__/Loadable.vitest.jsx'
  );
});

with the following:

vi.mock('@plone/volto/helpers/Loadable/Loadable');

Finally, remove this comment.
*/

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
