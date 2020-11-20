import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import Edit from './Edit';

const mockStore = configureStore();

// Loadable components is tied to webpack, seems most people use webpack in their tests.
// Rather than that, we mock the loadable function to load the module eagarly and expose a load() function to be able to await the load
function loadable(load) {
  let Component;
  // Capture the component from the module load function
  const loadPromise = load().then((val) => {
    console.log('val', val);
    return (Component = val.default);
  });
  // Create a react component which renders the loaded component
  const Loadable = (props) => {
    if (!Component) {
      throw new Error(
        'Bundle split module not loaded yet, ensure you beforeAll(() => MyLazyComponent.load()) in your test, import statement: ' +
          load.toString(),
      );
    }
    return <Component {...props} />;
  };
  Loadable.load = () => loadPromise;
  return Loadable;
}

jest.mock('@plone/volto/helpers', () => {
  return {
    withLoadable: jest.fn((libStr) => loadable(() => import(libStr))),
  };
});
// import { withLoadable } from '@plone/volto/helpers';

test('renders an edit html block component', () => {
  const store = mockStore({
    content: {
      create: {},
      data: {},
    },
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Edit
        data={{ html: '<h1></h1>' }}
        selected={false}
        block="1234"
        onChangeBlock={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        handleKeyDown={() => {}}
        index={1}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
