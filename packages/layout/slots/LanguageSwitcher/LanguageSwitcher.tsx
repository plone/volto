'use client';

import clsx from 'clsx';
import { useTranslation } from 'react-i18next';
import { langmap } from '@plone/helpers';
import { Link } from '@plone/components';
import type { RootLoader } from 'seven/app/root';

import styles from './LanguageSwitcher.module.css';
import { useRouteLoaderData } from 'react-router';

export const normalizeLang = (language: string): string => {
  if (language.includes('_') || language.includes('-')) {
    const [first, second] = language.split(/[-_]/);
    return `${first}-${second.toUpperCase()}`;
  }
  return language;
};

type LanguageSelectorProps = {
  onClickAction?: () => void;
};

const LanguageSwitcher = (props: LanguageSelectorProps) => {
  const { t } = useTranslation();
  const rootData = useRouteLoaderData<RootLoader>('root');
  if (!rootData) {
    return null;
  }

  const { site } = rootData;
  const isMultilingual = site.features?.multilingual;
  const availableLanguages = site['plone.available_languages'] || [];
  const currentLang = site['plone.default_language'] || 'en';

  return isMultilingual ? (
    <div className={clsx(styles['language-switcher'])}>
      {availableLanguages.map((lang) => {
        return (
          <Link
            aria-label={t('layout.languageSwitcher.switchTo', {
              lang: langmap[lang]?.nativeName.toLowerCase(),
            })}
            className={clsx({
              [styles.selected]: normalizeLang(lang) === currentLang,
            })}
            href={`/${lang}`}
            onClick={props.onClickAction}
            key={`language-switcher-${lang}`}
          >
            {langmap[lang]?.nativeName}
          </Link>
        );
      })}
    </div>
  ) : null;
};

export default LanguageSwitcher;
