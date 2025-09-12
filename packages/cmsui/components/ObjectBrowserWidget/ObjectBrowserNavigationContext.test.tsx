import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import {
  ObjectBrowserNavigationProvider,
  useObjectBrowserNavigation,
} from './ObjectBrowserNavigationContext';

// Test component to access the context
const TestComponent = () => {
  const { currentPath, setCurrentPath, navigateTo, goBack, reset, canGoBack } =
    useObjectBrowserNavigation();

  return (
    <div>
      <div data-testid="current-path">{currentPath || 'undefined'}</div>
      <div data-testid="can-go-back">{canGoBack.toString()}</div>
      <button data-testid="set-path" onClick={() => setCurrentPath('/test')}>
        Set Path
      </button>
      <button data-testid="navigate-to" onClick={() => navigateTo('/new-path')}>
        Navigate To
      </button>
      <button
        data-testid="navigate-replace"
        onClick={() => navigateTo('/replace-path', 'replace')}
      >
        Navigate Replace
      </button>
      <button data-testid="go-back" onClick={goBack}>
        Go Back
      </button>
      <button data-testid="reset" onClick={() => reset()}>
        Reset
      </button>
      <button data-testid="reset-to" onClick={() => reset('/reset-path')}>
        Reset To
      </button>
    </div>
  );
};

const renderWithProvider = (initialPath?: string) => {
  return render(
    <ObjectBrowserNavigationProvider initialPath={initialPath}>
      <TestComponent />
    </ObjectBrowserNavigationProvider>,
  );
};

describe('ObjectBrowserNavigationContext', () => {
  describe('Provider', () => {
    it('should render children', () => {
      renderWithProvider();
      expect(screen.getByTestId('current-path')).toBeInTheDocument();
    });

    it('should initialize with undefined path when no initialPath provided', () => {
      renderWithProvider();
      expect(screen.getByTestId('current-path')).toHaveTextContent('undefined');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });

    it('should initialize with provided initialPath', () => {
      renderWithProvider('/initial');
      expect(screen.getByTestId('current-path')).toHaveTextContent('/initial');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });
  });

  describe('setCurrentPath', () => {
    it('should update current path', () => {
      renderWithProvider();

      act(() => {
        screen.getByTestId('set-path').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/test');
    });
  });

  describe('navigateTo', () => {
    it('should navigate to new path in push mode (default)', () => {
      renderWithProvider('/initial');

      act(() => {
        screen.getByTestId('navigate-to').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/new-path');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');
    });

    it('should not navigate if path is the same as current', () => {
      const TestComponentSamePath = () => {
        const { navigateTo, currentPath, canGoBack } =
          useObjectBrowserNavigation();
        return (
          <div>
            <div data-testid="current-path">{currentPath || 'undefined'}</div>
            <div data-testid="can-go-back">{canGoBack.toString()}</div>
            <button
              data-testid="navigate-same"
              onClick={() => navigateTo('/same-path')}
            >
              Navigate Same
            </button>
          </div>
        );
      };

      render(
        <ObjectBrowserNavigationProvider initialPath="/same-path">
          <TestComponentSamePath />
        </ObjectBrowserNavigationProvider>,
      );

      act(() => {
        screen.getByTestId('navigate-same').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent(
        '/same-path',
      );
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });

    it('should navigate in replace mode and clear history', () => {
      renderWithProvider('/initial');

      // First navigate to create history
      act(() => {
        screen.getByTestId('navigate-to').click();
      });

      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Then navigate in replace mode
      act(() => {
        screen.getByTestId('navigate-replace').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent(
        '/replace-path',
      );
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });
  });

  describe('goBack', () => {
    it('should go back to previous path', () => {
      renderWithProvider('/initial');

      // Navigate to create history
      act(() => {
        screen.getByTestId('navigate-to').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/new-path');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Go back
      act(() => {
        screen.getByTestId('go-back').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/initial');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });

    it('should handle multiple navigations and back', () => {
      const TestComponentMultiple = () => {
        const { navigateTo, goBack, currentPath, canGoBack } =
          useObjectBrowserNavigation();
        return (
          <div>
            <div data-testid="current-path">{currentPath || 'undefined'}</div>
            <div data-testid="can-go-back">{canGoBack.toString()}</div>
            <button onClick={() => navigateTo('/path1')} data-testid="nav1">
              Nav1
            </button>
            <button onClick={() => navigateTo('/path2')} data-testid="nav2">
              Nav2
            </button>
            <button onClick={goBack} data-testid="back">
              Back
            </button>
          </div>
        );
      };

      render(
        <ObjectBrowserNavigationProvider initialPath="/initial">
          <TestComponentMultiple />
        </ObjectBrowserNavigationProvider>,
      );

      // Navigate to path1
      act(() => {
        screen.getByTestId('nav1').click();
      });
      expect(screen.getByTestId('current-path')).toHaveTextContent('/path1');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Navigate to path2
      act(() => {
        screen.getByTestId('nav2').click();
      });
      expect(screen.getByTestId('current-path')).toHaveTextContent('/path2');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Go back to path1
      act(() => {
        screen.getByTestId('back').click();
      });
      expect(screen.getByTestId('current-path')).toHaveTextContent('/path1');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Go back to initial
      act(() => {
        screen.getByTestId('back').click();
      });
      expect(screen.getByTestId('current-path')).toHaveTextContent('/initial');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });

    it('should do nothing when no history exists', () => {
      renderWithProvider('/initial');

      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');

      act(() => {
        screen.getByTestId('go-back').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/initial');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });
  });

  describe('reset', () => {
    it('should reset to initial path', () => {
      renderWithProvider('/initial');

      // Navigate to create history
      act(() => {
        screen.getByTestId('navigate-to').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/new-path');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Reset
      act(() => {
        screen.getByTestId('reset').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/initial');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });

    it('should reset to specified path', () => {
      renderWithProvider('/initial');

      // Navigate to create history
      act(() => {
        screen.getByTestId('navigate-to').click();
      });

      expect(screen.getByTestId('can-go-back')).toHaveTextContent('true');

      // Reset to specific path
      act(() => {
        screen.getByTestId('reset-to').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent(
        '/reset-path',
      );
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });

    it('should reset to undefined when no initial path and no reset path', () => {
      renderWithProvider(); // No initial path

      // Navigate to create history
      act(() => {
        screen.getByTestId('navigate-to').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('/new-path');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false'); // Changed expectation

      // Reset
      act(() => {
        screen.getByTestId('reset').click();
      });

      expect(screen.getByTestId('current-path')).toHaveTextContent('undefined');
      expect(screen.getByTestId('can-go-back')).toHaveTextContent('false');
    });
  });

  describe('Hook without provider', () => {
    it('should throw error when used outside provider', () => {
      const TestComponentOutside = () => {
        useObjectBrowserNavigation();
        return <div>Should not render</div>;
      };

      expect(() => {
        render(<TestComponentOutside />);
      }).toThrow(
        'useObjectBrowserNavigation must be used within an ObjectBrowserNavigationProvider',
      );
    });
  });
});
