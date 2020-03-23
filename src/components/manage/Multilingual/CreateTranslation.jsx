import React from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getTranslationLocator } from '@plone/volto/actions';
import { flattenToAppURL } from '@plone/volto/helpers';

const CreateTranslation = props => {
  const dispatch = useDispatch();
  const translationLocation = useSelector(
    state => state.translations.translationLocation,
  );

  React.useEffect(() => {
    dispatch(
      getTranslationLocator(
        props.location.state.translationOf,
        props.location.state.language,
      ),
    );
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
