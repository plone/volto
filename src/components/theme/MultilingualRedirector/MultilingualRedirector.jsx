import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import cookie from 'react-cookie';
import { settings } from '~/config';

let locales = {};

if (settings) {
  settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const MultilingualRedirector = (props) => {
  const { pathname, children } = props;
  const currentLanguage =
    cookie.load('I18N_LANGUAGE') || settings.defaultLanguage;
  const redirectToLanguage = settings.supportedLanguages.includes(
    currentLanguage,
  )
    ? currentLanguage
    : settings.defaultLanguage;
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ToDo: Add means to support language negotiation (with config)
    // const detectedLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    if (settings.isMultilingual && pathname === '/') {
      dispatch(
        updateIntl({
          locale: redirectToLanguage,
          messages: locales[redirectToLanguage],
        }),
      );
    }
  }, [pathname, dispatch, redirectToLanguage]);

  return pathname === '/' && settings.isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
