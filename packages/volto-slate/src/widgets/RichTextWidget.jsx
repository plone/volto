/**
 * A Slate widget that uses internal JSON representation as its value
 *
 */

import React from 'react';
import isUndefined from 'lodash/isUndefined';
import isString from 'lodash/isString';
import { FormFieldWrapper } from '@plone/volto/components/manage/Widgets';
import SlateEditor from '@plone/volto-slate/editor/SlateEditor';

import { createEmptyParagraph, createParagraph } from '../utils/blocks';

import './style.css';

const getValue = (value) => {
  if (isUndefined(value) || !isUndefined(value?.data)) {
    return [createEmptyParagraph()];
  }
  // Previously this was a text field
  if (isString(value)) {
    return [createParagraph(value)];
  }
  return value;
};

const SlateRichTextWidget = (props) => {
  const {
    id,
    onChange,
    value,
    focus,
    className,
    block,
    placeholder,
    properties,
    readOnly = false,
  } = props;
  const [selected, setSelected] = React.useState(focus);

  return (
    <FormFieldWrapper {...props} draggable={false} className="slate_wysiwyg">
      <div
        className="slate_wysiwyg_box"
        role="textbox"
        tabIndex="-1"
        style={{ boxSizing: 'initial' }}
        onClick={() => {
          setSelected(true);
        }}
        onKeyDown={() => {}}
      >
        <SlateEditor
          className={className}
          readOnly={readOnly}
          id={id}
          name={id}
          value={getValue(value)}
          onChange={(newValue) => {
            onChange(id, newValue);
          }}
          block={block}
          selected={selected}
          properties={properties}
          placeholder={placeholder}
        />
      </div>
    </FormFieldWrapper>
  );
};

export default SlateRichTextWidget;
