import React from 'react';

/**
 * useOutsideClick hook
 * It detects clicks outside the ref element
 * and executes callback if the event is fired.
 *
 * @export
 * @param {*} ref
 * @param {*} callback
 */
export default function useOutsideClick(ref, callback) {
  function handleClickOutside(event) {
    if (ref.current && !ref.current.contains(event.target)) {
      callback(event);
    }
  }

  React.useEffect(() => {
    document.body.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.body.removeEventListener('mousedown', handleClickOutside);
    };
  });
}
