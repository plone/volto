import React from 'react';

import { connect } from 'react-redux';

import {
  uploadContent,
  saveSlateBlockSelection,
} from '@plone/volto-slate/actions';

import DefaultTextBlockEditor from './DefaultTextBlockEditor';
import DetachedTextBlockEditor from './DetachedTextBlockEditor';

import './css/editor.css';

const TextBlockEdit = (props) => {
  return props.detached ? ( // || props.disableNewBlocks
    <DetachedTextBlockEditor {...props} />
  ) : (
    <DefaultTextBlockEditor {...props} />
  );
};

export default connect(
  (state, props) => {
    const blockId = props.block;
    return {
      defaultSelection: blockId
        ? state.slate_block_selections?.[blockId]
        : null,
      uploadRequest: state.upload_content?.[props.block]?.upload || {},
      uploadedContent: state.upload_content?.[props.block]?.data || {},
    };
  },
  {
    uploadContent,
    saveSlateBlockSelection, // needed as editor blockProps
  },
)(TextBlockEdit);
