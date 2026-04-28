import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import ImageWidget, { ImageInput } from './ImageWidget';

let mockFetcher: any;

vi.mock('react-router', () => ({
  useFetcher: () => mockFetcher,
}));

vi.mock('@plone/components/quanta', () => ({
  Button: ({ children, onPress, ...props }: any) => (
    <button onClick={onPress} {...props}>
      {children}
    </button>
  ),
  Input: ({ ...props }: any) => <input {...props} />,
}));

vi.mock('@plone/components/Icons', () => ({
  BinIcon: () => <span>bin</span>,
  ImageIcon: () => <span>image</span>,
  LinkIcon: () => <span>link</span>,
  NavigationIcon: () => <span>nav</span>,
  UploadIcon: () => <span>upload</span>,
}));

vi.mock('../Field/Field', () => ({
  Description: ({ children }: any) => <p>{children}</p>,
  FieldError: ({ children }: any) => <p>{children}</p>,
  Label: ({ children }: any) => <label>{children}</label>,
}));

vi.mock('react-aria-components', () => ({
  DialogTrigger: ({ children }: any) => <>{children}</>,
}));

vi.mock('../ObjectBrowserWidget/ObjectBrowserModal', () => ({
  ObjectBrowserModal: () => <div data-testid="object-browser-modal" />,
}));

vi.mock('../ObjectBrowserWidget/ObjectBrowserContext', () => ({
  ObjectBrowserProvider: ({ children }: any) => <>{children}</>,
  useObjectBrowserContext: () => ({ open: false, setOpen: vi.fn() }),
}));

describe('ImageWidget', () => {
  beforeEach(() => {
    mockFetcher = {
      state: 'idle',
      data: undefined,
      submit: vi.fn(),
    };
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('renders internal image previews with image scale path', () => {
    const { container } = render(<ImageWidget value="/internal/image" />);

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      '/internal/image/@@images/image/teaser',
    );
  });

  it('renders external image previews without altering url', () => {
    const { container } = render(
      <ImageWidget value="https://cdn.example.com/image.jpg" />,
    );

    const image = container.querySelector('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn.example.com/image.jpg');
  });

  it('normalizes object and array values containing @id', () => {
    const { container, rerender } = render(
      <ImageWidget value={{ '@id': '/object-id' }} />,
    );

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/object-id/@@images/image/teaser',
    );

    rerender(<ImageWidget value={[{ '@id': '/array-id' }]} />);
    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/array-id/@@images/image/teaser',
    );
  });

  it('uses defaultValue when value is undefined', () => {
    const { container } = render(
      <ImageWidget defaultValue="/fallback-image" />,
    );

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/fallback-image/@@images/image/teaser',
    );
  });

  it('prefers explicit null value over defaultValue fallback', () => {
    const { container } = render(
      <ImageWidget value={null} defaultValue="/fallback-image" />,
    );

    expect(container.querySelector('img')).not.toBeInTheDocument();
  });

  it('calls widget onChange with null when clearing current image', () => {
    const onChange = vi.fn();
    render(<ImageWidget value="/current" onChange={onChange} />);

    fireEvent.click(screen.getByLabelText('Clear image'));
    expect(onChange).toHaveBeenCalledWith(null, undefined);
  });

  it('rejects non-image uploads with a clear error message', () => {
    render(
      <ImageWidget
        hideObjectBrowserPicker
        hideLinkPicker
        restrictFileUpload={false}
      />,
    );

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(['text'], 'notes.txt', { type: 'text/plain' });
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(screen.getByText('Please upload an image file')).toBeInTheDocument();
  });

  it('prefers explicit errorMessage over aggregated error array', () => {
    render(
      <ImageWidget
        errorMessage="Explicit error"
        error={['First error', 'Second error']}
      />,
    );

    expect(screen.getByText('Explicit error')).toBeInTheDocument();
  });

  it('handles wrapped action payloads returned by data()', async () => {
    class MockFileReader {
      result = 'data:image/png;base64,ZmFrZS1pbWFnZS1ieXRlcw==';
      error = null;
      onload: null | (() => void) = null;
      onerror: null | (() => void) = null;
      readAsDataURL() {
        this.onload?.();
      }
    }
    vi.stubGlobal('FileReader', MockFileReader);

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({
        data: {
          '@id': '/uploaded-image',
          title: 'Uploaded image',
        },
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const onChange = vi.fn();
    render(<ImageWidget onChange={onChange} hideObjectBrowserPicker />);

    const fileInput = document.querySelector(
      'input[type="file"]',
    ) as HTMLInputElement;
    const file = new File(['fake-image-bytes'], 'test.png', {
      type: 'image/png',
    });
    fireEvent.change(fileInput, { target: { files: [file] } });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
    });
    expect(screen.queryByText('Image upload failed')).not.toBeInTheDocument();

    await waitFor(() => {
      expect(onChange).toHaveBeenCalledWith('/uploaded-image', {
        title: 'Uploaded image',
      });
    });
    expect(screen.queryByText('Image upload failed')).not.toBeInTheDocument();
  });
});

describe('ImageInput', () => {
  beforeEach(() => {
    mockFetcher = {
      state: 'idle',
      data: undefined,
      submit: vi.fn(),
    };
  });

  it('calls onChange with id-first signature when url is submitted', () => {
    const onChange = vi.fn();
    render(
      <ImageInput
        id="image"
        onChange={onChange}
        hideObjectBrowserPicker
        hideLinkPicker={false}
      />,
    );

    const input = screen.getByPlaceholderText('Enter an image URL');
    fireEvent.change(input, { target: { value: '  /new-image ' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toHaveBeenCalledWith('image', '/new-image', undefined);
  });

  it('uses defaultValue when value is undefined', () => {
    const onChange = vi.fn();
    const { container } = render(
      <ImageInput
        id="image"
        onChange={onChange}
        defaultValue="/preset-image"
      />,
    );

    expect(container.querySelector('img')).toHaveAttribute(
      'src',
      '/preset-image/@@images/image/teaser',
    );
  });
});
