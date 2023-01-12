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

const getFormId = (props) => {
  const { type, pathname, isEditForm } = props;

  const id = isEditForm
    ? ['form', type, pathname].join('-')
    : type
    ? ['form', 'add', type].join('-')
    : ['form', pathname].join('-');

  return id;
};

export function withSaveAsDraft(options) {
  const { forwardRef } = options;

  return (WrappedComponent) => {
    function WithSaveAsDraft(props) {
      const { schema } = props;
      const id = getFormId(props);

      const ref = React.useRef();

      const api = React.useMemo(
        () => ({
          checkSavedDraft(state) {
            if (!schema) return;
            const saved = localStorage.getItem(id);
            if (saved) {
              const formData = mapSchemaToData(schema, state);
              const savedData = JSON.parse(saved);
              if (!isEqual(formData, savedData)) {
                // eslint-disable-next-line no-alert
                const rewrite = window.confirm('Autosave found, load it?');
                localStorage.removeItem(id);
                return rewrite ? savedData : null;
              }
            }
          },
          onSaveDraft(state) {
            if (!schema) return;
            ref.current && clearTimeout(ref.current);
            ref.current = setTimeout(() => {
              const formData = mapSchemaToData(schema, state);
              localStorage.setItem(id, JSON.stringify(formData));
            }, 300);
          },
          onCancelDraft() {
            if (!schema) return;
            localStorage.removeItem(id);
          },
        }),
        [id, schema],
      );

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
