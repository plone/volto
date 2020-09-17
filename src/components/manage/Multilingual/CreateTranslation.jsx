import React from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import { getTranslationLocator, getContent } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';
import cookie from 'react-cookie';
let locales = {};

if (settings) {
  settings.supportedLanguages.forEach((lang) => {
    import('~/../locales/' + lang + '.json').then((locale) => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const CreateTranslation = (props) => {
  const dispatch = useDispatch();
  const { language, translationOf } = props.location.state;
  const [translationLocation, setTranslationLocation] = React.useState(null);
  const [translationObject, setTranslationObject] = React.useState(null);

  React.useEffect(() => {
    // Only on mount, we dispatch the locator query
    dispatch(getTranslationLocator(translationOf, language)).then((resp) => {
      setTranslationLocation(resp['@id']);
    });
    //and we load the translationObject
    dispatch(getContent(translationOf, null, 'translationObject')).then(
      (resp) => {
        setTranslationObject(resp);
      },
    );
    // On unmount we dispatch the language change
    return () => {
      cookie.save('lang', language, {
        expires: new Date((2 ** 31 - 1) * 1000),
        path: '/',
      });
      cookie.save('I18N_LANGUAGE', language || '', {
        expires: new Date((2 ** 31 - 1) * 1000),
        path: '/',
      });

      dispatch(
        updateIntl({
          locale: language,
          messages: locales[language],
        }),
      );
    };
    // On mount only
    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return (
    translationLocation &&
    translationObject && (
      <Redirect
        to={{
          pathname: `${flattenToAppURL(translationLocation)}/add`,
          search: `?type=${props.location.state.type}`,
          state: {
            translationOf: props.location.state.translationOf,
            language: props.location.state.language,
            translationObject: translationObject,
          },
        }}
      />
    )
  );
};

export default CreateTranslation;
