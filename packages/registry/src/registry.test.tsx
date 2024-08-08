import config from './index';
import { describe, expect, it, afterEach, beforeEach } from 'vitest';

beforeEach(() => {
  config.set('components', {
    Toolbar: { component: 'this is the Toolbar component' },
    'Toolbar.Types': { component: 'this is the Types component' },
    'Teaser|News Item': { component: 'This is the News Item Teaser component' },
  });
  config.set('slots', {});
  config.set('utilities', {});
});

describe('Component registry', () => {
  it('get a component', () => {
    expect(config.getComponent('Toolbar').component).toEqual(
      'this is the Toolbar component',
    );
  });
  it('get a component with context', () => {
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

  it('reorderSlotComponent - after (target after origin)', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: '1',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '2',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '3',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '4',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: '1',
      action: 'after',
      target: '3',
    });
    expect(config.getSlotComponents('toolbar')).toEqual(['2', '3', '1', '4']);
  });

  it('reorderSlotComponent - after (target before origin)', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: '1',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '2',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '3',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '4',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
    // Reorder Slot with original position 1 before Slot with position 3
    // Before reordering the positions should be ["1", "2", "3", "4"]
    // After the reordering the positions should be ["2", "1", "3", "4"]
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: '3',
      action: 'after',
      target: '1',
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '3', '2', '4']);
  });

  it('reorderSlotComponent - after (target = origin)', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: '1',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '2',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '3',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '4',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
    // Reorder Slot with original position 1 before Slot with position 3
    // Before reordering the positions should be ["1", "2", "3", "4"]
    // After the reordering the positions should be ["2", "1", "3", "4"]
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: '3',
      action: 'after',
      target: '3',
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
  });

  it('reorderSlotComponent - before (target before origin)', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: '1',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '2',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '3',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '4',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
    // Reorder Slot with original position 4 before Slot with position 3
    // Before reordering the positions should be ["1", "2", "3", "4"]
    // After the reordering the positions should be ["1", "2", "4", "3 "]
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: '3',
      action: 'before',
      target: '1',
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['3', '1', '2', '4']);
  });

  it('reorderSlotComponent - before (target after origin)', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: '1',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '2',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '3',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '4',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [
        RouteConditionTrue('/folder/path'),
        ContentTypeConditionTrue(['News Item']),
      ],
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
    // Reorder Slot with original position 1 before Slot with position 3
    // Before reordering the positions should be ["1", "2", "3", "4"]
    // After the reordering the positions should be ["2", "1", "3", "4"]
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: '1',
      action: 'before',
      target: '3',
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['2', '1', '3', '4']);
  });

  it('reorderSlotComponent - before (target = origin)', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: '1',
      component: 'this is a toolbar save component with a true predicate',
      predicates: [RouteConditionTrue('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '2',
      component: 'this is a toolbar component with a false predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '3',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: '4',
      component: 'this is a toolbar edit component with true predicate',
      predicates: [RouteConditionFalse('/de')],
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
    // Reorder Slot with original position 4 before Slot with position 3
    // Before reordering the positions should be ["1", "2", "3", "4"]
    // After the reordering the positions should be ["1", "2", "4", "3 "]
    config.reorderSlotComponent({
      slot: 'toolbar',
      name: '3',
      action: 'before',
      target: '3',
    });

    expect(config.getSlotComponents('toolbar')).toEqual(['1', '2', '3', '4']);
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

  // The next one fixes the issue when HMR kicks in and tries to register the same component again
  it('registerSlotComponent - registers the same named slot component twice, does not break', () => {
    const TestComponent = () => <div>Hello</div>;

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: TestComponent,
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: TestComponent,
    });
  });
});

describe('Utilities registry', () => {
  afterEach(() => {
    config.set('utilities', {});
  });

  it('registers a simple utility', () => {
    config.registerUtility({
      name: 'url',
      type: 'validator',
      method: () => 'this is a simple validator utility',
    });

    expect(
      config.getUtility({ name: 'url', type: 'validator' }).method(),
    ).toEqual('this is a simple validator utility');
  });

  it('registers a utility with dependencies', () => {
    config.registerUtility({
      name: 'email',
      type: 'validator',
      dependencies: { fieldType: 'email' },
      method: () => 'this is a validator utility with dependencies',
    });

    expect(
      config
        .getUtility({
          name: 'email',
          dependencies: { fieldType: 'email' },
          type: 'validator',
        })
        .method(),
    ).toEqual('this is a validator utility with dependencies');
  });

  it('registers utilities, one with and one without dependencies', () => {
    config.registerUtility({
      name: 'email',
      type: 'validator',
      method: () => 'this is a simple validator utility',
    });

    config.registerUtility({
      name: 'email',
      type: 'validator',
      dependencies: { fieldType: 'email' },
      method: () => 'this is a validator utility with dependencies',
    });

    expect(
      config.getUtility({ name: 'email', type: 'validator' }).method(),
    ).toEqual('this is a simple validator utility');

    expect(
      config
        .getUtility({
          name: 'email',
          dependencies: { fieldType: 'email' },
          type: 'validator',
        })
        .method(),
    ).toEqual('this is a validator utility with dependencies');
  });

  it('registers utilities with the same name, but different dependencies', () => {
    config.registerUtility({
      name: 'email',
      type: 'validator',
      dependencies: { fieldType: 'email' },
      method: () => 'this is a validator utility with dependencies for email',
    });

    config.registerUtility({
      name: 'email',
      type: 'validator',
      dependencies: { fieldType: 'string' },
      method: () => 'this is a validator utility with dependencies for string',
    });

    expect(
      config
        .getUtility({
          name: 'email',
          dependencies: { fieldType: 'string' },
          type: 'validator',
        })
        .method(),
    ).toEqual('this is a validator utility with dependencies for string');

    expect(
      config
        .getUtility({
          name: 'email',
          dependencies: { fieldType: 'email' },
          type: 'validator',
        })
        .method(),
    ).toEqual('this is a validator utility with dependencies for email');
  });

  it('getUtilities - registers two utilities with the same dependencies and different names', () => {
    config.registerUtility({
      name: 'minLength',
      type: 'validator',
      dependencies: { fieldType: 'string' },
      method: () => 'this is a validator for minLength',
    });

    config.registerUtility({
      name: 'maxLength',
      type: 'validator',
      dependencies: { fieldType: 'string' },
      method: () => 'this is a validator for maxLength',
    });

    expect(
      config.getUtilities({
        dependencies: { fieldType: 'string' },
        type: 'validator',
      }).length,
    ).toEqual(2);

    expect(
      config
        .getUtilities({
          dependencies: { fieldType: 'string' },
          type: 'validator',
        })[0]
        .method(),
    ).toEqual('this is a validator for minLength');

    expect(
      config
        .getUtilities({
          dependencies: { fieldType: 'string' },
          type: 'validator',
        })[1]
        .method(),
    ).toEqual('this is a validator for maxLength');
  });
});
