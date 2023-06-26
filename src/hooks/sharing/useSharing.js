import { useSelector, shallowEqual } from 'react-redux';

/**
 * useSharing hook
 *
 * This hook returns the current share state that is stored in the Redux store in the
 * `sharing` reducer, and returns it along with the related state (entries/inherit/available_roles/updateRequest).
 *
 * @export
 * @return {{ entries,inherit,available_roles,updateRequest}}
 */

export function useSharing() {
  const entries = useSelector(
    (state) => state.sharing.data.entries,
    shallowEqual,
  );
  const inherit = useSelector((state) => state.sharing.data.inherit);
  const available_roles = useSelector(
    (state) => state.sharing.data.available_roles,
  );
  const updateRequest = useSelector(
    (state) => state.sharing.update,
    shallowEqual,
  );

  return { entries, inherit, available_roles, updateRequest };
}
