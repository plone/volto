/* eslint no-console: ["error", { allow: ["error"] }] */
import { isEqual } from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import { ReactEditor } from 'slate-react';
import { Icon as VoltoIcon, BlockDataForm } from '@plone/volto/components';
import { setPluginOptions } from '@plone/volto-slate/actions';
import BaseSchemaProvider from './SchemaProvider';

import briefcaseSVG from '@plone/volto/icons/briefcase.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

const PluginEditor = (props) => {
  const {
    editor,
    schemaProvider,
    pluginId,
    getActiveElement,
    isActiveElement,
    insertElement,
    unwrapElement,
    hasValue,
    onChangeValues,
  } = props;

  const dispatch = useDispatch();
  const [formData, setFormData] = React.useState({});

  const active = getActiveElement(editor);

  if (!active) {
    console.error('Active element not found, this will crash');
  }
  const [elementNode] = active;
  const isElement = isActiveElement(editor);

  // Update the form data based on the current element
  const elRef = React.useRef(null);

  if (isElement && !isEqual(elementNode, elRef.current)) {
    elRef.current = elementNode;
    setFormData(elementNode.data || {});
  } else if (!isElement) {
    elRef.current = null;
  }

  const saveDataToEditor = React.useCallback(
    (formData) => {
      if (hasValue(formData)) {
        // hasValue(formData) = !!formData.footnote
        insertElement(editor, formData);
      } else {
        unwrapElement(editor);
      }
    },
    [editor, insertElement, unwrapElement, hasValue],
  );

  const checkForCancel = () => {
    if (!hasValue(elementNode.data)) {
      unwrapElement(editor);
    }
  };

  const SchemaProvider = schemaProvider ? schemaProvider : BaseSchemaProvider;

  const pid = `${editor.uid}-${pluginId}`;
  return (
    <SchemaProvider {...props} data={formData}>
      {(schema) => (
        <BlockDataForm
          schema={schema}
          title={schema.title}
          icon={<VoltoIcon size="24px" name={briefcaseSVG} />}
          onChangeField={(id, value) => {
            if (!onChangeValues) {
              return setFormData({
                ...formData,
                [id]: value,
              });
            }
            return onChangeValues(id, value, formData, setFormData);
          }}
          onChangeFormData={setFormData}
          formData={formData}
          headerActions={
            <>
              <button
                onClick={() => {
                  saveDataToEditor(formData);
                  dispatch(
                    setPluginOptions(pid, {
                      show_sidebar_editor: false,
                    }),
                  );
                  ReactEditor.focus(editor);
                }}
              >
                <VoltoIcon size="24px" name={checkSVG} />
              </button>
              <button
                onClick={() => {
                  checkForCancel();
                  dispatch(
                    setPluginOptions(pid, {
                      show_sidebar_editor: false,
                    }),
                  );
                  setFormData({});
                  ReactEditor.focus(editor);
                }}
              >
                <VoltoIcon size="24px" name={clearSVG} />
              </button>
            </>
          }
        />
      )}
    </SchemaProvider>
  );
};

export default PluginEditor;
