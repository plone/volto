import React from 'react';
import PropTypes from 'prop-types';
import { Editor, Node, Transforms, createEditor } from 'slate';
import { ReactEditor, Editable, Slate, withReact } from 'slate-react';
import { FormFieldWrapper } from '@plone/volto/components';
import { P } from '@plone/volto-slate/constants';
import cx from 'classnames';

export function TextLineInput(props) {
  const {
    readOnly = false,
    placeholder,
    className,
    as: ViewComponent = 'h1',
    focus,
    getInputProps,
    value,
    onChange,
  } = props;
  const [editor] = React.useState(withReact(createEditor()));

  const renderElement = React.useCallback(
    ({ attributes, children }) => {
      return (
        <ViewComponent {...attributes} className={cx(className)}>
          {children}
        </ViewComponent>
      );
    },
    [className],
  );

  const handleChange = React.useCallback(() => {
    const newText = Node.string(editor);
    if (newText !== value) {
      onChange(newText);
    }
  }, [editor, value, onChange]);

  const [initialValue] = React.useState([
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
      if (editor.selection && Range.isCollapsed(editor.selection)) {
        // keep selection
        ReactEditor.focus(editor);
      } else {
        // nothing is selected, move focus to end
        ReactEditor.focus(editor);
        Transforms.select(editor, Editor.end(editor, []));
      }
    }
  }, [focus, editor]);

  React.useEffect(() => {
    // Because we keep value in internal state, but want to support undo/redo,
    // we need to "protect" the Slate editor and use the Slate api to transform
    // the value
    const oldText = Node.string(editor);
    if (oldText !== value) {
      Transforms.insertText(editor, value, {
        at: [0, 0],
      });
    }
  }, [editor, value]);

  return (
    <Slate editor={editor} onChange={handleChange} value={initialValue}>
      <Editable
        readOnly={readOnly}
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
  as: PropTypes.string,
  className: PropTypes.string,

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
