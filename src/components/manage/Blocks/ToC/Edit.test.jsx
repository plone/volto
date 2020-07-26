import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import {
  FormStateContext,
  FormStateProvider,
} from '@plone/volto/components/manage/Form/FormContext';

import Edit from './Edit';

const mockStore = configureStore();

test('renders an edit toc block component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const formData = {
    blocks_layout: {
      items: ['a', 'b', 'c'],
    },
    blocks: {
      a: {
        '@type': 'text',
        text: {
          blocks: [
            {
              type: 'header-two',
              key: 'a',
              text: 'Heading 1',
            },
          ],
        },
      },
      b: {
        '@type': 'text',
        text: {
          blocks: [
            {
              type: 'header-three',
              key: 'b',
              text: 'Heading 2',
            },
          ],
        },
      },
      c: {
        '@type': 'title',
      },
    },
  };
  const component = renderer.create(
    <Provider store={store}>
      <FormStateProvider initialValue={{ formData }}>
        <FormStateContext.Consumer>
          {({ setContextData, contextData }) => {
            const { formData } = contextData;
            return <Edit properties={formData} />;
          }}
        </FormStateContext.Consumer>
      </FormStateProvider>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
