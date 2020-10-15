/**
 * Language selector component.
 * @module components/LanguageSelector/LanguageSelector
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import cookie from 'react-cookie';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { find, map } from 'lodash';
import { updateIntl } from 'react-intl-redux';
import langmap from 'langmap';
import { Helmet } from '@plone/volto/helpers';

import { settings } from '~/config';

import { flattenToAppURL } from '@plone/volto/helpers';

let locales = {};

if (settings) {
  settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const LanguageSelector = (props) => {
  const dispatch = useDispatch();
  const currentLang = useSelector((state) => state.intl.locale);
  const translations = useSelector(
    (state) => state.content.data?.['@components']?.translations?.items,
  );

  function changeLanguage(language) {
    cookie.save('I18N_LANGUAGE', language, {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });

    dispatch(
      updateIntl({
        locale: language,
        messages: locales[language],
      }),
    );
  }

  return settings.isMultilingual ? (
    <div className="language-selector">
      {map(settings.supportedLanguages, (lang) => {
        const translation = find(translations, { language: lang });
        return (
          <Link
            className={cx({ selected: lang === currentLang })}
            to={translation ? flattenToAppURL(translation['@id']) : `/${lang}`}
            title={langmap[lang].nativeName}
            onClick={() => {
              props.onClickAction();
              changeLanguage(lang);
            }}
            key={`language-selector-${lang}`}
          >
            {lang}&nbsp;
          </Link>
        );
      })}
    </div>
  ) : (
    <Helmet>
      <html lang={settings.defaultLanguage} />
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
