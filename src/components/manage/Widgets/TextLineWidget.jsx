import React, { useCallback, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { Editor, Node, Transforms, Range, createEditor } from 'slate';
import { ReactEditor, Editable, Slate, withReact } from 'slate-react';
import { FormFieldWrapper } from '@plone/volto/components';
import { P } from '@plone/volto-slate/constants';
import cx from 'classnames';

export function TextLineInput(props) {
  const {
    editable = true,
    placeholder,
    renderClassName,
    renderTag: RenderTag = 'h1',
    focus,
    getInputProps,
    value,
    onChange,
  } = props;
  const [editor] = useState(withReact(createEditor()));

  const renderElement = useCallback(
    ({ attributes, children }) => {
      return (
        <RenderTag {...attributes} className={cx(renderClassName)}>
          {children}
        </RenderTag>
      );
    },
    [renderClassName],
  );

  const handleChange = useCallback(() => {
    const newText = Node.string(editor);
    if (newText !== value) {
      onChange(newText);
    }
  }, [editor, value, onChange]);

  const [initialValue] = useState([
    {
      type: P,
      children: [
        {
          text: value,
        },
      ],
    },
  ]);

  React.useEffect(() => {
    // autofocus and move caret to end
    if (focus) {
      ReactEditor.focus(editor);
      Transforms.select(editor, Editor.end(editor, []));
    }
  }, [focus, editor]);

  return (
    <Slate editor={editor} onChange={handleChange} value={initialValue}>
      <Editable
        readOnly={!editable}
        placeholder={placeholder}
        renderElement={renderElement}
        aria-multiline="false"
        {...(getInputProps ? getInputProps() : {})}
      ></Editable>
    </Slate>
  );
}

export default function TextLineWidget(props) {
  const { id, value, onChange, placeholder, ...rest } = props;
  return (
    <FormFieldWrapper {...props} className="textline">
      <TextLineInput
        {...rest}
        id={`field-${id}`}
        name={id}
        value={value || ''}
        disabled={props.isDisabled}
        placeholder={placeholder}
        onChange={(value) => onChange(id, value === '' ? undefined : value)}
      />
    </FormFieldWrapper>
  );
}

TextLineWidget.propTypes = {
  renderTag: PropTypes.string,
  renderClassName: PropTypes.string,

  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  maxLength: PropTypes.number,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  onChange: PropTypes.func,
  // onEdit: PropTypes.func,
  // onDelete: PropTypes.func,
  wrapped: PropTypes.bool,
  placeholder: PropTypes.string,
};
