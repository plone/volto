import clsx from 'clsx';
import config from '@plone/registry';
import { langmap } from '@plone/helpers';
import { Link } from '@plone/components';

import { messages } from '../messages';
import styles from './LanguageSwitcher.module.css';

export const toReactIntlLang = (language: string): string => {
  if (language.includes('_') || language.includes('-')) {
    const [first, second] = language.split(/[-_]/);
    return `${first}-${second.toUpperCase()}`;
  }
  return language;
};

interface ContentProps {
  '@components': {
    site: {
      features?: {
        multilingual?: boolean;
      };
      'plone.available_languages'?: string[];
      'plone.default_language'?: string;
    };
  };
}

type LanguageSelectorProps = {
  content: ContentProps;
  onClickAction?: () => void;
};

const LanguageSelector = (props: LanguageSelectorProps) => {
  const intl: (id: string) => string = config.getUtility({
    name: 'translation',
    type: 'factory',
  }).method;
  const { content } = props;
  const site = content['@components'].site;
  const isMultilingual = site?.features?.multilingual;
  const availableLanguages = site?.['plone.available_languages'] || [];
  const currentLang = site?.['plone.default_language'] || 'en';

  return isMultilingual ? (
    <div className={clsx(styles['language-selector'])}>
      {availableLanguages.map((lang) => {
        return (
          <Link
            aria-label={`${intl(messages.switchTo)} ${langmap[
              lang
            ]?.nativeName.toLowerCase()}`}
            className={clsx({
              [styles.selected]: toReactIntlLang(lang) === currentLang,
            })}
            href={`/${lang}`}
            onClick={props.onClickAction}
            key={`language-selector-${lang}`}
          >
            {langmap[lang]?.nativeName}
          </Link>
        );
      })}
    </div>
  ) : null;
};

export default LanguageSelector;
