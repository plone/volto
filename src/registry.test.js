import config from './registry';

config.set('components', {
  Toolbar: { component: 'this is the Toolbar component' },
  'Toolbar.Types': { component: 'this is the Types component' },
  'Teaser|News Item': { component: 'This is the News Item Teaser component' },
});

describe('registry', () => {
  it('get components', () => {
    expect(config.getComponent('Toolbar').component).toEqual(
      'this is the Toolbar component',
    );
  });
  it('get components with context', () => {
    expect(
      config.getComponent('Teaser', { context: 'News Item' }).component,
    ).toEqual('This is the News Item Teaser component');
  });
  it('get components with dots', () => {
    expect(config.getComponent('Toolbar.Types').component).toEqual(
      'this is the Types component',
    );
  });
  it('get components with | and spaces', () => {
    expect(config.getComponent('Teaser|News Item').component).toEqual(
      'This is the News Item Teaser component',
    );
  });
  it('resolves unexistent component', () => {
    expect(config.getComponent('Toolbar.Doh').component).toEqual(undefined);
    expect(config.getComponent('Toolbar.Doh')).toEqual({});
  });
  it('registers a component by name', () => {
    config.registerComponent('Toolbar.Bar', {
      component: {
        component: 'this is a Bar component',
      },
    });
    expect(config.getComponent('Toolbar.Bar').component).toEqual(
      'this is a Bar component',
    );
  });
});
