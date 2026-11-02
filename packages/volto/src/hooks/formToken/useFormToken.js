import { useCallback, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { getFormToken } from '@plone/volto/actions/formToken/formToken';

/**
 * A single-use token for a form, from the @form-token endpoint of
 * plone.restapi, which makes bots wait: the backend only accepts the token
 * once it is `min_age` seconds old.
 *
 * `wait()` resolves with the token as soon as the backend accepts it, or with
 * null when the backend has no form tokens. The backend uses up the token with
 * each submission, so call `refresh()` after one.
 * @function useFormToken
 * @param {string} url Content url.
 * @returns {Object} The `wait` and `refresh` functions.
 */
const useFormToken = (url = '') => {
  const dispatch = useDispatch();
  const request = useRef(null);

  const refresh = useCallback(() => {
    request.current = Promise.resolve(dispatch(getFormToken(url)))
      .then((result) =>
        result?.token
          ? {
              token: result.token,
              // From when it arrives: the backend issued it before that.
              usable: Date.now() + (result.min_age ?? 0) * 1000,
            }
          : null,
      )
      // Without form tokens, the endpoint is not there or answers 503.
      .catch(() => null);
  }, [dispatch, url]);

  // Only in the browser: a token in the server-side render would end up in
  // shared caches.
  useEffect(() => {
    refresh();
  }, [refresh]);

  const wait = useCallback(
    () =>
      (request.current ?? Promise.resolve(null)).then((formToken) =>
        formToken
          ? new Promise((resolve) =>
              setTimeout(
                () => resolve(formToken.token),
                Math.max(0, formToken.usable - Date.now()),
              ),
            )
          : null,
      ),
    [],
  );

  return { wait, refresh };
};

export default useFormToken;
