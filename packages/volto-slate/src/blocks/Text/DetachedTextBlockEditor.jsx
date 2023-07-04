import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useInView } from 'react-intersection-observer';
import { SlateEditor } from '@plone/volto-slate/editor';
import { serializeNodesToText } from '@plone/volto-slate/editor/render';
import { handleKeyDetached } from './keyboard';

const DEBUG = false;

const messages = defineMessages({
  text: {
    id: 'Type text…',
    defaultMessage: 'Type text…',
  },
});

export const DetachedTextBlockEditor = (props) => {
  const {
    data,
    index,
    properties,
    onSelectBlock,
    onChangeBlock,
    block,
    selected,
    formTitle,
    formDescription,
  } = props;
  const { value } = data;

  const intl = useIntl();
  const placeholder =
    data.placeholder || formTitle || intl.formatMessage(messages.text);
  let instructions = data?.instructions?.data || data?.instructions;
  if (!instructions || instructions === '<p><br/></p>') {
    instructions = formDescription;
  }

  const { ref, inView } = useInView({
    threshold: 0,
    rootMargin: '0px 0px 200px 0px',
  });

  return (
    <div className="text-slate-editor-inner detached-slate-editor" ref={ref}>
      <SlateEditor
        index={index}
        readOnly={!inView}
        properties={properties}
        renderExtensions={[]}
        value={value}
        block={block /* is this needed? */}
        debug={DEBUG}
        slateSettings={props.slateSettings}
        onFocus={() => {
          if (!selected) {
            onSelectBlock(block);
          }
        }}
        onChange={(value, selection, editor) => {
          onChangeBlock(block, {
            ...data,
            value,
            plaintext: serializeNodesToText(value || []),
            // TODO: also add html serialized value
          });
        }}
        selected={selected}
        placeholder={placeholder}
        onKeyDown={handleKeyDetached}
        editableProps={{ 'aria-multiline': 'true' }}
      />
    </div>
  );
};

export default DetachedTextBlockEditor;
