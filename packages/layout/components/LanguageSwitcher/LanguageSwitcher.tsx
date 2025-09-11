/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import type { SlotComponentProps } from '../../SlotRenderer';
import { Link } from '@plone/components';
import clsx from 'clsx';
import config from '@plone/registry';
import { messages } from '../messages';
import { langmap } from '@plone/helpers';
//import { toReactIntlLang } from '@plone/volto/helpers/Utils/Utils';

// const messages = defineMessages({
//   switchLanguageTo: {
//     id: 'Switch to',
//     defaultMessage: 'Switch to',
//   },
// });

export const toReactIntlLang = (language: string): string => {
  if (language.includes('_') || language.includes('-')) {
    const [first, second] = language.split(/[-_]/);
    return `${first}-${second.toUpperCase()}`;
  }
  return language;
};

interface TranslationItem {
  language: string;
  '@id': string;
}

interface ContentProps {
  '@components': {
    site: {
      features?: {
        multilingual?: boolean;
      };
      'plone.available_languages'?: string[];
      'plone.default_language'?: string;
    };
    translations?: {
      items: TranslationItem[];
    };
  };
}

interface LanguageSelectorProps {
  content: ContentProps;
  onClickAction?: () => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = (props) => {
  const intl: (id: string) => string = config.getUtility({
    name: 'translation',
    type: 'factory',
  }).method;
  const { content } = props;
  const site = content['@components'].site;
  const isMultilingual = site?.features?.multilingual || true;
  const availableLanguages = site?.['plone.available_languages'] || [
    'en',
    'fr-tg',
    'la',
    'hi',
  ];
  const currentLang = site?.['plone.default_language'] || 'en';

  return isMultilingual ? (
    <div className="language-selector">
      {availableLanguages.map((lang) => {
        return (
          <Link
            aria-label={`${intl(messages.switchTo)} ${langmap[
              lang
            ]?.nativeName.toLowerCase()}`}
            className={clsx({
              selected: toReactIntlLang(lang) === currentLang,
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
