import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
  useRef,
} from 'react';

type ObjectBrowserNavigationContextType = {
  currentPath: string | undefined;
  setCurrentPath: React.Dispatch<React.SetStateAction<string | undefined>>;
  navigateTo: (path: string) => void;
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
    (nextPath: string) => {
      if (currentPath && nextPath !== currentPath) {
        historyRef.current.push(currentPath);
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
