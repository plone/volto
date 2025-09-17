import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ObjectBrowserWidgetBody } from './ObjectBrowserWidgetBody';

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, params?: any) => {
      const translations: Record<string, string> = {
        'cmsui.objectbrowserwidget.goback': 'Go back',
        'cmsui.objectbrowserwidget.home': 'Home',
        'cmsui.objectbrowserwidget.changeViewMode':
          'Change view mode to {{mode}}',
        'cmsui.objectbrowserwidget.viewModes.list': 'list',
        'cmsui.objectbrowserwidget.viewModes.grid': 'grid',
        'cmsui.objectbrowserwidget.currentItems': 'Current items',
        'cmsui.objectbrowserwidget.loading': 'Loading...',
        'cmsui.objectbrowserwidget.noResults': 'No content found',
        'cmsui.objectbrowserwidget.item': '{{title}} ({{selected}})',
        'cmsui.objectbrowserwidget.itemNavigateTo': 'Navigate to {{title}}',
      };
      let result = translations[key] || key;
      if (params && typeof params === 'object') {
        Object.keys(params).forEach((param) => {
          result = result.replace('{{' + param + '}}', params[param]);
        });
      }
      return result;
    },
  }),
}));

// Mock contexts
let mockNavigationValue: any;
vi.mock('./ObjectBrowserNavigationContext', () => ({
  useObjectBrowserNavigation: () => mockNavigationValue,
}));

let mockContextValue: any;
vi.mock('./ObjectBrowserContext', () => ({
  useObjectBrowserContext: () => mockContextValue,
}));

// Mock helpers
vi.mock('@plone/helpers', () => ({
  flattenToAppURL: (url: string) => url,
}));

// Mock utils
vi.mock(import('./utils'), async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    // your mocked methods
  };
});

describe('ObjectBrowserWidgetBody', () => {
  const mockItem = {
    '@id': '/test-item',
    title: 'Test Item',
    is_folderish: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();

    mockNavigationValue = {
      currentPath: '/current',
      navigateTo: vi.fn(),
      goBack: vi.fn(),
      canGoBack: false,
    };

    mockContextValue = {
      open: true,
      setOpen: vi.fn(),
      searchMode: false,
      setSearchMode: vi.fn(),
      handleSearchInputChange: vi.fn(),
      title: 'Test Title',
      loading: false,
      items: [mockItem],
      breadcrumbs: [{ '@id': '/parent', title: 'Parent' }],
      selectedItems: [],
      handleSelectionChange: vi.fn(),
      mode: 'edit',
      widgetOptions: {},
    };
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  describe('Basic Rendering', () => {
    it('should render breadcrumbs', () => {
      render(<ObjectBrowserWidgetBody />);
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Parent')).toBeInTheDocument();
    });

    it('should render view mode toggle button', () => {
      render(<ObjectBrowserWidgetBody />);
      // Component starts with viewMode: false (stack/list), so button should offer switch to grid
      expect(
        screen.getByLabelText('Change view mode to grid'),
      ).toBeInTheDocument();
    });

    it('should render grid list', () => {
      render(<ObjectBrowserWidgetBody />);
      expect(screen.getByRole('grid')).toBeInTheDocument();
      expect(screen.getByText('Test Item')).toBeInTheDocument();
    });
  });

  describe('Navigation', () => {
    it('should show go back button when canGoBack is true', () => {
      mockNavigationValue.canGoBack = true;
      render(<ObjectBrowserWidgetBody />);
      expect(screen.getByLabelText('Go back')).toBeInTheDocument();
    });

    it('should not show go back button when canGoBack is false', () => {
      render(<ObjectBrowserWidgetBody />);
      expect(screen.queryByLabelText('Go back')).not.toBeInTheDocument();
    });

    it('should call goBack when back button clicked', () => {
      mockNavigationValue.canGoBack = true;
      render(<ObjectBrowserWidgetBody />);
      fireEvent.click(screen.getByLabelText('Go back'));
      expect(mockNavigationValue.goBack).toHaveBeenCalled();
    });

    it('should call navigateTo when breadcrumb clicked', () => {
      // Add more breadcrumbs to make Parent clickable (not the last one)
      mockContextValue.breadcrumbs = [
        { '@id': '/parent', title: 'Parent' },
        { '@id': '/parent/child', title: 'Child' },
      ];
      mockNavigationValue.currentPath = '/parent/child';
      render(<ObjectBrowserWidgetBody />);

      // Click on Parent which should be clickable now
      fireEvent.click(screen.getByText('Parent'));
      expect(mockNavigationValue.navigateTo).toHaveBeenCalledWith(
        '/parent',
        'replace',
      );
    });
  });

  describe('View Mode', () => {
    it('should toggle view mode when button clicked', () => {
      render(<ObjectBrowserWidgetBody />);
      // Initially viewMode: false (stack/list), button offers switch to grid
      expect(
        screen.getByLabelText('Change view mode to grid'),
      ).toBeInTheDocument();

      fireEvent.click(screen.getByLabelText('Change view mode to grid'));
      // After click viewMode: true (grid), button offers switch to list
      expect(
        screen.getByLabelText('Change view mode to list'),
      ).toBeInTheDocument();
    });
  });

  describe('Empty States', () => {
    it('should show loading state', () => {
      mockContextValue.loading = true;
      mockContextValue.items = [];
      render(<ObjectBrowserWidgetBody />);
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('should show no results state', () => {
      mockContextValue.loading = false;
      mockContextValue.items = [];
      render(<ObjectBrowserWidgetBody />);
      expect(screen.getByText('No content found')).toBeInTheDocument();
    });
  });
});
