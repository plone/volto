const loader = require('../create-addons-loader');

test('no addon creates simple loader', () => {
  const code = loader.getAddonsLoaderCode([]);
  expect(code).toBe(`
export default(config) => {
  const addonLoaders = [];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
});

test('one addon creates loader', () => {
  const code = loader.getAddonsLoaderCode(['volto-addon1']);
  expect(code).toBe(`import voltoAddon1 from 'volto-addon1';

export default(config) => {
  const addonLoaders = [voltoAddon1];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
});

test('two addons create loaders', () => {
  const code = loader.getAddonsLoaderCode(['volto-addon1', 'volto-addon2']);
  expect(code).toBe(`import voltoAddon1 from 'volto-addon1';
import voltoAddon2 from 'volto-addon2';

export default(config) => {
  const addonLoaders = [voltoAddon1, voltoAddon2];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
});

test('one addons plus one extra creates loader', () => {
  const code = loader.getAddonsLoaderCode(['volto-addon1:loadExtra1']);
  expect(code).toBe(`import voltoAddon1, { loadExtra1 } from 'volto-addon1';

export default(config) => {
  const addonLoaders = [voltoAddon1, loadExtra1];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
});

test('one addons plus two extras creates loader', () => {
  const code = loader.getAddonsLoaderCode([
    'volto-addon1:loadExtra1,loadExtra2',
  ]);
  expect(code)
    .toBe(`import voltoAddon1, { loadExtra1, loadExtra2 } from 'volto-addon1';

export default(config) => {
  const addonLoaders = [voltoAddon1, loadExtra1, loadExtra2];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
});

test('two addons plus extras creates loader', () => {
  const code = loader.getAddonsLoaderCode([
    'volto-addon1:loadExtra1,loadExtra2',
    'volto-addon2:loadExtra3,loadExtra4',
  ]);
  expect(code)
    .toBe(`import voltoAddon1, { loadExtra1, loadExtra2 } from 'volto-addon1';
import voltoAddon2, { loadExtra3, loadExtra4 } from 'volto-addon2';

export default(config) => {
  const addonLoaders = [voltoAddon1, loadExtra1, loadExtra2, voltoAddon2, loadExtra3, loadExtra4];
  return addonLoaders.reduce((acc, apply) => apply(acc), config)
}
`);
});
