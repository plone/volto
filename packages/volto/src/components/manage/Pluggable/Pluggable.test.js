import * as React from 'react';

import { render } from '@testing-library/react';
import { PluggablesProvider, Pluggable, Plug } from './';

describe('<Plug />', () => {
  it('requires context', () => {
    expect(() => render(<Plug id="test" />)).toThrow();
  });
});

describe('<Pluggable />', () => {
  it('requires context', () => {
    expect(() => render(<Pluggable name="test" />)).toThrow();
  });

  it('passes params', () => {
    const { container } = render(
      <PluggablesProvider>
        <Pluggable name="test" params={{ text: 'test', number: 1234 }} />
        <Plug pluggable="test" id="foo">
          {({ text, number }) => (
            <div id="plug">
              {text}
              {number}
            </div>
          )}
        </Plug>
      </PluggablesProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Works with an empty Plug', () => {
    const { container } = render(
      <PluggablesProvider>
        <Pluggable name="test" />
        <Plug pluggable="test" id="foo"></Plug>
      </PluggablesProvider>,
    );
    expect(container).toMatchSnapshot();
  });

  it('Pluggables are zero when no Plug or empty', () => {
    let pluggablesCounter = null;
    const { container } = render(
      <PluggablesProvider>
        <Pluggable name="test">
          {(pluggables) => {
            pluggablesCounter = pluggables.length;
            return (
              <>
                {pluggables.length > 0 && (
                  <>
                    <header>
                      <h2>Manage content...</h2>
                    </header>
                    <div className="pastanaga-menu-list">
                      <ul>
                        {pluggables.map((p) => (
                          <>{p()}</>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </>
            );
          }}
        </Pluggable>
        <Plug pluggable="test" id="foo"></Plug>
      </PluggablesProvider>,
    );
    expect(pluggablesCounter).toBe(0);
    expect(container).toMatchSnapshot();
  });

  it('Pluggables are zero when Plug is present', () => {
    let pluggablesCounter = null;
    const { container } = render(
      <PluggablesProvider>
        <Pluggable name="test">
          {(pluggables) => {
            pluggablesCounter = pluggables.length;
            return (
              <>
                {pluggables.length > 0 && (
                  <>
                    <header>
                      <h2>Manage content...</h2>
                    </header>
                    <div className="pastanaga-menu-list">
                      <ul>
                        {pluggables.map((p) => (
                          <>{p()}</>
                        ))}
                      </ul>
                    </div>
                  </>
                )}
              </>
            );
          }}
        </Pluggable>
        <Plug pluggable="test" id="foo">
          The Plug
        </Plug>
      </PluggablesProvider>,
    );
    expect(pluggablesCounter).toBe(1);
    expect(container).toMatchSnapshot();
  });
});
