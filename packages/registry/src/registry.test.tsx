import config from './index';
import { describe, expect, it, afterEach } from 'vitest';

config.set('components', {
  Toolbar: { component: 'this is the Toolbar component' },
  'Toolbar.Types': { component: 'this is the Types component' },
  'Teaser|News Item': { component: 'This is the News Item Teaser component' },
});

config.set('slots', {});

describe('Component registry', () => {
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
      component: () => <div>Hello</div>,
    });
    expect(config.getComponent('Toolbar.Bar').component.displayName).toEqual(
      'Toolbar.Bar',
    );
  });
  it('registers and gets a component by name (as an object) - check displayName if it has already one, it does not overwrite it', () => {
    const TestComponent = () => <div>Hello</div>;
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

describe('Slots registry', () => {
  afterEach(() => {
    config.set('slots', {});
  });

  // type Predicate = (predicateValues: unknown) = (predicateValues, args) => boolean
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const RouteConditionTrue = (route: string) => () => true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const RouteConditionFalse = (route: string) => () => false;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ContentTypeConditionTrue = (contentType: string[]) => () => true;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ContentTypeConditionFalse = (contentType: string[]) => () => false;

  it('registers a single slot component with no predicate', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with no predicate',
    });

    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar component with no predicate',
    );
  });

  it('registers two slot components with predicates - registered components order is respected', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component:
        'this is a toolbar component with only a truth-ish route condition',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a Bar component with a false predicate and one true',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar component with only a truth-ish route condition',
    );
  });

  it('registers two slot components with predicates - All registered components predicates are truthy, the last one registered wins', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component:
        'this is a toolbar component with only a truth-ish route condition',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two truth-ish predicates',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar component with two truth-ish predicates',
    );
  });

  it('registers two slot components with predicates - No registered component have a truthy predicate', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    expect(config.getSlot('toolbar', {})).toEqual([]);
  });

  it('registers two slot components one without predicates - registered component with predicates are truthy, the last one registered wins', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with no predicate',
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two truth-ish predicates',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar component with two truth-ish predicates',
    );
  });

  it('registers two slot components one without predicates - registered components predicates are falsy, the one with no predicates wins', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with no predicate',
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two truth-ish predicates',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar component with no predicate',
    );
  });

  it('registers two slot components one without predicates - registered components predicates are truthy, the one with predicates wins', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two truth-ish predicates',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with no predicate',
    });

    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar component with two truth-ish predicates',
    );
  });

  it('registers 2 + 2 slot components with predicates - No registered component have a truthy predicate', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });
    expect(config.getSlot('toolbar', {})).toEqual([]);
  });

  it('registers 2 + 2 slot components with predicates - One truthy predicate per set', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });
    expect(config.getSlot('toolbar', {})![0].component).toEqual(
      'this is a toolbar save component with a true predicate',
    );
    expect(config.getSlot('toolbar', {})![1].component).toEqual(
      'this is a toolbar edit component with true predicate',
    );
  });

  it('getSlotComponents - registers 2 + 2 slot components with predicates', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });
    expect(config.getSlotComponents('toolbar').length).toEqual(2);
    expect(config.getSlotComponents('toolbar')).toEqual(['save', 'edit']);
  });

  it('getSlotComponent - registers 2 + 2 slot components with predicates', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });
    expect(config.getSlotComponent('toolbar', 'save').length).toEqual(2);
    expect(config.getSlotComponent('toolbar', 'save')[0].component).toEqual(
      'this is a toolbar save component with a true predicate',
    );
  });

  it('reorderSlotComponent - position', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });
    expect(config.getSlotComponent('toolbar', 'save').length).toEqual(2);
    expect(config.getSlotComponent('toolbar', 'save')[0].component).toEqual(
      'this is a toolbar save component with a true predicate',
    );
    config.reorderSlotComponent({ slot: 'toolbar', name: 'save', position: 1 });
    expect(config.getSlotComponents('toolbar')).toEqual(['edit', 'save']);
  });

  it('reorderSlotComponent - after', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'cancel',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'bold',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual([
      'save',
      'edit',
      'cancel',
      'bold',
    ]);
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: 'save',
      action: 'after',
      target: 'cancel',
    });
    expect(config.getSlotComponents('toolbar')).toEqual([
      'edit',
      'cancel',
      'save',
      'bold',
    ]);
  });

  it('reorderSlotComponent - before', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'cancel',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'bold',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual([
      'save',
      'edit',
      'cancel',
      'bold',
    ]);
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: 'save',
      action: 'before',
      target: 'cancel',
    });
    expect(config.getSlotComponents('toolbar')).toEqual([
      'edit',
      'save',
      'cancel',
      'bold',
    ]);
  });

  it('reorderSlotComponent - last', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'cancel',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'bold',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual([
      'save',
      'edit',
      'cancel',
      'bold',
    ]);
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: 'save',
      action: 'last',
    });
    expect(config.getSlotComponents('toolbar')).toEqual([
      'edit',
      'cancel',
      'bold',
      'save',
    ]);
  });

  it('reorderSlotComponent - first', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'cancel',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'bold',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual([
      'save',
      'edit',
      'cancel',
      'bold',
    ]);
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: 'bold',
      action: 'first',
    });
    expect(config.getSlotComponents('toolbar')).toEqual([
      'bold',
      'save',
      'edit',
      'cancel',
    ]);
  });

  it('unRegisterSlotComponent - registers 2 + 2 slot components with predicates', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: 'this is a toolbar component with two false predicate',
      predicates: [
        RouteConditionFalse('/folder/path'),
        ContentTypeConditionFalse(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });
    expect(config.getSlotComponent('toolbar', 'save').length).toEqual(2);
    expect(config.getSlotComponent('toolbar', 'save')[0].component).toEqual(
      'this is a toolbar save component with a true predicate',
    );
    config.unRegisterSlotComponent('toolbar', 'save', 1);
    expect(config.getSlotComponent('toolbar', 'save').length).toEqual(1);
  });
});
