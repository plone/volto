import React from 'react';
import renderer from 'react-test-renderer';
import { IntlProvider } from 'react-intl';
import Toast from './Toast';

test('renders a Toast info component', () => {
  const component = renderer.create(
    <IntlProvider locale="en">
      <Toast
        info
        title="I'm a title"
        content="This is the content, lorem ipsum"
      />
    </IntlProvider>,
  );
  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
