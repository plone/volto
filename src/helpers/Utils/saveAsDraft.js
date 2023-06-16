import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import isEqual from 'react-fast-compare';

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

const mapSchemaToData = (schema, data) => {
  const dataKeys = Object.keys(data);
  return Object.assign(
    {},
    ...Object.keys(schema.properties)
      .filter((k) => dataKeys.includes(k))
      .map((k) => ({ [k]: data[k] })),
  );
};

// use let instead of useRef beause it's faster
// useRef is a synchronous hook, in case of concomitant calls
// it can be a problem if we need to change the value, it will show old one
let shouldRewrite = undefined;

const getFormId = (props) => {
  const { type, pathname, isEditForm } = props;
  const id = isEditForm
    ? ['form', type, pathname].join('-')
    : type
    ? ['form', pathname, type].join('-')
    : ['form', pathname].join('-');

  return id;
};

const draftApi = (id, schema, timer, timerForDeletion) => ({
  // will be used on componentDidUpdate
  // on each update including refresh
  checkSavedDraft(state) {
    if (!schema) return;
    const saved = localStorage.getItem(id);
    if (saved) {
      const formData = mapSchemaToData(schema, state);
      const savedData = JSON.parse(saved);

      if (!isEqual(formData, savedData)) {
        if (shouldRewrite === undefined) {
          shouldRewrite = window.confirm('Autosave found, load it?');
        }

        return shouldRewrite ? savedData : null;
      }
    }
  },

  // will be used for componentDidMount
  // but not on refresh because then it will not have schema
  // will delete localStorage data if user selects cancel
  // for Add componentDidMount will call it twice, use let shouldRewrite
  // because it's sync and will not show confirm again (useRef is async)
  // Delete data only if user confirms Cancel, because otherwise it will be added
  // on each update anyway, but can create problems on checks on successive updates
  checkSavedDraftMounted(state) {
    if (!schema) return;
    const saved = localStorage.getItem(id);

    if (saved) {
      const formData = mapSchemaToData(schema, state);
      const savedData = JSON.parse(saved);

      if (!isEqual(formData, savedData)) {
        // eslint-disable-next-line no-alert
        if (shouldRewrite === undefined) {
          shouldRewrite = window.confirm('Autosave found, load it?');
        }
        // change back to undefined to avoid consecutive call
        // (Add) and to be able to show it on refresh
        setTimeout(() => {
          shouldRewrite = undefined;
        }, 500);

        if (shouldRewrite) {
          return savedData;
        } else {
          timerForDeletion.current && clearTimeout(timerForDeletion.current);
          timerForDeletion.current = setTimeout(() => {
            localStorage.removeItem(id);
            shouldRewrite = undefined;
          }, 500);
          return null;
        }
      }
    }
  },

  onSaveDraft(state) {
    if (!schema) return;
    timer.current && clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      const formData = mapSchemaToData(schema, state);
      localStorage.setItem(id, JSON.stringify(formData));
    }, 300);
  },

  onCancelDraft() {
    if (!schema) return;
    localStorage.removeItem(id);
  },
});

export function withSaveAsDraft(options) {
  const { forwardRef } = options;

  return (WrappedComponent) => {
    function WithSaveAsDraft(props) {
      const { schema } = props;
      const id = getFormId(props);
      const ref = React.useRef();
      const ref2 = React.useRef();
      const api = React.useMemo(() => draftApi(id, schema, ref, ref2), [
        id,
        schema,
      ]);

      return (
        <WrappedComponent
          {...props}
          {...api}
          ref={forwardRef ? props.forwardedRef : null}
        />
      );
    }

    WithSaveAsDraft.displayName = `WithSaveAsDraft(${getDisplayName(
      WrappedComponent,
    )})`;

    if (forwardRef) {
      return hoistNonReactStatics(
        React.forwardRef((props, ref) => (
          <WithSaveAsDraft {...props} forwardedRef={ref} />
        )),
        WrappedComponent,
      );
    }

    return hoistNonReactStatics(WithSaveAsDraft, WrappedComponent);
  };
}
