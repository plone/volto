import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { changeLanguage } from '@plone/volto/actions';
import { normalizeLanguageName } from '@plone/volto/helpers';

const MultilingualRedirector = (props) => {
  const { settings } = config;
  const { pathname, contentLanguage, children } = props;
  const [cookies] = useCookies(['name']);
  const currentLanguage = cookies['I18N_LANGUAGE'] || settings.defaultLanguage;
  const redirectToLanguage = settings.supportedLanguages.includes(
    currentLanguage,
  )
    ? currentLanguage
    : settings.defaultLanguage;
  const dispatch = useDispatch();

  React.useEffect(() => {
    // This ensures the current content language and the current active language in the
    // UI are the same. Otherwise, there are inconsistencies between the UI main elements
    // eg. Home link in breadcrumbs, other i18n dependant literals from the main UI and
    // the current content language.
    // This variable makes sure that the async operation in the lazy load import does not
    // happen twice (when switching language)
    let mounted = true;
    if (
      contentLanguage &&
      currentLanguage !== contentLanguage &&
      pathname &&
      pathname !== '/' &&
      // We don't want to trigger it in Babel View, since Babel view already takes care
      // of it
      !pathname.endsWith('/add') &&
      settings.isMultilingual
    ) {
      const langFileName = normalizeLanguageName(contentLanguage);
      import('~/../locales/' + langFileName + '.json').then((locale) => {
        if (mounted) {
          dispatch(changeLanguage(contentLanguage, locale.default));
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [
    pathname,
    dispatch,
    currentLanguage,
    contentLanguage,
    settings.isMultilingual,
  ]);

  React.useEffect(() => {
    // ToDo: Add means to support language negotiation (with config)
    // const detectedLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    let mounted = true;
    if (settings.isMultilingual && pathname === '/') {
      const langFileName = normalizeLanguageName(redirectToLanguage);
      import('~/../locales/' + langFileName + '.json').then((locale) => {
        if (mounted) {
          dispatch(changeLanguage(redirectToLanguage, locale.default));
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [pathname, dispatch, redirectToLanguage, settings.isMultilingual]);

  return pathname === '/' && settings.isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
