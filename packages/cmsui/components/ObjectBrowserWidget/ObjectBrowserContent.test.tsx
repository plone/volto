import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ObjectBrowserContent } from './ObjectBrowserContent';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'cmsui.objectbrowserwidget.openSearch': 'Open search',
        'cmsui.objectbrowserwidget.closeSearch': 'Close search',
        'cmsui.objectbrowserwidget.searchPlaceholder': 'Search objects...',
        'cmsui.objectbrowserwidget.loading': 'Loading...',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock dei componenti di Plone
vi.mock('@plone/components/quanta', () => ({
  Button: ({ children, onPress, 'aria-label': ariaLabel, ...props }: any) => (
    <button onClick={onPress} aria-label={ariaLabel} {...props}>
      {children}
    </button>
  ),
  Input: ({ onChange, placeholder, autoFocus, className, ...props }: any) => (
    <input
      onChange={onChange}
      placeholder={placeholder}
      {...(autoFocus && { autoFocus: true })}
      className={className}
      {...props}
    />
  ),
}));

vi.mock('@plone/components/Icons', () => ({
  SearchIcon: ({ size }: any) => (
    <span data-testid="search-icon" data-size={size}>
      🔍
    </span>
  ),
  CloseIcon: ({ size }: any) => (
    <span data-testid="close-icon" data-size={size}>
      ✕
    </span>
  ),
}));

describe('ObjectBrowserContent', () => {
  const defaultProps = {
    searchMode: false,
    setSearchMode: vi.fn(),
    children: <div data-testid="content">Test Content</div>,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render children when not loading', () => {
      render(<ObjectBrowserContent {...defaultProps} />);

      expect(screen.getByTestId('content')).toBeInTheDocument();
      expect(screen.getByText('Test Content')).toBeInTheDocument();
    });

    it('should render loading state when loading is true', () => {
      render(<ObjectBrowserContent {...defaultProps} loading={true} />);

      expect(screen.getByText('Loading...')).toBeInTheDocument();
      expect(screen.queryByTestId('content')).not.toBeInTheDocument();
    });

    it('should render search button when showSearch is true (default)', () => {
      render(<ObjectBrowserContent {...defaultProps} />);

      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByLabelText('Open search')).toBeInTheDocument();
    });

    it('should not render search section when showSearch is false', () => {
      render(<ObjectBrowserContent {...defaultProps} showSearch={false} />);

      expect(screen.queryByTestId('search-icon')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Open search')).not.toBeInTheDocument();
    });
  });

  describe('Search Mode Toggle', () => {
    it('should show close icon when in search mode', () => {
      render(<ObjectBrowserContent {...defaultProps} searchMode={true} />);

      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
      expect(screen.getByLabelText('Close search')).toBeInTheDocument();
    });

    it('should show search input when in search mode', () => {
      render(<ObjectBrowserContent {...defaultProps} searchMode={true} />);

      expect(
        screen.getByPlaceholderText('Search objects...'),
      ).toBeInTheDocument();
    });

    it('should call setSearchMode when search button is clicked', () => {
      const setSearchMode = vi.fn();
      render(
        <ObjectBrowserContent
          {...defaultProps}
          setSearchMode={setSearchMode}
        />,
      );

      fireEvent.click(screen.getByLabelText('Open search'));

      expect(setSearchMode).toHaveBeenCalledWith(true);
    });

    it('should call setSearchMode and clear search when close button is clicked', () => {
      const setSearchMode = vi.fn();
      const onSearchChange = vi.fn();
      render(
        <ObjectBrowserContent
          {...defaultProps}
          searchMode={true}
          setSearchMode={setSearchMode}
          onSearchChange={onSearchChange}
        />,
      );

      fireEvent.click(screen.getByLabelText('Close search'));

      expect(setSearchMode).toHaveBeenCalledWith(false);
      expect(onSearchChange).toHaveBeenCalledWith('');
    });
  });

  describe('Search Input', () => {
    it('should call onSearchChange when input value changes', () => {
      const onSearchChange = vi.fn();
      render(
        <ObjectBrowserContent
          {...defaultProps}
          searchMode={true}
          onSearchChange={onSearchChange}
        />,
      );

      const input = screen.getByPlaceholderText('Search objects...');
      fireEvent.change(input, { target: { value: 'test search' } });

      expect(onSearchChange).toHaveBeenCalledWith('test search');
    });

    it('should not call onSearchChange when callback is not provided', () => {
      render(<ObjectBrowserContent {...defaultProps} searchMode={true} />);

      const input = screen.getByPlaceholderText('Search objects...');

      // Should not throw error
      expect(() => {
        fireEvent.change(input, { target: { value: 'test' } });
      }).not.toThrow();
    });

    it('should have autoFocus on search input', () => {
      render(<ObjectBrowserContent {...defaultProps} searchMode={true} />);

      const input = screen.getByPlaceholderText('Search objects...');
      expect(input).toHaveProperty('autoFocus', true);
    });
  });

  describe('Accessibility', () => {
    it('should have proper aria-label for search button', () => {
      render(<ObjectBrowserContent {...defaultProps} />);

      expect(screen.getByLabelText('Open search')).toBeInTheDocument();
    });

    it('should have proper aria-label for close button', () => {
      render(<ObjectBrowserContent {...defaultProps} searchMode={true} />);

      expect(screen.getByLabelText('Close search')).toBeInTheDocument();
    });
  });

  describe('Icon Size', () => {
    it('should render search icon with correct size', () => {
      render(<ObjectBrowserContent {...defaultProps} />);

      const icon = screen.getByTestId('search-icon');
      expect(icon).toHaveAttribute('data-size', 'sm');
    });

    it('should render close icon with correct size', () => {
      render(<ObjectBrowserContent {...defaultProps} searchMode={true} />);

      const icon = screen.getByTestId('close-icon');
      expect(icon).toHaveAttribute('data-size', 'sm');
    });
  });
});
