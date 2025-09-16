import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ObjectBrowserModal } from './ObjectBrowserModal';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'cmsui.objectbrowserwidget.dialogTitle': 'Select Content',
        'cmsui.objectbrowserwidget.openSearch': 'Open search',
        'cmsui.objectbrowserwidget.closeDialog': 'Close selection',
        'cmsui.objectbrowserwidget.searchPlaceholder': 'Search objects...',
        'cmsui.objectbrowserwidget.closeSearch': 'Close search',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock del context
vi.mock('./ObjectBrowserContext', () => ({
  useObjectBrowserContext: () => mockContextValue,
}));

let mockContextValue: any;

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => {
      const translations: Record<string, string> = {
        'cmsui.objectbrowserwidget.dialogTitle': 'Select Content',
        'cmsui.objectbrowserwidget.openSearch': 'Open search',
        'cmsui.objectbrowserwidget.closeDialog': 'Close selection',
        'cmsui.objectbrowserwidget.searchPlaceholder': 'Search objects...',
        'cmsui.objectbrowserwidget.closeSearch': 'Close search',
      };
      return translations[key] || key;
    },
  }),
}));

// Mock dei componenti
vi.mock('@plone/components', () => ({
  Modal: ({ children, isOpen, onOpenChange, className, ...props }: any) => (
    <div
      data-testid="modal"
      data-open={isOpen}
      className={className}
      {...props}
    >
      {children}
      {onOpenChange && (
        <button
          data-testid="modal-backdrop"
          onClick={() => onOpenChange(false)}
        >
          Close Modal
        </button>
      )}
    </div>
  ),
}));

vi.mock('react-aria-components', () => ({
  Dialog: ({ children, className, ...props }: any) => (
    <div data-testid="dialog" className={className} {...props}>
      {children}
    </div>
  ),
  Heading: ({ children, slot, ...props }: any) => (
    <h2 data-testid="heading" data-slot={slot} {...props}>
      {children}
    </h2>
  ),
}));

vi.mock('@plone/components/quanta', () => ({
  Button: ({
    children,
    onPress,
    variant,
    slot,
    'aria-label': ariaLabel,
    ...props
  }: any) => (
    <button
      onClick={onPress}
      data-variant={variant}
      data-slot={slot}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  ),
  Input: ({ onChange, placeholder, className, ...props }: any) => (
    <input
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      data-testid="search-input"
      {...props}
    />
  ),
}));

vi.mock('@plone/components/Icons', () => ({
  SearchIcon: () => <span data-testid="search-icon">🔍</span>,
  CloseIcon: () => <span data-testid="close-icon">✕</span>,
}));

vi.mock('./ObjectBrowserWidgetBody', () => ({
  ObjectBrowserWidgetBody: () => (
    <div data-testid="widget-body">Widget Body</div>
  ),
}));

const renderWithContext = (contextValue: any) => {
  mockContextValue = contextValue;
  return render(<ObjectBrowserModal />);
};

