import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import cookie from 'react-cookie';
import config from '@plone/volto/registry';
import { changeLanguage } from '@plone/volto/actions';
import { normalizeLanguageName } from '@plone/volto/helpers';

const MultilingualRedirector = (props) => {
  const { settings } = config;
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
      const langFileName = normalizeLanguageName(redirectToLanguage);
      import('~/../locales/' + langFileName + '.json').then((locale) => {
        dispatch(changeLanguage(redirectToLanguage, locale.default));
      });
    }
  }, [pathname, dispatch, redirectToLanguage, settings.isMultilingual]);

  return pathname === '/' && settings.isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
