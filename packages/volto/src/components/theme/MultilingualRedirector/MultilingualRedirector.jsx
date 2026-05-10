import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { changeLanguage } from '@plone/volto/actions/language/language';
import { toGettextLang, toBackendLang } from '@plone/volto/helpers/Utils/Utils';

const MultilingualRedirector = (props) => {
  const { pathname, children } = props;
  const [cookies] = useCookies();
  const site = useSelector((state) => state.site.data);
  const isMultilingual = site.features?.multilingual;
  const availableLanguages = useSelector(
    (state) => state.site?.data?.['plone.available_languages'],
  );
  const currentLanguage = useSelector((state) => state.intl.locale);
  const redirectToLanguage =
    cookies['I18N_LANGUAGE'] || site['plone.default_language'];
  const dispatch = useDispatch();

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

    if (isMultilingual) {
      if (pathname === '/') {
        performLanguageSwitch(redirectToLanguage);
      } else {
        const lang = pathname.split('/')[1];
        if (
          availableLanguages?.includes(lang) &&
          lang !== toBackendLang(currentLanguage)
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
    isMultilingual,
    availableLanguages,
    currentLanguage,
  ]);
  return pathname === '/' && isMultilingual ? (
    <Redirect to={`/${toBackendLang(redirectToLanguage)}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
