import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render } from '@testing-library/react';

import ColorPickerWidget from './ColorPickerWidget';

const mockStore = configureStore();

const withStateManagement =
  (Component) =>
  ({ ...props }) => {
    const [value, setValue] = React.useState(props.value || null);
    const onChange = (id, value) => {
      setValue(value);
    };

    return <Component {...props} onChange={onChange} value={value} />;
  };

describe('ColorPickerWidget', () => {
  const COLORS = [
    { name: 'transparent', label: 'Transparent' },
    { name: 'grey', label: 'Grey' },
  ];

  test('renders a color picker widget component', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });

    const { asFragment } = render(
      <Provider store={store}>
        <ColorPickerWidget
          id="my-field"
          title="My color widget field"
          colors={COLORS}
          onChange={() => {}}
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
  test('renders a color picker widget component with a default', () => {
    const store = mockStore({
      intl: {
        locale: 'en',
        messages: {},
      },
    });
    const WrappedWidget = withStateManagement(ColorPickerWidget);

    const { asFragment } = render(
      <Provider store={store}>
        <WrappedWidget
          id="my-field"
          title="My color widget field"
          colors={COLORS}
          default="grey"
        />
      </Provider>,
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
