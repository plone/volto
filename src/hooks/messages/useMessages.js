import { useSelector, shallowEqual } from 'react-redux';

/**
 * useMessages hook
 *
 * This hook returns the current messages that is stored in the Redux store in the
 * `messages` reducer, and returns it along with the related state (messages).
 *
 * @export
 * @return {{ messages }}
 */
export function useMessages() {
  const messages = useSelector(
    (state) => state.messages.messages,
    shallowEqual,
  );

  return messages;
}
