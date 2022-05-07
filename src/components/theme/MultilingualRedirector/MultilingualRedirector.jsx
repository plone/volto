import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { changeLanguage } from '@plone/volto/actions';
import { normalizeLanguageName, URLUtils } from '@plone/volto/helpers';

const MultilingualRedirector = (props) => {
  const { settings } = config;
  const { pathname, children } = props;
  const [cookies] = useCookies();
  const currentLanguage = cookies['I18N_LANGUAGE'] || settings.defaultLanguage;
  const redirectToLanguage = settings.supportedLanguages.includes(
    currentLanguage,
  )
    ? currentLanguage
    : settings.defaultLanguage;
  const dispatch = useDispatch();
  const isRoot = pathname === URLUtils.normalizePath();
  React.useEffect(() => {
    // ToDo: Add means to support language negotiation (with config)
    // const detectedLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    let mounted = true;
    if (settings.isMultilingual && isRoot) {
      const langFileName = normalizeLanguageName(redirectToLanguage);
      import('@root/../locales/' + langFileName + '.json').then((locale) => {
        if (mounted) {
          dispatch(changeLanguage(redirectToLanguage, locale.default));
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [pathname, dispatch, redirectToLanguage, settings.isMultilingual, isRoot]);

  return isRoot && settings.isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
