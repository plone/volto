import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ObjectWidget from './ObjectWidget';

const mockStore = configureStore();

const LinkSchema = {
  title: 'Link',
  fieldsets: [
    {
      id: 'internal',
      title: 'Internal',
      fields: ['internal_link'],
    },
    {
      id: 'external',
      title: 'External',
      fields: ['external_link'],
    },
    {
      id: 'email',
      title: 'Email',
      fields: ['email_address', 'email_subject'],
    },
  ],
  properties: {
    internal_link: {
      title: 'Internal link',
    },
    external_link: {
      title:
        'External URL (can be relative within this site or absolute if it starts with http:// or https://)',
    },
    email_address: {
      title: 'Email address',
    },
    email_subject: {
      title: 'Email subject (optional)',
    },
  },
  required: [],
};

test('renders an object widget component with clicks on each tab in root level to load all of them', async () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const { getByText, asFragment } = render(
    <Provider store={store}>
      <ObjectWidget
        id="my-widget"
        schema={LinkSchema}
        value={{}}
        title="My Widget"
        onChange={() => {}}
      />
    </Provider>,
  );

  // first tab snapshot
  expect(asFragment()).toMatchSnapshot();

  // second tab snapshot
  fireEvent.click(getByText('External'));
  expect(asFragment()).toMatchSnapshot();

  // third tab snapshot
  fireEvent.click(getByText('Email'));
  expect(asFragment()).toMatchSnapshot();
});

test('renders an object widget component with invalid field in value', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  // should not render anything for the invalid field in `value` object
  const component = renderer.create(
    <Provider store={store}>
      <ObjectWidget
        id="my-widget"
        schema={LinkSchema}
        value={{ invalid_field: true }}
        title="My Widget"
        onChange={() => {}}
      />
    </Provider>,
  );

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});
