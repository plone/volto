import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import config from '@plone/volto/registry';
import { changeLanguage } from '@plone/volto/actions/language/language';
import { toGettextLang, toBackendLang } from '@plone/volto/helpers/Utils/Utils';

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

  const currentLocale = useSelector((state) => state.intl.locale);

  React.useEffect(() => {
    // ToDo: Add means to support language negotiation (with config)
    // const detectedLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    let mounted = true;

    const performLanguageSwitch = (targetLang) => {
      const langFileName = toGettextLang(targetLang);
      import(/* @vite-ignore */ '@root/../locales/' + langFileName + '.json')
        .then((locale) => {
          if (mounted) {
            dispatch(changeLanguage(targetLang, locale.default));
          }
        })
        .catch(() => {
          // If locale file doesn't exist, still switch language with empty locale
          if (mounted) {
            dispatch(changeLanguage(targetLang, {}));
          }
        });
    };

    if (settings.isMultilingual) {
      if (pathname === '/') {
        performLanguageSwitch(redirectToLanguage);
      } else {
        const lang = pathname.split('/')[1];
        if (
          settings.supportedLanguages.includes(lang) &&
          lang !== toBackendLang(currentLocale)
        ) {
          performLanguageSwitch(lang);
        }
      }
    }
    return () => {
      mounted = false;
    };
  }, [
    pathname,
    dispatch,
    redirectToLanguage,
    settings.isMultilingual,
    settings.supportedLanguages,
    currentLocale,
  ]);

  return pathname === '/' && settings.isMultilingual ? (
    <Redirect to={`/${toBackendLang(redirectToLanguage)}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
