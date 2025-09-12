import React from 'react';
import { Button, Input } from '@plone/components/quanta';
import { SearchIcon, CloseIcon } from '@plone/components/Icons';
import { useTranslation } from 'react-i18next';

interface ObjectBrowserContentProps {
  searchMode: boolean;
  setSearchMode: (mode: boolean) => void;
  loading?: boolean;
  onSearchChange?: (text: string) => void;
  showSearch?: boolean;
  children: React.ReactNode;
}

export const ObjectBrowserContent = ({
  searchMode,
  setSearchMode,
  loading = false,
  onSearchChange,
  showSearch = true,
  children,
}: ObjectBrowserContentProps) => {
  const { t } = useTranslation();

  const handleSearchToggle = () => {
    setSearchMode(!searchMode);
    if (searchMode && onSearchChange) {
      onSearchChange(''); // Clear search when closing
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearchChange) {
      onSearchChange(event.target.value);
    }
  };

  return (
    <div className="flex h-full flex-col">
      {showSearch && (
        <div className="border-b p-4">
          <div className="flex items-center gap-2">
            <Button
              variant="neutral"
              size="S"
              type="button"
              onPress={handleSearchToggle}
              aria-label={
                searchMode
                  ? t('cmsui.objectbrowserwidget.closeSearch')
                  : t('cmsui.objectbrowserwidget.openSearch')
              }
            >
              {searchMode ? <CloseIcon size="sm" /> : <SearchIcon size="sm" />}
            </Button>
            {searchMode && (
              <Input
                placeholder={t('cmsui.objectbrowserwidget.searchPlaceholder')}
                onChange={handleInputChange}
                autoFocus
                className="flex-1"
              />
            )}
          </div>
        </div>
      )}
      <div className="flex-1 overflow-hidden">
        {loading ? (
          <div className="flex h-full items-center justify-center">
            <div className="text-center text-gray-500">
              {t('cmsui.objectbrowserwidget.loading')}
            </div>
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
};

ObjectBrowserContent.displayName = 'ObjectBrowserContent';
