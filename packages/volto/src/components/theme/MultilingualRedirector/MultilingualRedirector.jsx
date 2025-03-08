import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { changeLanguage } from '@plone/volto/actions/language/language';
import { toGettextLang } from '@plone/volto/helpers/Utils/Utils';

const MultilingualRedirector = (props) => {
  const { pathname, children } = props;
  const [cookies] = useCookies();
  const site = useSelector((state) => state.site.data);
  const currentLanguage =
    cookies['I18N_LANGUAGE'] || site['plone.default_language'];
  const redirectToLanguage = site['plone.available_languages'].includes(
    currentLanguage,
  )
    ? currentLanguage
    : site['plone.default_language'];
  const isMultilingual = useSelector((state) => state.addons.isMultilingual);
  const dispatch = useDispatch();

  React.useEffect(() => {
    // ToDo: Add means to support language negotiation (with config)
    // const detectedLang = (navigator.language || navigator.userLanguage).substring(0, 2);
    let mounted = true;
    if (isMultilingual && pathname === '/') {
      const langFileName = toGettextLang(redirectToLanguage);
      import(
        /* @vite-ignore */ '@root/../locales/' + langFileName + '.json'
      ).then((locale) => {
        if (mounted) {
          dispatch(changeLanguage(redirectToLanguage, locale.default));
        }
      });
    }
    return () => {
      mounted = false;
    };
  }, [pathname, dispatch, redirectToLanguage, isMultilingual]);

  return pathname === '/' && isMultilingual ? (
    <Redirect to={`/${redirectToLanguage}`} />
  ) : (
    <>{children}</>
  );
};

export default MultilingualRedirector;
