import React from 'react';
import { LinkMore } from '@plone/volto/components';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';

const messages = defineMessages({
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
});

const HeroText = ({
  data,
  draftJs,
  isEditMode,
  titleEditor,
  titleEditorState,
  extendedBlockRenderMap,
  extendedDescripBlockRenderMap,
  changeCurrentFocus,
  descriptionEditor,
  descriptionEditorState,
  editable,
  onChangeTitle,
  onChangeDescription,
  onFocusPreviousBlock,
  block,
  blockNode,
  onFocusNextBlock,
  withBackgroundImage,
}) => {
  const intl = useIntl();
  let Editor = null;
  if (isEditMode) {
    Editor = draftJs.Editor;
  }
  return (
    <div
      className={cx(
        'hero-body',
        withBackgroundImage && data.url ? 'withBackgroundImage' : '',
      )}
    >
      <div className="hero-text">
        {isEditMode ? (
          <>
            <Editor
              ref={titleEditor}
              readOnly={!editable}
              onChange={onChangeTitle}
              editorState={titleEditorState}
              blockRenderMap={extendedBlockRenderMap}
              handleReturn={() => true}
              placeholder={intl.formatMessage(messages.title)}
              blockStyleFn={() => 'title-editor'}
              onUpArrow={() => {
                const selectionState = titleEditorState.getSelection();
                if (
                  titleEditorState
                    .getCurrentContent()
                    .getBlockMap()
                    .first()
                    .getKey() === selectionState.getFocusKey()
                ) {
                  onFocusPreviousBlock(block, blockNode.current);
                }
              }}
              onDownArrow={() => {
                const selectionState = titleEditorState.getSelection();
                if (
                  titleEditorState
                    .getCurrentContent()
                    .getBlockMap()
                    .last()
                    .getKey() === selectionState.getFocusKey()
                ) {
                  changeCurrentFocus('description');
                  descriptionEditor.current.focus();
                }
              }}
            />
            <Editor
              ref={descriptionEditor}
              readOnly={!editable}
              onChange={onChangeDescription}
              editorState={descriptionEditorState}
              blockRenderMap={extendedDescripBlockRenderMap}
              handleReturn={() => true}
              placeholder={intl.formatMessage(messages.description)}
              blockStyleFn={() => 'description-editor'}
              onUpArrow={() => {
                const selectionState = descriptionEditorState.getSelection();
                const currentCursorPosition = selectionState.getStartOffset();

                if (currentCursorPosition === 0) {
                  changeCurrentFocus('title');
                  titleEditor.current.focus();
                }
              }}
              onDownArrow={() => {
                const selectionState = descriptionEditorState.getSelection();
                const currentCursorPosition = selectionState.getStartOffset();
                const blockLength = descriptionEditorState
                  .getCurrentContent()
                  .getFirstBlock()
                  .getLength();

                if (currentCursorPosition === blockLength) {
                  onFocusNextBlock(block, blockNode.current);
                }
              }}
            />
          </>
        ) : (
          <>
            {data.title && <h1>{data.title}</h1>}
            {data.description && <p>{data.description}</p>}
          </>
        )}
      </div>
      <LinkMore data={data} isEditMode={isEditMode} />
    </div>
  );
};

export default HeroText;
