import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, fireEvent } from '@testing-library/react';
import { __setLoadables } from '@plone/volto/helpers/Loadable/Loadable';

import ArrayWidget from './ArrayWidget';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');

// Mock react-sortable-hoc to prevent the container error
vi.mock('react-sortable-hoc', () => ({
  ...vi.importActual('react-sortable-hoc'),
  SortableContainer: (component) => component,
  SortableElement: (component) => component,
}));

beforeAll(async () => {
  await __setLoadables();
});

test('renders an array widget component', async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
    vocabularies: {
      'plone.app.vocabularies.Keywords': {
        items: [{ title: 'My item', value: 'myitem' }],
        itemsTotal: 1,
      },
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <ArrayWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        items={{ vocabulary: { '@id': 'plone.app.vocabularies.Keywords' } }}
      />
    </Provider>,
  );

  await waitFor(() => {});
  expect(component.toJSON()).toMatchSnapshot();
});

test("No 'No value' option when default value is 0", async () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const choices = [
    ['0', 'None'],
    ['1', 'One'],
  ];

  const value = {
    value: '0',
    label: 'None',
  };

  const _default = 0;

  const { container } = render(
    <Provider store={store}>
      <ArrayWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        choices={choices}
        default={_default}
        value={value}
        noValueOption={true}
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  fireEvent.mouseDown(
    container.querySelector('.react-select__dropdown-indicator'),
    { button: 0 },
  );

  expect(container).toMatchSnapshot();
});
