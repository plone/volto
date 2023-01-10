import React from 'react';
// import isEqual from 'react-fast-compare';

export default function SaveAsDraft(props) {
  const { state, id, onRestore } = props;
  console.log('id', id);

  const [checked, setChecked] = React.useState(false);
  const ref = React.useRef();

  React.useEffect(() => {
    const jstate = JSON.stringify(state);
    if (!checked) {
      // on mount, we check if saved session exists
      setChecked(true);
      const saved = sessionStorage.getItem(id);
      console.log('saved', saved);
      if (saved && saved !== state) {
        // eslint-disable-next-line no-alert
        const load = window.confirm('Autosave found, load it?');
        if (load) {
          onRestore(JSON.parse(saved));
        } else {
          sessionStorage.removeItem(id);
        }
      }
    } else {
      ref.current && clearTimeout(ref.current);
      ref.current = setTimeout(() => {
        sessionStorage.setItem(id, JSON.stringify(state));
      }, 300);
    }
    return () => {
      const saved = sessionStorage.getItem(id);
      if (saved !== jstate) {
        sessionStorage.setItem(id, JSON.stringify(state));
      }
      ref.current && clearTimeout(ref.current);
    };
  }, [state, id, checked, onRestore]);

  return null;
}
