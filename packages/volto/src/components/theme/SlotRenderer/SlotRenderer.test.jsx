import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SlotRenderer from './SlotRenderer';
import config from '@plone/volto/registry';

describe('SlotRenderer Component', () => {
  const RouteConditionTrue = () => () => true;
  const RouteConditionFalse = () => () => false;
  const ContentTypeConditionTrue = () => () => true;
  const ContentTypeConditionFalse = () => () => false;

  test('renders a SlotRenderer component for the aboveContentTitle with two slots in the root', () => {
    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: (props) => <div className="slot-component-true" />,
      predicates: [RouteConditionTrue()],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'save',
      component: (props) => <div className="slot-component-false" />,
      predicates: [RouteConditionFalse(), ContentTypeConditionFalse()],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: (props) => <div className="slot-component-false" />,
      predicates: [RouteConditionFalse()],
    });

    config.registerSlotComponent({
      slot: 'toolbar',
      name: 'edit',
      component: (props) => (
        <aside className="slot-component-true-predicates" />
      ),
      predicates: [RouteConditionTrue(), ContentTypeConditionTrue()],
    });

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <SlotRenderer name="toolbar" content={{}} />
      </MemoryRouter>,
    );

    const divSlot = container.querySelector('div');
    expect(divSlot).toHaveClass('slot-component-true');
    const asideSlot = container.querySelector('aside');
    expect(asideSlot).toHaveClass('slot-component-true-predicates');
  });
});
