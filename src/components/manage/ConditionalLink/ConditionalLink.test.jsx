import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';

import ConditionalLink from './ConditionalLink';

describe('ConditionalLink', () => {
  it('renders a ConditionalLink component not link', () => {
    const component = renderer.create(
      <MemoryRouter>
        <ConditionalLink>
          <h1>Title</h1>
        </ConditionalLink>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
  it('renders a ConditionalLink component with link', () => {
    const component = renderer.create(
      <MemoryRouter>
        <ConditionalLink isLink>
          <h1>Title</h1>
        </ConditionalLink>
      </MemoryRouter>,
    );
    const json = component.toJSON();
    expect(json).toMatchSnapshot();
  });
});
