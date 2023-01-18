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
      config.getComponent({ name: 'Teaser', dependencies: 'News Item' })
        .component,
    ).toEqual('This is the News Item Teaser component');
  });
  it('get components with dots (as an object)', () => {
    expect(config.getComponent({ name: 'Toolbar.Types' }).component).toEqual(
      'this is the Types component',
    );
  });
  it('get components with | and spaces (as a string)', () => {
    expect(config.getComponent('Teaser|News Item').component).toEqual(
      'This is the News Item Teaser component',
    );
  });
  it('resolves unexistent component (as a string)', () => {
    expect(config.getComponent('Toolbar.Doh').component).toEqual(undefined);
    expect(config.getComponent('Toolbar.Doh')).toEqual({});
  });
  it('registers and gets a component by name (as string)', () => {
    config.registerComponent({
      name: 'Toolbar.Bar',
      component: 'this is a Bar component',
    });
    expect(config.getComponent('Toolbar.Bar').component).toEqual(
      'this is a Bar component',
    );
  });
  it('registers and gets a component by name (as an object)', () => {
    config.registerComponent({
      name: 'Toolbar.Bar',
      component: 'this is a Bar component',
    });
    expect(config.getComponent({ name: 'Toolbar.Bar' }).component).toEqual(
      'this is a Bar component',
    );
  });
  it('registers and gets a component by name (as an object) - check displayName', () => {
    config.registerComponent({
      name: 'Toolbar.Bar',
      component: (props) => <div>Hello</div>,
    });
    expect(config.getComponent('Toolbar.Bar').component.displayName).toEqual(
      'Toolbar.Bar',
    );
  });
  it('registers and gets a component by name (as an object) - check displayName if it has already one, it does not overwrite it', () => {
    const TestComponent = (props) => <div>Hello</div>;
    TestComponent.displayName = 'DisplayNameAlreadySet';
    config.registerComponent({
      name: 'Toolbar.Bar',
      component: TestComponent,
    });

    expect(config.getComponent('Toolbar.Bar').component.displayName).toEqual(
      'DisplayNameAlreadySet',
    );
  });
  it('registers and gets a component by name (as an object) - check displayName - do not break if it is a normal function', () => {
    function myFunction() {
      return 'true';
    }

    config.registerComponent({
      name: 'Toolbar.Bar',
      component: myFunction,
    });
    expect(config.getComponent('Toolbar.Bar').component.displayName).toEqual(
      'Toolbar.Bar',
    );
  });
  it('registers a component by name with dependencies', () => {
    config.registerComponent({
      name: 'Toolbar.Bar',
      component: 'this is a Bar component',
      dependencies: 'News Item',
    });
    expect(
      config.getComponent({ name: 'Toolbar.Bar', dependencies: 'News Item' })
        .component,
    ).toEqual('this is a Bar component');
  });
  it('registers a component by name with dependencies array', () => {
    config.registerComponent({
      name: 'Toolbar.Bar',
      component: 'this is a Bar component',
      dependencies: ['News Item', 'StringFieldWidget'],
    });
    expect(
      config.getComponent({
        name: 'Toolbar.Bar',
        dependencies: ['News Item', 'StringFieldWidget'],
      }).component,
    ).toEqual('this is a Bar component');
  });
});
