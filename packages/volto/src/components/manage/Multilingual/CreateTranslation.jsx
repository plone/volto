import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeLanguage } from '@plone/volto/actions/language/language';
import { getTranslationLocator } from '@plone/volto/actions/translations/translations';
import { getContent } from '@plone/volto/actions/content/content';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { toGettextLang } from '@plone/volto/helpers/Utils/Utils';
import config from '@plone/volto/registry';

const CreateTranslation = (props) => {
  const dispatch = useDispatch();
  const { language, translationOf } = props.location.state;
  const [translationLocation, setTranslationLocation] = React.useState(null);
  const languageFrom = useSelector((state) => state.intl.locale);

  const translationObject = useSelector(
    (state) => state.content.subrequests['translationObject'],
  );

  React.useEffect(() => {
    // Only on mount, we dispatch the locator query
    dispatch(getTranslationLocator(translationOf, language)).then((resp) => {
      setTranslationLocation(resp['@id']);
    });

    //and we load the translationObject
    dispatch(getContent(translationOf, null, 'translationObject'));

    // On unmount we dispatch the language change
    return () => {
      // We change the interface language
      if (config.settings.supportedLanguages.includes(language)) {
        const langFileName = toGettextLang(language);
        import(/* @vite-ignore */ '@root/../locales/' + langFileName + '.json')
          .then((locale) => {
            dispatch(changeLanguage(language, locale.default));
          })
          .catch(() => {
            // If locale file doesn't exist, still switch language with empty locale
            dispatch(changeLanguage(language, {}));
          });
      }
    };
    // On mount only
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    translationLocation &&
    translationObject.data &&
    translationObject.loaded > 0 && (
      <Redirect
        to={{
          pathname: `${flattenToAppURL(translationLocation)}/add`,
          search: `?type=${props.location.state.type}`,
          state: {
            translationOf: props.location.state.translationOf,
            language: props.location.state.language,
            translationObject: translationObject.data,
            languageFrom,
          },
        }}
      />
    )
  );
};

export default CreateTranslation;
