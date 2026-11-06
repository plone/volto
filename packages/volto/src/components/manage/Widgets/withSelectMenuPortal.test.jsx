import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import CreatableSelect from 'react-select/creatable';
import withSelectMenuPortal from './withSelectMenuPortal';

const options = [
  { value: 'private', label: 'Private' },
  { value: 'published', label: 'Published' },
];

describe.each([
  ['standard', Select],
  ['async', AsyncSelect],
  ['creatable', CreatableSelect],
])('%s modal select', (name, Component) => {
  const ModalSelect = withSelectMenuPortal(Component);

  test('portals outside scrolling content and preserves keyboard selection and focus', () => {
    const onChange = vi.fn();
    const { container } = render(
      <div className="ui modal">
        <div className="scrolling content" style={{ overflowY: 'auto' }}>
          <ModalSelect
            blurInputOnSelect={false}
            options={options}
            defaultOptions={options}
            classNamePrefix="react-select"
            onChange={onChange}
          />
        </div>
        <button>Save</button>
      </div>,
    );
    const input = screen.getByRole('textbox');
    act(() => input.focus());
    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
    const menu = container.querySelector('.react-select__menu');
    expect(menu).toBeTruthy();
    expect(menu.closest('.scrolling.content')).toBeNull();
    expect(menu.closest('.ui.modal')).toBeTruthy();
    fireEvent.scroll(menu.firstChild);
    expect(container.querySelector('.react-select__menu')).toBe(menu);
    expect(getComputedStyle(menu.parentElement).position).toBe('absolute');
    expect(container.querySelector('.scrolling.content').style.overflowY).toBe(
      'auto',
    );
    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(input, { key: 'Enter', keyCode: 13 });
    expect(onChange).toHaveBeenCalledWith(options[1], expect.any(Object));
    expect(document.activeElement).toBe(input);
    expect(container.querySelector('.react-select__menu')).toBeNull();
    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.scroll(container.querySelector('.scrolling.content'));
    expect(container.querySelector('.react-select__menu')).toBeNull();
    expect(document.activeElement).toBe(input);
    fireEvent.keyDown(input, { key: 'ArrowDown', keyCode: 40 });
    fireEvent.keyDown(input, { key: 'Escape', keyCode: 27 });
    expect(container.querySelector('.react-select__menu')).toBeNull();
  });

  test('anchors viewport coordinates to the modal padding box', () => {
    const { container } = render(
      <div
        className="ui modal"
        style={{ position: 'absolute', willChange: 'transform' }}
      >
        <div className="scrolling content">
          <ModalSelect
            options={options}
            defaultOptions={options}
            classNamePrefix="react-select"
          />
        </div>
      </div>,
    );
    const modal = container.firstChild;
    const control = container.querySelector('.react-select__control');
    vi.spyOn(modal, 'getBoundingClientRect').mockReturnValue({
      left: 200,
      top: 100,
      right: 1000,
      bottom: 600,
      width: 800,
      height: 500,
    });
    vi.spyOn(control, 'getBoundingClientRect').mockReturnValue({
      left: 600,
      top: 400,
      right: 900,
      bottom: 440,
      width: 300,
      height: 40,
    });
    Object.defineProperties(modal, {
      clientLeft: { value: 2 },
      clientTop: { value: 3 },
    });
    modal.scrollLeft = 7;
    modal.scrollTop = 5;
    fireEvent.keyDown(screen.getByRole('textbox'), {
      key: 'ArrowDown',
      keyCode: 40,
    });
    const portal = container.querySelector('.react-select__menu').parentElement;
    expect(getComputedStyle(portal).position).toBe('absolute');
    expect(getComputedStyle(portal).left).toBe('405px');
    expect(getComputedStyle(portal).top).toBe('342px');
    expect(getComputedStyle(portal).width).toBe('300px');
  });

  test('preserves pointer selection and removes the portal on unmount', () => {
    const onChange = vi.fn();
    const { container, unmount } = render(
      <div className="ui modal">
        <div className="scrolling content">
          <ModalSelect
            blurInputOnSelect={false}
            options={options}
            defaultOptions={options}
            classNamePrefix="react-select"
            onChange={onChange}
          />
        </div>
      </div>,
    );
    fireEvent.keyDown(screen.getByRole('textbox'), {
      key: 'ArrowDown',
      keyCode: 40,
    });
    fireEvent.click(screen.getByText('Published'));
    expect(onChange).toHaveBeenCalledWith(options[1], expect.any(Object));
    fireEvent.keyDown(screen.getByRole('textbox'), {
      key: 'ArrowDown',
      keyCode: 40,
    });
    expect(container.querySelector('.react-select__menu')).toBeTruthy();
    unmount();
    expect(container.querySelector('.react-select__menu')).toBeNull();
  });
});

test('leaves selects outside modals inline', () => {
  const ModalSelect = withSelectMenuPortal(Select);
  const { container } = render(
    <ModalSelect
      blurInputOnSelect={false}
      options={options}
      classNamePrefix="react-select"
    />,
  );
  fireEvent.keyDown(screen.getByRole('textbox'), {
    key: 'ArrowDown',
    keyCode: 40,
  });
  expect(container.querySelector('.react-select__menu').parentElement).toBe(
    container.firstChild,
  );
});
