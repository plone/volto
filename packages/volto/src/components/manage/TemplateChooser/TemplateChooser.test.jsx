import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import TemplateChooser from './TemplateChooser';
import templateSVG from './template.svg';

const mockStore = configureStore();

test('renders a TemplateChooser component', () => {
  const store = mockStore({
    intl: {
      locale: 'en',
      messages: { templateid: 'Template default translation' },
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <TemplateChooser
        templates={() => [
          {
            image: templateSVG,
            id: 'templateid',
            defaultMessage: 'Template default translation',
          },
        ]}
        onSelectTemplate={() => {}}
      />
    </Provider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
