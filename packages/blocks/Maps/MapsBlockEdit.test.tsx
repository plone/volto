import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { BlockEditProps } from '@plone/types';
import MapsBlockEdit from './MapsBlockEdit';

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'blocks.maps.maps-block-input-placeholder': 'Enter map Embed Code',
        'blocks.maps.google-maps-embedded-block': 'Google Maps Embedded Block',
        'blocks.maps.instructions':
          'Please enter the Embed Code provided by Google Maps',
        'blocks.maps.code-error':
          'Embed code error, please follow the instructions and try again.',
      };
      return translations[key] || key;
    },
  }),
}));

vi.mock('@plone/components/Icons', () => ({
  ArrowrightIcon: (props: Record<string, unknown>) => (
    <span data-testid="arrow-icon" {...props} />
  ),
  CloseIcon: (props: Record<string, unknown>) => (
    <span data-testid="close-icon" {...props} />
  ),
}));

const makeProps = (overrides: Partial<BlockEditProps> = {}) =>
  ({
    block: 'test-block-id',
    data: {},
    selected: true,
    onChangeBlock: vi.fn(),
    ...overrides,
  }) as BlockEditProps;

describe('MapsBlockEdit', () => {
  it('renders iframe when url is already set', () => {
    render(
      <MapsBlockEdit
        {...makeProps({
          data: { url: 'https://maps.google.com/?q=' } as any,
        })}
      />,
    );

    const iframe = screen.getByTitle('Google Maps Embedded Block');
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute('src', 'https://maps.google.com/?q=');
  });

  it('renders input mode with translated placeholder and instructions', () => {
    render(<MapsBlockEdit {...makeProps()} />);

    expect(
      screen.getByPlaceholderText('Enter map Embed Code'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Please enter the Embed Code provided by Google Maps'),
    ).toBeInTheDocument();
  });

  it('shows validation error for invalid embed code', () => {
    const onChangeBlock = vi.fn();
    const props = makeProps({ onChangeBlock });
    const { container } = render(<MapsBlockEdit {...props} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: 'not-an-iframe' } });
    const buttons = container.querySelectorAll('button');
    fireEvent.click(buttons[buttons.length - 1]);

    expect(
      screen.getByText(
        'Embed code error, please follow the instructions and try again.',
      ),
    ).toBeInTheDocument();
    expect(onChangeBlock).toHaveBeenCalledWith(
      'test-block-id',
      expect.objectContaining({
        url: '',
      }),
    );
  });

  it('uses clear button to reset input', () => {
    const { container } = render(<MapsBlockEdit {...makeProps()} />);
    const input = container.querySelector('input') as HTMLInputElement;

    fireEvent.change(input, { target: { value: '<iframe src="x"></iframe>' } });

    const buttonsAfterTyping = container.querySelectorAll('button');
    expect(buttonsAfterTyping).toHaveLength(2);
    fireEvent.click(buttonsAfterTyping[0]);
    expect(input.value).toBe('');
  });

  it('renders map overlay only when block is not selected', () => {
    const { container, rerender } = render(
      <MapsBlockEdit {...makeProps({ selected: false })} />,
    );

    expect(container.querySelector('.map-overlay')).toBeInTheDocument();

    rerender(<MapsBlockEdit {...makeProps({ selected: true })} />);
    expect(container.querySelector('.map-overlay')).not.toBeInTheDocument();
  });
});
