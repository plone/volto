// Regression test for https://github.com/plone/volto/issues/8348: Enter
// pressed to confirm an IME composition must not be handled as a keystroke.
// The Title block is tested as the representative of the shared guard
// (isIMEComposing) also used by the Description block, TextLineEdit and the
// volto-slate SlateEditor; the guard itself is unit-tested in Utils.test.jsx.
// This is a separate file from Edit.test.jsx because mocking <Editable />
// (required, slate-react does not work in jsdom) would break its snapshots.
import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-intl-redux';
import { render, fireEvent, screen } from '@testing-library/react';
import config from '@plone/volto/registry';

import Edit from './Edit';

// slate-react's contenteditable machinery does not work in jsdom, so replace
// only <Editable /> with a plain element that forwards onKeyDown to the real
// handleKeyDown of the component under test.
vi.mock('slate-react', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    Editable: (props) => (
      <div
        role="textbox"
        tabIndex={0}
        aria-label={props['aria-label']}
        onKeyDown={props.onKeyDown}
      />
    ),
  };
});

// test-setup-globals.js sets global.__SERVER__ = false, which the component
// treats as "rendering on the server" and then renders nothing.
beforeAll(() => {
  delete global.__SERVER__;
});

const mockStore = configureStore();

function renderEdit(props) {
  const store = mockStore({ intl: { locale: 'en', messages: {} } });
  return render(
    <Provider store={store}>
      <Edit
        properties={{ title: 'My Title' }}
        selected={false}
        block="1234"
        onAddBlock={() => {}}
        onChangeField={() => {}}
        onSelectBlock={() => {}}
        onDeleteBlock={() => {}}
        onFocusPreviousBlock={() => {}}
        onFocusNextBlock={() => {}}
        index={1}
        blockNode={{ current: null }}
        data={{}}
        {...props}
      />
    </Provider>,
  );
}

test('Enter adds a new block after the title', () => {
  const onAddBlock = vi.fn(() => 'new-block-id');
  const onSelectBlock = vi.fn();
  renderEdit({ onAddBlock, onSelectBlock });
  const notCancelled = fireEvent.keyDown(screen.getByRole('textbox'), {
    key: 'Enter',
  });
  expect(onAddBlock).toHaveBeenCalledWith(config.settings.defaultBlockType, 2);
  expect(onSelectBlock).toHaveBeenCalledWith('new-block-id');
  // the keydown must be preventDefault-ed
  expect(notCancelled).toBe(false);
});

test('Enter during IME composition is ignored (isComposing)', () => {
  const onAddBlock = vi.fn();
  renderEdit({ onAddBlock });
  const notCancelled = fireEvent.keyDown(screen.getByRole('textbox'), {
    key: 'Enter',
    isComposing: true,
  });
  expect(onAddBlock).not.toHaveBeenCalled();
  // the keydown must be left to the IME, not preventDefault-ed
  expect(notCancelled).toBe(true);
});

test('Enter during IME composition is ignored (Safari, keyCode 229)', () => {
  const onAddBlock = vi.fn();
  renderEdit({ onAddBlock });
  const notCancelled = fireEvent.keyDown(screen.getByRole('textbox'), {
    key: 'Enter',
    keyCode: 229,
  });
  expect(onAddBlock).not.toHaveBeenCalled();
  expect(notCancelled).toBe(true);
});

test('ArrowDown during IME composition does not move focus', () => {
  const onFocusNextBlock = vi.fn();
  renderEdit({ onFocusNextBlock });
  fireEvent.keyDown(screen.getByRole('textbox'), {
    key: 'ArrowDown',
    isComposing: true,
  });
  expect(onFocusNextBlock).not.toHaveBeenCalled();
});
