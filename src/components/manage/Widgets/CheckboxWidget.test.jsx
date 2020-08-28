import React from 'react';
import { Provider } from 'react-intl-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import CheckboxWidget from './CheckboxWidget';

const mockStore = configureStore();

test('renders a checkbox widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <CheckboxWidget
        id="my-field"
        title="My field"
        description="Test"
        onChange={() => {}}
        onEdit={() => {}}
        onDelete={() => {}}
        required={true}
        error={['error1']}
        value={true}
        wrapped={false}
        intl={{ formatMessage: () => {} }}
        fieldSet={null}
        isDraggable={true}
        isDisabled={false}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
