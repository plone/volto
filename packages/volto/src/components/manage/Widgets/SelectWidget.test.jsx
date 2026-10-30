import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { waitFor, render, screen, fireEvent } from '@testing-library/react';
import SelectWidget from './SelectWidget';

const mockStore = configureStore();

vi.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(async () => {
  const { __setLoadables } = await import(
    '@plone/volto/helpers/Loadable/Loadable'
  );
  await __setLoadables();
});

test('renders a select widget component', async () => {
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

  const { container } = render(
    <Provider store={store}>
      <SelectWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText('My field'));
  expect(container).toMatchSnapshot();
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
      <SelectWidget
        id="my-field"
        title="My field"
        fieldSet="default"
        choices={choices}
        default={_default}
        value={value}
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText('None'));
  fireEvent.mouseDown(
    container.querySelector('.react-select__dropdown-indicator'),
    { button: 0 },
  );
  expect(container).toMatchSnapshot();
});

test('workflow state choices escape scrolling modal content', async () => {
  const store = mockStore({ intl: { locale: 'en', messages: {} } });
  const onChange = vi.fn();
  const { container } = render(
    <Provider store={store}>
      <div className="ui modal">
        <div className="scrolling content">
          <SelectWidget
            id="wf_states"
            title="Workflow state"
            choices={[
              ['private', 'Private'],
              ['published', 'Published'],
            ]}
            onChange={onChange}
          />
        </div>
      </div>
    </Provider>,
  );
  await waitFor(() => screen.getByText('Workflow state'));
  fireEvent.mouseDown(
    container.querySelector('.react-select__dropdown-indicator'),
    { button: 0 },
  );
  const option = screen.getByText('Published');
  expect(option.closest('.scrolling.content')).toBeNull();
  expect(option.closest('.ui.modal')).toBeTruthy();
  fireEvent.click(option);
  expect(onChange).toHaveBeenCalledWith('wf_states', 'published');
});
