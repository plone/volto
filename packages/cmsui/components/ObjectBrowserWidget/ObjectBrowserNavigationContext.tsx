import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  useRef,
} from 'react';

type NavigateMode = 'push' | 'replace';

type ObjectBrowserNavigationContextType = {
  currentPath: string | undefined;
  setCurrentPath: React.Dispatch<React.SetStateAction<string | undefined>>;
  navigateTo: (path: string, mode?: NavigateMode) => void;
  goBack: () => void;
  reset: (toPath?: string) => void;
  canGoBack: boolean;
};

const ObjectBrowserNavigationContext = createContext<
  ObjectBrowserNavigationContextType | undefined
>(undefined);

export function ObjectBrowserNavigationProvider({
  initialPath,
  children,
}: {
  initialPath?: string;
  children: ReactNode;
}) {
  const historyRef = useRef<string[]>([]);
  const [currentPath, setCurrentPath] = useState(initialPath);
  const [canGoBack, setCanGoBack] = useState(false);

  const navigateTo = useCallback(
    (nextPath: string, mode: NavigateMode = 'push') => {
      if (currentPath && nextPath === currentPath) return;
      if (currentPath && mode === 'push') {
        historyRef.current.push(currentPath);
      } else if (mode === 'replace') {
        // For replace mode, do NOT add currentPath to history.
        // Clear history here, you want to reset navigation stack on replace
        historyRef.current = [];
      }
      setCurrentPath(nextPath);
      setCanGoBack(historyRef.current.length > 0);
    },
    [currentPath],
  );

  const goBack = useCallback(() => {
    const lastPath = historyRef.current.pop();
    if (lastPath !== undefined) {
      setCurrentPath(lastPath);
      setCanGoBack(historyRef.current.length > 0);
    }
  }, []);

  const reset = useCallback(
    (toPath?: string) => {
      historyRef.current = [];
      const path = toPath || initialPath;
      setCurrentPath(path);
      setCanGoBack(false);
    },
    [initialPath],
  );

  const value = useMemo(
    () => ({
      currentPath,
      setCurrentPath,
      navigateTo,
      goBack,
      reset,
      canGoBack,
    }),
    [currentPath, navigateTo, goBack, reset, canGoBack],
  );

  return (
    <ObjectBrowserNavigationContext.Provider value={value}>
      {children}
    </ObjectBrowserNavigationContext.Provider>
  );
}

export function useObjectBrowserNavigation() {
  const context = useContext(ObjectBrowserNavigationContext);
  if (!context) {
    throw new Error(
      'useObjectBrowserNavigation must be used within an ObjectBrowserNavigationProvider',
    );
  }
  return context;
}

ObjectBrowserNavigationProvider.displayName = 'ObjectBrowserNavigationProvider';
