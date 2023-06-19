import { useSelector, shallowEqual } from 'react-redux';
const vocabulary = 'plone.app.vocabularies.Keywords';

/**
 * useVocabularies hook
 *
 * This hook returns the current vocabulary state that is stored in the Redux store in the
 * `vocabularies` reducer, and returns it along with the related state (items).
 *
 * @export
 * @return {{ data: ContentData, loading: boolean, loaded: boolean, error: Error }}
 */
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
