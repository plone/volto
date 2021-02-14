import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { matchPath } from 'react-router-dom';

import Registry from '@plone/volto/registry';
import SlotRenderer from './SlotRenderer';

const mockStore = configureStore();

function restrictToPath(match) {
  return ({ pathname }) => matchPath(pathname, match);
}

beforeAll(() => {
  Registry.set('slots', {});
});

afterAll(() => {
  Registry.set('slots', {});
});

describe('SlotRenderer Component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  test('renders a SlotRenderer component for the aboveContentTitle with two slots in the root', () => {
    Registry.slots.aboveContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/' }),
          component: (props) => <div {...props} />,
          props: { className: 'slot-component' },
        },
        {
          available: restrictToPath({ path: '/' }),
          component: (props) => <aside {...props} />,
          props: { className: 'slot-component' },
        },
      ],
    };

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Provider store={store}>
          <SlotRenderer name="aboveContentTitle" />
        </Provider>
      </MemoryRouter>,
    );
    const divSlot = container.querySelector('div');
    expect(divSlot).toHaveClass('slot-component');
    const asideSlot = container.querySelector('aside');
    expect(asideSlot).toHaveClass('slot-component');
  });
  test('renders a SlotRenderer component for the aboveContentTitle with one slots in the root and other in other place', () => {
    Registry.slots.aboveContentTitle = {
      items: [
        {
          component: (props) => <div {...props} />,
          available: restrictToPath({ path: '/' }),
          props: { className: 'slot-component' },
        },
        {
          component: (props) => <aside {...props} />,
          available: restrictToPath({ path: '/other-place' }),
          props: { className: 'slot-component' },
        },
      ],
    };

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Provider store={store}>
          <SlotRenderer name="aboveContentTitle" />
        </Provider>
      </MemoryRouter>,
    );
    const divSlot = container.querySelector('div');
    expect(divSlot).toHaveClass('slot-component');
    const asideSlot = container.querySelector('aside');
    expect(asideSlot).toBe(null);
  });
  test('renders a SlotRenderer component for the aboveContentTitle and belowContentTitle, only renders the appropiate one', () => {
    Registry.slots.aboveContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/' }),
          component: (props) => <div {...props} />,
          props: { className: 'slot-component-aboveContentTitle' },
        },
      ],
    };
    Registry.slots.belowContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/' }),
          component: (props) => <aside {...props} />,
          props: { className: 'slot-component-belowContentTitle' },
        },
      ],
    };

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/' }]}>
        <Provider store={store}>
          <SlotRenderer name="aboveContentTitle" />
        </Provider>
      </MemoryRouter>,
    );
    const divSlot = container.querySelector('div');
    expect(divSlot).toHaveClass('slot-component-aboveContentTitle');
    const asideSlot = container.querySelector('aside');
    expect(asideSlot).toBe(null);
  });
  test('renders a SlotRenderer component for the aboveContentTitle and belowContentTitle with different paths, only renders the appropiate one', () => {
    Registry.slots.aboveContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/other-place' }),
          component: (props) => <div {...props} />,
          props: { className: 'slot-component-aboveContentTitle' },
        },
      ],
    };
    Registry.slots.belowContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/' }),
          component: (props) => <aside {...props} />,
          props: { className: 'slot-component-belowContentTitle' },
        },
      ],
    };

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/other-place' }]}>
        <Provider store={store}>
          <SlotRenderer name="aboveContentTitle" />
        </Provider>
      </MemoryRouter>,
    );
    const divSlot = container.querySelector('div');
    expect(divSlot).toHaveClass('slot-component-aboveContentTitle');
    const asideSlot = container.querySelector('aside');
    expect(asideSlot).toBe(null);
  });
  test('renders a SlotRenderer component for the aboveContentTitle with inheritance', () => {
    Registry.slots.aboveContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/other-place' }),
          component: (props) => <div {...props} />,
          props: { className: 'slot-component-aboveContentTitle' },
        },
      ],
    };

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/other-place/other-dir' }]}>
        <Provider store={store}>
          <SlotRenderer name="aboveContentTitle" />
        </Provider>
      </MemoryRouter>,
    );
    const divSlot = container.querySelector('div');
    expect(divSlot).toHaveClass('slot-component-aboveContentTitle');
  });
  test('renders a SlotRenderer component for the aboveContentTitle disable inheritance', () => {
    Registry.slots.aboveContentTitle = {
      items: [
        {
          available: restrictToPath({ path: '/other-place', exact: true }),
          component: (props) => <div {...props} />,
          props: { className: 'slot-component-aboveContentTitle' },
        },
      ],
    };

    const { container } = render(
      <MemoryRouter initialEntries={[{ pathname: '/other-place/other-dir' }]}>
        <Provider store={store}>
          <SlotRenderer name="aboveContentTitle" />
        </Provider>
      </MemoryRouter>,
    );
    const divSlot = container.querySelector('div');
    expect(divSlot).toBe(null);
  });
});
