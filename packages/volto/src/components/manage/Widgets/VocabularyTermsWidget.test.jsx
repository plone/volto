import React from 'react';
import { render } from '@testing-library/react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';

import VocabularyTermsWidget from './VocabularyTermsWidget';

jest.mock('@plone/volto/helpers/Loadable/Loadable');
jest.mock('@plone/volto/components/manage/Form');

beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

let mockSerial = 0;
const mockStore = configureStore();

jest.mock('uuid', () => {
  return {
    v4: jest.fn().mockImplementation(() => `id-${mockSerial++}`),
  };
});

test('renders a dictionary widget component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: {},
    },
  });
  let initialValue = {
    items: [
      {
        token: 'talk',
        titles: {
          en: 'Talk',
          de: 'Vortrag',
          it: 'Lettura',
        },
      },
      {
        token: 'keynote',
        titles: {
          en: 'Keynote',
          de: 'Keynote',
          it: 'Keynote',
        },
      },
      {
        token: 'lightning-talk',
        titles: {
          en: 'Lightning-Talk',
          de: 'kürzerer erleuchtender Vortrag',
          it: 'Lightning-Talk',
        },
      },
    ],
  };
  const { container } = render(
    <Provider store={store}>
      <VocabularyTermsWidget
        id="test-dict"
        title="My Vocabulary"
        fieldSet="default"
        onChange={() => {}}
        onBlur={() => {}}
        onClick={() => {}}
        value={initialValue}
      />
    </Provider>,
  );

  expect(container).toMatchSnapshot();
});
