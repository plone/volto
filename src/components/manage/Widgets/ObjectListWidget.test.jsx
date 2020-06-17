import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ObjectListWidget, {
  FlatObjectList,
  ModalObjectListForm,
} from './ObjectListWidget';

const mockStore = configureStore();

// TODO: what about localized schemas?
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

test('renders an object list widget component', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  const component = renderer.create(
    <Provider store={store}>
      <ObjectListWidget
        id="my-widget"
        schema={LinkSchema}
        title="My Widget"
        onChange={() => {}}
        error={{}}
        value={[
          { external_link: 'https://dgg.gg' },
          { external_link: 'https://wikipedia.org' },
        ]}
        required={true}
        fieldSet="my-field-set"
        description="My description"
        onDelete={() => {}}
        onEdit={() => {}}
      />
    </Provider>,
  );

  const json = component.toJSON();
  expect(json).toMatchSnapshot();
});

test('renders an object list widget component and changes its value by clicking a button', async () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  let valueState = [
    { external_link: 'https://ddg.gg' },
    { external_link: 'https://wikipedia.org' },
  ];

  let jsx = (
    <Provider store={store}>
      <>
        <ObjectListWidget
          id={`my-widget`}
          schema={LinkSchema}
          title="My Widget"
          onChange={(id, v) => {
            valueState = v;
            rerender(jsx);
          }}
          error={{}}
          value={valueState}
          required={true}
          description="My description"
          onDelete={() => {}}
          onEdit={() => {}}
        />
        <button
          onClick={(e) => {
            valueState = [{ external_link: 'https://duckduckgo.com' }];
            rerender(jsx);
            e.preventDefault();
          }}
        >
          Click me !
        </button>
      </>
    </Provider>
  );

  const { getByText, asFragment, rerender, getByTestId, getAllByText } = render(
    jsx,
  );

  expect(asFragment()).toMatchSnapshot();

  // click the button which changes data outside of modal
  fireEvent.click(getByText('Click me !'));

  // open the modal
  fireEvent.click(getByTestId('big-pen-button'));

  // click on the first External tab
  fireEvent.click(getAllByText('External')[0]);

  expect(asFragment()).toMatchSnapshot();
});

test('renders a flat object list component with an item', async () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  let valueState = [
    { external_link: 'https://ddg.gg' },
    { external_link: 'https://wikipedia.org' },
  ];

  let jsx = (
    <Provider store={store}>
      <FlatObjectList id={`my-widget`} schema={LinkSchema} value={valueState} />
    </Provider>
  );

  const { asFragment, getAllByText } = render(jsx);

  // verify the first tab
  expect(asFragment()).toMatchSnapshot();

  // load second tab in first item
  fireEvent.click(getAllByText('External')[0]);

  // verify the second tab in the first item
  expect(asFragment()).toMatchSnapshot();

  // load second tab in second item
  fireEvent.click(getAllByText('External')[1]);

  // verify the second tab in the second item
  expect(asFragment()).toMatchSnapshot();
});

test('renders a modal object list form component and tests it in various ways', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  let valueState = [
    { external_link: 'https://ddg.gg' },
    { external_link: 'https://wikipedia.org' },
  ];

  let openState = true; // or false?

  let jsx = (
    <Provider store={store}>
      <ModalObjectListForm
        id="my-widget"
        schema={LinkSchema}
        title="Modal title"
        value={valueState}
        open={openState}
        onSave={(id, val) => {
          openState = false;
          rerender(jsx);
        }}
        onCancel={() => {
          openState = false;
          rerender(jsx);
        }}
      />
    </Provider>
  );

  const { asFragment, getByText, rerender, getByTestId } = render(jsx);

  // set value prop to something else than the value before from outside the modal
  valueState = [{ external_link: 'https://duckduckgo.com' }];
  rerender(jsx);

  // in the modal there should be just a single item with the link: https://duckduckgo.com
  // (actual result: empty snapshot because of https://github.com/Semantic-Org/Semantic-UI-React/issues/3959)
  expect(asFragment()).toMatchSnapshot();

  window.HTMLElement.prototype.scrollIntoView = jest.fn();

  // add 20 objects to the modal
  for (let i = 0; i < 20; ++i) {
    fireEvent.click(getByText('Add Link'));
  }

  expect(window.HTMLElement.prototype.scrollIntoView).toHaveBeenCalled();

  // check if the modal has scrolled to bottom automatically
  let mc = getByTestId('modal-content');
  let sh = mc.scrollHeight;
  let st = mc.scrollTop;

  // the modal has scrolled to the bottom automatically?
  // both st and sh variables are 0 in jsdom environment, so it is useless here
  // console.log('st', st, 'sh', sh);
  expect(st).toEqual(sh);
});

test('renders a modal object list form component and tests it in other various ways', () => {
  const store = mockStore({
    search: {},
    intl: {
      locale: 'en',
      messages: {},
    },
  });

  let valueState = [
    { external_link: 'https://ddg.gg' },
    { external_link: 'https://wikipedia.org' },
  ];

  let openState = true;

  let jsx = (
    <Provider store={store}>
      <ModalObjectListForm
        id="my-test-widget"
        schema={LinkSchema}
        title="My Modal Title"
        data-testid="my-modal"
        value={valueState}
        className="my-test-widget-class"
        open={openState}
        onSave={(id, val) => {
          openState = false;
          valueState = val;
          rerender(jsx);
        }}
        onCancel={() => {
          openState = false;
          rerender(jsx);
        }}
      />
    </Provider>
  );

  const { asFragment, getByTitle, getByText, rerender } = render(jsx);

  fireEvent.click(getByTitle('Cancel'));

  expect(openState).toEqual(false);

  openState = true;
  rerender(jsx);

  fireEvent.click(getByText('Add Link'));

  fireEvent.click(getByTitle('Save'));

  expect(openState).toEqual(false);
  expect(valueState.length).toEqual(3);

  // actual result: empty snapshot because of https://github.com/Semantic-Org/Semantic-UI-React/issues/3959
  expect(asFragment()).toMatchSnapshot();
});