describe('ObjectBrowserModal', () => {
  const defaultContextValue = {
    open: true,
    setOpen: vi.fn(),
    searchMode: false,
    setSearchMode: vi.fn(),
    handleSearchInputChange: vi.fn(),
    title: undefined,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render modal when open', () => {
      renderWithContext(defaultContextValue);

      expect(screen.getByTestId('modal')).toBeInTheDocument();
      expect(screen.getByTestId('modal')).toHaveAttribute('data-open', 'true');
    });

    it('should render modal when closed', () => {
      renderWithContext({
        ...defaultContextValue,
        open: false,
      });

      expect(screen.getByTestId('modal')).toHaveAttribute('data-open', 'false');
    });

    it('should render dialog and widget body', () => {
      renderWithContext(defaultContextValue);

      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('widget-body')).toBeInTheDocument();
    });
  });

  describe('Normal Mode (not search)', () => {
    it('should render default title when no custom title provided', () => {
      renderWithContext(defaultContextValue);

      expect(screen.getByTestId('heading')).toHaveTextContent('Select Content');
    });

    it('should render custom title when provided', () => {
      renderWithContext({
        ...defaultContextValue,
        title: 'Custom Title',
      });

      expect(screen.getByTestId('heading')).toHaveTextContent('Custom Title');
    });

    it('should render search and close buttons', () => {
      renderWithContext(defaultContextValue);

      expect(screen.getByLabelText('Open search')).toBeInTheDocument();
      expect(screen.getByLabelText('Close selection')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
      expect(screen.getByTestId('close-icon')).toBeInTheDocument();
    });

    it('should call setSearchMode when search button is clicked', () => {
      const setSearchMode = vi.fn();
      const setSearchableText = vi.fn();
      renderWithContext({
        ...defaultContextValue,
        setSearchMode,
        setSearchableText,
      });

      fireEvent.click(screen.getByLabelText('Open search'));

      expect(setSearchMode).toHaveBeenCalledWith(true);
      expect(setSearchableText).toHaveBeenCalledWith('');
    });

    it('should call setOpen when close button is clicked', () => {
      const setOpen = vi.fn();
      renderWithContext({
        ...defaultContextValue,
        setOpen,
      });

      fireEvent.click(screen.getByLabelText('Close selection'));

      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('Search Mode', () => {
    const searchModeContext = {
      ...defaultContextValue,
      searchMode: true,
    };

    it('should render search input when in search mode', () => {
      renderWithContext(searchModeContext);

      expect(screen.getByTestId('search-input')).toBeInTheDocument();
      expect(
        screen.getByPlaceholderText('Search objects...'),
      ).toBeInTheDocument();
    });

    it('should not render title and search button in search mode', () => {
      renderWithContext(searchModeContext);

      expect(screen.queryByTestId('heading')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Open search')).not.toBeInTheDocument();
    });

    it('should render close search button in search mode', () => {
      renderWithContext(searchModeContext);

      expect(screen.getByLabelText('Close search')).toBeInTheDocument();
    });

    it('should call handleSearchInputChange when typing in search input', () => {
      const handleSearchInputChange = vi.fn();
      renderWithContext({
        ...searchModeContext,
        handleSearchInputChange,
      });

      const input = screen.getByTestId('search-input');
      fireEvent.change(input, { target: { value: 'test search' } });

      expect(handleSearchInputChange).toHaveBeenCalled();
    });

    it('should call setSearchMode(false) when close search button is clicked', () => {
      const setSearchMode = vi.fn();
      const setSearchableText = vi.fn();
      renderWithContext({
        ...searchModeContext,
        setSearchMode,
        setSearchableText,
      });

      fireEvent.click(screen.getByLabelText('Close search'));

      expect(setSearchMode).toHaveBeenCalledWith(false);
      expect(setSearchableText).toHaveBeenCalledWith('');
    });
  });

  describe('Modal Interaction', () => {
    it('should call setOpen when modal backdrop is clicked', () => {
      const setOpen = vi.fn();
      renderWithContext({
        ...defaultContextValue,
        setOpen,
      });

      fireEvent.click(screen.getByTestId('modal-backdrop'));

      expect(setOpen).toHaveBeenCalledWith(false);
    });
  });

  describe('Button Variants and Slots', () => {
    it('should render search button with correct variant', () => {
      renderWithContext(defaultContextValue);

      const searchButton = screen.getByLabelText('Open search');
      expect(searchButton).toHaveAttribute('data-variant', 'icon');
    });

    it('should render close button with correct variant and slot', () => {
      renderWithContext(defaultContextValue);

      const closeButton = screen.getByLabelText('Close selection');
      expect(closeButton).toHaveAttribute('data-variant', 'icon');
      expect(closeButton).toHaveAttribute('data-slot', 'close');
    });

    it('should render close search button with correct variant and slot', () => {
      renderWithContext({
        ...defaultContextValue,
        searchMode: true,
      });

      const closeSearchButton = screen.getByLabelText('Close search');
      expect(closeSearchButton).toHaveAttribute('data-variant', 'icon');
    });
  });

  describe('CSS Classes', () => {
    it('should apply correct CSS classes to modal', () => {
      renderWithContext(defaultContextValue);

      const modal = screen.getByTestId('modal');
      expect(modal).toHaveClass('data-[entering]:animate-slide-in');
      expect(modal).toHaveClass('data-[exiting]:animate-slide-out');
      expect(modal).toHaveClass('border-quanta-azure');
      expect(modal).toHaveClass('bg-quanta-air');
    });

    it('should apply correct CSS classes to dialog', () => {
      renderWithContext(defaultContextValue);

      const dialog = screen.getByTestId('dialog');
      expect(dialog).toHaveClass('flex');
      expect(dialog).toHaveClass('h-full');
      expect(dialog).toHaveClass('flex-col');
    });

    it('should apply correct CSS classes to search input', () => {
      renderWithContext({
        ...defaultContextValue,
        searchMode: true,
      });

      const input = screen.getByTestId('search-input');
      expect(input).toHaveClass('border-quanta');
      expect(input).toHaveClass('rounded-md');
    });
  });
});
