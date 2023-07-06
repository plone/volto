import React from 'react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import { axe, toHaveNoViolations } from 'jest-axe';
import SelectWidget from './SelectWidget';
import { waitFor, render, screen } from '@testing-library/react';

expect.extend(toHaveNoViolations);
const mockStore = configureStore();

jest.mock('@plone/volto/helpers/Loadable/Loadable');
beforeAll(
  async () =>
    await require('@plone/volto/helpers/Loadable/Loadable').__setLoadables(),
);

it('should demonstrate this matcher`s usage with react testing library', async () => {
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

  const { container } = render(
    <Provider store={store}>
      <SelectWidget
        id="SelectWidget"
        title="Select Field"
        choices={[
          ['Foo', 'Foo'],
          ['Bar', 'Bar'],
          ['Foo', 'Foo'],
        ]}
        description="Optional help text"
        placeholder="Type something…"
      />
    </Provider>,
  );

  await waitFor(() => screen.getByText('Select Field'));
  const results = await axe(container);

  expect(results).toHaveNoViolations();
});
