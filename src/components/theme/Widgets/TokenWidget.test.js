import React from 'react';
import renderer from 'react-test-renderer';
import TokenWidget from './TokenWidget';
import { MemoryRouter } from 'react-router-dom';

describe('TokenWidget', () => {
  it('renders an empty tags view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <TokenWidget />
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders tags view widget component', () => {
    const component = renderer.create(
      <MemoryRouter>
        <TokenWidget className="meta tags" value={['foo', 'bar']} />
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });

  it('renders tags view widget component with children', () => {
    const component = renderer.create(
      <MemoryRouter>
        <TokenWidget className="meta tags" value={['foo', 'bar']}>
          {(child) => <strong>{child}</strong>}
        </TokenWidget>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
