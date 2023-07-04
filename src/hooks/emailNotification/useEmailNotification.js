import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { emailNotification } from '@plone/volto/actions';
/**
 * useEmailNotification hook
 *
 * This hook returns the current email Notification  that is stored in the Redux store in the
 * `emailNotification` reducer, and returns loading/loaded/error state values.
 *
 * @export
 * @return {{ loading: boolean, loaded: boolean, error: Error }}
 */
export function useEmailNotification() {
  const loading = useSelector((state) => state.emailNotification.loading);
  const loaded = useSelector((state) => state.emailNotification.loaded);
  const error = useSelector((state) => state.emailNotification.error);

  return { loading, loaded, error };
}

/**
 *
 * @param {string} pathname
 * @todo Support URL object being passed in here
 */
export function useGetEmailNotification(data) {
  const dispatch = useDispatch();
  const mutate = useCallback(
    (data) => {
      const { from, message, name, subject } = data;
      dispatch(emailNotification(from, message, name, subject));
    },
    [dispatch],
  );
  return {
    emailNotification: mutate,
  };
}
