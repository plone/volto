import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { IntlProvider } from 'react-intl';
import { act, render } from '@testing-library/react';
import PersistentSlashMenu from './SlashMenu';

vi.mock('@plone/volto/components/theme/Icon/Icon', () => ({
  default: () => <span />,
}));

const blocksConfig = {
  slate: { id: 'slate', title: 'Text', icon: 'text' },
  accordion: { id: 'accordion', title: 'Accordion', icon: 'accordion' },
  image: { id: 'image', title: 'Image', icon: 'image' },
  video: { id: 'video', title: 'Video', icon: 'video' },
};

const store = createStore((state) => state, {
  userSession: { token: null },
  users: { user: {}, get: { loading: false, loaded: false, error: null } },
});

/** Renders the menu for the typed `plaintext`; returns the editor and a rerender. */
function renderSlashMenu(plaintext, onMutateBlock) {
  const editor = {};
  const props = (text) => ({
    block: 'block-1',
    blocksConfig,
    data: { plaintext: text },
    onMutateBlock,
    properties: {},
    selected: true,
  });
  editor.getBlockProps = () => props(plaintext);

  const tree = () => (
    <Provider store={store}>
      <IntlProvider locale="en" messages={{}}>
        <PersistentSlashMenu editor={editor} />
      </IntlProvider>
    </Provider>
  );
  const result = render(tree());

  const type = (text) => {
    editor.getBlockProps = () => props(text);
    result.rerender(tree());
  };

  return { editor, type, container: result.container };
}

describe('PersistentSlashMenu', () => {
  it('lists the matching blocks, without the text block', () => {
    const { container } = renderSlashMenu('/', vi.fn());
    const items = container.querySelectorAll('.power-user-menu .item');
    expect(Array.from(items).map((item) => item.textContent)).toEqual([
      'Accordion',
      'Image',
      'Video',
    ]);
  });

  it('inserts the first block after a filter that matched nothing', () => {
    const onMutateBlock = vi.fn();
    const { editor, type, container } = renderSlashMenu('/', onMutateBlock);

    // "/text" matches nothing: the text block itself isn't offered.
    type('/text');
    expect(container.textContent).toContain('No matching blocks');
    act(() => editor.slashEnter());
    expect(onMutateBlock).not.toHaveBeenCalled();

    // Back to "/": every block matches again, and Enter inserts the first.
    type('/');
    expect(container.querySelector('.item.active').textContent).toBe(
      'Accordion',
    );
    act(() => editor.slashEnter());
    expect(onMutateBlock).toHaveBeenCalledWith(
      'block-1',
      { '@type': 'accordion' },
      expect.anything(),
    );
  });

  it('keeps the selection in the list when the filter narrows it', () => {
    const onMutateBlock = vi.fn();
    const { editor, type, container } = renderSlashMenu('/', onMutateBlock);

    // Select the last block, Video, then narrow the list to Image.
    act(() => editor.slashArrowUp());
    expect(container.querySelector('.item.active').textContent).toBe('Video');
    type('/ima');
    expect(container.querySelector('.item.active').textContent).toBe('Image');

    act(() => editor.slashEnter());
    expect(onMutateBlock).toHaveBeenCalledWith(
      'block-1',
      { '@type': 'image' },
      expect.anything(),
    );
  });
});
