import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import BlockChooserSearch from './BlockChooserSearch';

describe('BlocksChooserSearch', () => {
  it('renders a BlockChooserSearch component', () => {
    const { container } = render(<BlockChooserSearch />);
    expect(container).toMatchSnapshot();
  });
});
