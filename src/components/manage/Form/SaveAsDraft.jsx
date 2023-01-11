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

export default function withSaveAsDraft(options) {
  const { forwardRef } = options;

  return (WrappedComponent) => {
    function WithSaveAsDraft(props) {
      const { type, pathname, schema, isEditForm } = props;

      const id = `form-edit-${type}-${pathname}`;
      const ref = React.useRef();

      const checkSavedDraft = React.useCallback(
        (state) => {
          if (!schema && !isEditForm) return;
          const saved = localStorage.getItem(id);
          if (saved) {
            const formData = mapSchemaToData(schema, state);
            const savedData = JSON.parse(saved);
            if (!isEqual(formData, savedData)) {
              // eslint-disable-next-line no-alert
              const rewrite = window.confirm('Autosave found, load it?');
              if (rewrite) {
                localStorage.removeItem(id);
                return savedData;
              } else {
                localStorage.removeItem(id);
              }
            }
          }
        },
        [id, schema, isEditForm],
      );

      const onSaveDraft = React.useCallback(
        (state) => {
          if (!schema) return;
          ref.current && clearTimeout(ref.current);
          ref.current = setTimeout(() => {
            const formData = mapSchemaToData(schema, state);
            localStorage.setItem(id, JSON.stringify(formData));
          }, 300);
        },
        [id, schema],
      );

      const onCancelDraft = React.useCallback(() => {
        if (!schema) return;
        localStorage.removeItem(id);
      }, [id, schema]);

      return (
        <WrappedComponent
          {...props}
          ref={forwardRef ? props.forwardedRef : null}
          checkSavedDraft={checkSavedDraft}
          onSaveDraft={onSaveDraft}
          onCancelDraft={onCancelDraft}
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
