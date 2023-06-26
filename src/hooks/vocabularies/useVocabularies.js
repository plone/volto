import { useSelector, shallowEqual } from 'react-redux';

/**
 * useVocabularies hook
 *
 * This hook returns the current vocabulary state that is stored in the Redux store in the
 * `vocabularies` reducer, and returns it along with the related state (items).
 *
 * @export
 * @return {{ items }}
 */
export function useVocabularies(vocabulary = '') {
  const items = useSelector(
    (state) =>
      state.vocabularies[vocabulary] && state.vocabularies[vocabulary].items
        ? state.vocabularies[vocabulary].items
        : [],
    shallowEqual,
  );

  return items;
}
