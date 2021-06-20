import * as React from 'react';

import { render } from '@testing-library/react';
import { PluggablesProvider, Pluggable, Plug } from './';

describe('<Plug />', () => {
  it('requires context', () => {
    expect(() => render(<Plug id="test" />)).toThrow();
  });
});

describe('<Slot />', () => {
  it('requires context', () => {
    expect(() => render(<Pluggable name="test" />)).toThrow();
  });

  it('passes params', () => {
    render(
      <PluggablesProvider>
        <Pluggable name="test" params={{ text: 'test', number: 1234 }} />
        <Plug name="test" id="foo">
          {({ text, number }) => (
            <div id="plug">
              {text}
              {number}
            </div>
          )}
        </Plug>
      </PluggablesProvider>,
    );
  });
});
