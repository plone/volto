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

test('renders an edit Lead Image block component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  const properties = {
    formData: {
      image: {
        download: 'image.png',
      },
    },
  };
  const component = renderer.create(
    <Provider store={store}>
      <FormStateProvider initialValue={properties}>
        <FormStateContext.Consumer>
          {({ setContextData, contextData }) => {
            const { formData } = contextData;
            return (
              <Edit
                data={{}}
                properties={formData}
                selected={false}
                block="1234"
                content={{}}
                request={{
                  loading: false,
                  loaded: false,
                }}
                pathname="/news"
                onChangeBlock={() => {}}
                onChangeField={() => {}}
                index={1}
                openObjectBrowser={() => {}}
              />
            );
          }}
        </FormStateContext.Consumer>
      </FormStateProvider>
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
