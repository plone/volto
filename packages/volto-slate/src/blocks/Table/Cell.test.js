import React from 'react';
import renderer from 'react-test-renderer';
import Cell from './Cell';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import config from '@plone/volto/registry';

const mockStore = configureStore();

global.__SERVER__ = true; // eslint-disable-line no-underscore-dangle
global.__CLIENT__ = false; // eslint-disable-line no-underscore-dangle

beforeAll(() => {
  const createEmptyParagraph = () => {
    return {
      type: 'p',
      children: [{ text: '' }],
    };
  };

  config.settings = {
    supportedLanguages: [],
    slate: {
      elements: {
        default: ({ attributes, children }) => (
          <p {...attributes}>{children}</p>
        ),
      },
      leafs: {},
      defaultBlockType: 'p',
      textblockExtensions: [],
      extensions: [],
      defaultValue: () => {
        return [createEmptyParagraph()];
      },
    },
  };
});

test('renders a cell component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const component = renderer.create(
    <Provider store={store}>
      <Cell onChange={() => {}} onSelectCell={() => {}} />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
