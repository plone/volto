/**
 * A Slate widget that uses internal JSON representation as its value
 *
 */

import React from 'react';
import { FormFieldWrapper } from '@plone/volto/components';
import SlateEditor from 'volto-slate/editor/SlateEditor';

import { createEmptyParagraph } from '../utils/blocks';

import './style.css';

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
          value={
            typeof value === 'undefined' ||
            typeof value?.data !==
              'undefined' /* previously this was a Draft block */
              ? [createEmptyParagraph()]
              : value
          }
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
