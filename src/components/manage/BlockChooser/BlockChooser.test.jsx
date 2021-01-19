import React from 'react';
import renderer from 'react-test-renderer';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-intl-redux';
import configureStore from 'redux-mock-store';
import BlockChooser from './BlockChooser';

const mockStore = configureStore();

const store = mockStore({
  intl: {
    locale: 'en',
    messages: {},
  },
});

describe('BlocksChooser', () => {
  it('renders a BlockChooser component', () => {
    const component = renderer.create(
      <Provider store={store}>
        <BlockChooser onMutateBlock={() => {}} currentBlock="theblockid" />
      </Provider>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('allowedBlocks test', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onMutateBlock={() => {}}
          currentBlock="theblockid"
          allowedBlocks={['image', 'listing']}
        />
      </Provider>,
    );
    expect(container.firstChild).not.toHaveTextContent('Video');
    // There are 2 because the others are aria-hidden="true"
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
  it('showRestricted test', () => {
    const { container } = render(
      <Provider store={store}>
        <BlockChooser
          onMutateBlock={() => {}}
          currentBlock="theblockid"
          allowedBlocks={['image', 'title']}
          showRestricted
        />
      </Provider>,
    );
    expect(container.firstChild).not.toHaveTextContent('Video');
    // There's 1 because the others are aria-hidden="true"
    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(container.firstChild).toHaveTextContent('Title');
  });
});
