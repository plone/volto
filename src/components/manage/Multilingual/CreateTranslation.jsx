import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateIntl } from 'react-intl-redux';
import { getTranslationLocator } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';
import { settings } from '~/config';

let locales = {};

if (settings) {
  settings.supportedLanguages.forEach(lang => {
    import('~/../locales/' + lang + '.json').then(locale => {
      locales = { ...locales, [lang]: locale.default };
    });
  });
}

const CreateTranslation = props => {
  const dispatch = useDispatch();
  const translationLocation = useSelector(
    state => state.translations.translationLocation,
  );
  const { language, translationOf } = props.location.state;

  React.useEffect(() => {
    // Only on mount, we dispatch the locator query
    dispatch(getTranslationLocator(translationOf, language));
    // On unmount we dispatch the language change
    return () => {
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
    translationLocation && (
      <Redirect
        to={{
          pathname: `${flattenToAppURL(translationLocation)}/add`,
          search: `?type=${props.location.state.type}`,
          state: {
            translationOf: props.location.state.translationOf,
            language: props.location.state.language,
          },
        }}
      />
    )
  );
};

export default CreateTranslation;
