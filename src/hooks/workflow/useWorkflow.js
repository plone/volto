import { useSelector, shallowEqual } from 'react-redux';
import { getCurrentStateMapping } from '@plone/volto/helpers';
/**
 * useWorkflow hook
 *
 * This hook returns the current workflow that is stored in the Redux store in the
 * `workflow` reducer, and returns it along with the related state (loaded/history/transitions).
 *
 * @export
 * @return {{ loaded , history ,transitions ,currentStateValue }}
 */
export function useWorkflow() {
  const history = useSelector((state) => state.workflow.history, shallowEqual);
  const transitions = useSelector(
    (state) => state.workflow.transitions,
    shallowEqual,
  );
  const loaded = useSelector((state) => state.workflow.transition.loaded);
  const currentStateValue = useSelector(
    (state) => getCurrentStateMapping(state.workflow.currentState),
    shallowEqual,
  );

  return { loaded, history, transitions, currentStateValue };
}
