import { useSelector, shallowEqual } from 'react-redux';
const vocabulary = 'plone.app.vocabularies.Keywords';

export function useVocabularies() {
  const items = useSelector(
    (state) =>
      state.vocabularies[vocabulary] && state.vocabularies[vocabulary].items
        ? state.vocabularies[vocabulary].items
        : [],
    shallowEqual,
  );

  return items;
}
