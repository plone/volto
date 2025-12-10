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
    if (isMultilingual) {
      if (pathname === '/') {
        const langFileName = toGettextLang(redirectToLanguage);
        import(/* @vite-ignore */ '@root/../locales/' + langFileName + '.json')
          .then((locale) => {
            if (mounted) {
              dispatch(changeLanguage(redirectToLanguage, locale.default));
            }
          })
          .catch(() => {
            // eslint-disable-next-line no-console
            console.warn(
              `Locale file for ${redirectToLanguage} not found. Fallback to default.`,
            );
            if (mounted) {
              dispatch(changeLanguage(redirectToLanguage, {}));
            }
          });
      } else {
        const lang = pathname.split('/')[1];
        if (
          availableLanguages?.includes(lang) &&
          lang !== currentLanguage &&
          mounted
        ) {
          const langFileName = toGettextLang(lang);
          import(
            /* @vite-ignore */ '@root/../locales/' + langFileName + '.json'
          )
            .then((locale) => {
              if (mounted) {
                dispatch(changeLanguage(lang, locale.default));
              }
            })
            .catch(() => {
              // eslint-disable-next-line no-console
              console.warn(
                `Locale file for ${lang} not found. Fallback to default.`,
              );
              if (mounted) {
                dispatch(changeLanguage(lang, {}));
              }
            });
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
