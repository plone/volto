/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { find, map } from 'lodash';

import {
  Helmet,
  isCmsUi,
  isContextLessRoute,
  langmap,
  flattenToAppURL,
  toReactIntlLang,
} from '@plone/volto/helpers';

import config from '@plone/volto/registry';

import { defineMessages, useIntl } from 'react-intl';
import { normalizeLanguageName } from '@plone/volto/helpers';
import { changeLanguage, getContent } from '@plone/volto/actions';

const messages = defineMessages({
  switchLanguageTo: {
    id: 'Switch to',
    defaultMessage: 'Switch to',
  },
});

const LanguageSelector = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  const pathname = useLocation().pathname;
  const isContextRoute = isCmsUi(pathname); // && !isContextLessRoute(pathname);

  const { settings } = config;

  const getTarget = (location, translation, lang) => {
    const translationPath = translation
      ? flattenToAppURL(translation['@id'])
      : `/${lang}`;

    const switchLanguage = () => {
      const langFileName = normalizeLanguageName(lang);
      import('@root/../locales/' + langFileName + '.json').then((locale) => {
        dispatch(changeLanguage(lang, locale.default));
      });
    };

    const switchLanguageAndGetContent = () => {
      const langFileName = normalizeLanguageName(lang);
      import('@root/../locales/' + langFileName + '.json').then((locale) => {
        dispatch(changeLanguage(lang, locale.default));
        dispatch(getContent(translationPath));
      });
    };

    const translationNotFound = {
      location: {
        pathname: `${lang}/translation-not-found`,
        state: {
          language: lang,
        },
      },
    };

    if (translation) {
      if (isContextRoute) {
        return {
          location: {
            pathname: `${translationPath}/${location.split('/').pop()}`,
          },
          action: switchLanguageAndGetContent,
        };
      }
      // if (isContextLessRoute(pathname)) {
      //   return {
      //     location: {
      //       pathname: `${lang}/${location.split('/').pop()}`,
      //     },
      //     action: switchLanguageAndGetContent,
      //   };
      // }
      return {
        location: {
          pathname: translationPath,
        },
        action: switchLanguage,
      };
    } else {
      return translationNotFound;
    }
  };

  return settings.isMultilingual ? (
    <div className="language-selector">
      {map(settings.supportedLanguages, (lang) => {
        const translation = find(translations, { language: lang });
        const target = getTarget(pathname, translation, lang);
        // debugger;
        console.log('target', target);
        console.log('lang', lang);
        return (
          <Link
            aria-label={`${intl.formatMessage(
              messages.switchLanguageTo,
            )} ${langmap[lang].nativeName.toLowerCase()}`}
            className={cx({ selected: toReactIntlLang(lang) === currentLang })}
            to={target.location}
            title={langmap[lang].nativeName}
            onClick={() => {
              target.action?.();
              props.onClickAction();
            }}
            key={`language-selector-${lang}`}
          >
            {langmap[lang].nativeName}
          </Link>
        );
      })}
    </div>
  ) : (
    <Helmet>
      <html lang={toReactIntlLang(settings.defaultLanguage)} />
    </Helmet>
  );
};

LanguageSelector.propTypes = {
  onClickAction: PropTypes.func,
};

LanguageSelector.defaultProps = {
  onClickAction: () => {},
};

export default LanguageSelector;
