import { wait } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-intl-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import ArrayWidget from './ArrayWidget';

const mockStore = configureStore();

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
        description="Test"
        onChange={() => {}}
        required={true}
        error={['error1', 'error2']}
        getVocabulary={() => {}}
        choices={[['error1', 'error2']]}
        loading={false}
        widgetOptions={{
          vocabulary: { '@id': 'plone.app.vocabularies.Keywords' },
        }}
        value={['test']}
        onEdit={() => {}}
        isDraggable={true}
        isDissabled={false}
        itemsTotal={3}
        wrapped={false}
        onDelete={() => {}}
        items={{ vocabulary: { '@id': 'plone.app.vocabularies.Keywords' } }}
      />
    </Provider>,
  );
  await wait(() => {
    expect(component.toJSON()).toMatchSnapshot();
  });
});
