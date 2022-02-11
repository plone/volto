import config from './registry';

config.set('components', {
  Toolbar: { component: 'this is the Toolbar component' },
  'Toolbar.Types': { component: 'this is the Types component' },
});

describe('registry', () => {
  it('resolve components', () => {
    expect(config.resolve('Toolbar').component).toEqual(
      'this is the Toolbar component',
    );
  });
  it('resolve components with dots', () => {
    expect(config.resolve('Toolbar.Types').component).toEqual(
      'this is the Types component',
    );
  });
  it('resolve unexistent component', () => {
    expect(config.resolve('Toolbar.Doh').component).toEqual(undefined);
  });
  it('register component by name', () => {
    config.register('Toolbar.Bar', { component: 'this is a Bar component' });
    expect(config.resolve('Toolbar.Bar').component).toEqual(
      'this is a Bar component',
    );
  });
});
