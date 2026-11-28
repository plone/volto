import React from 'react';
import { render, waitFor } from '@testing-library/react';
import config from '@plone/volto/registry';
import SlateEditor from './SlateEditor';

beforeAll(() => {
  window.getSelection = () => ({
    removeAllRanges: () => {},
    addRange: () => {},
  });

  config.settings = {
    slate: {
      elements: {
        default: ({ attributes, children }) => (
          <p {...attributes}>{children}</p>
        ),
      },
      leafs: {},
      persistentHelpers: [],
      contextToolbarButtons: [],
      textblockExtensions: [],
      extensions: [],
      elementToolbarButtons: {},
      defaultValue: () => [{ type: 'p', children: [{ text: '' }] }],
    },
  };
});

describe('SlateEditor placeholder and accessibility', () => {
  it('renders default placeholder with minimum accessible contrast opacity (0.65)', async () => {
    const { container } = render(
      <SlateEditor
        selected={true}
        placeholder="Type text..."
        value={[{ type: 'p', children: [{ text: '' }] }]}
      />,
    );

    await waitFor(() => {
      const placeholderEl = container.querySelector(
        '[data-slate-placeholder="true"]',
      );
      expect(placeholderEl).toBeInTheDocument();
      expect(placeholderEl).toHaveTextContent('Type text...');
      expect(placeholderEl.style.opacity).toBe('0.65');
    });
  });

  it('allows custom renderPlaceholder prop to override default placeholder', async () => {
    const customRenderPlaceholder = ({ attributes, children }) => (
      <span
        {...attributes}
        data-testid="custom-placeholder"
        style={{ ...attributes.style, opacity: 0.8 }}
      >
        Custom: {children}
      </span>
    );

    const { getByTestId } = render(
      <SlateEditor
        selected={true}
        placeholder="Type text..."
        renderPlaceholder={customRenderPlaceholder}
        value={[{ type: 'p', children: [{ text: '' }] }]}
      />,
    );

    await waitFor(() => {
      const placeholderEl = getByTestId('custom-placeholder');
      expect(placeholderEl).toBeInTheDocument();
      expect(placeholderEl).toHaveTextContent('Custom: Type text...');
      expect(placeholderEl.style.opacity).toBe('0.8');
    });
  });
});
