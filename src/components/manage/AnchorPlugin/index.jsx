import decorateComponentWithProps from 'decorate-component-with-props';
import { EditorState, Modifier } from 'draft-js';

import DefaultLink from './components/Link';
import LinkButton from './components/LinkButton';
import linkStrategy, { matchesEntityType } from './linkStrategy';
import linkStyles from './linkStyles.module.css';

function removeEntity(editorState) {
  const contentState = editorState.getCurrentContent();
  const selectionState = editorState.getSelection();
  const startKey = selectionState.getStartKey();
  const contentBlock = contentState.getBlockForKey(startKey);
  const startOffset = selectionState.getStartOffset();
  const entity = contentBlock.getEntityAt(startOffset);

  if (!entity) {
    return editorState;
  }

  let entitySelection = null;

  contentBlock.findEntityRanges(
    character => character.getEntity() === entity,
    (start, end) => {
      entitySelection = selectionState.merge({
        anchorOffset: start,
        focusOffset: end,
      });
    },
  );

  const newContentState = Modifier.applyEntity(
    contentState,
    entitySelection,
    null,
  );

  const newEditorState = EditorState.push(
    editorState,
    newContentState,
    'apply-entity',
  );

  return newEditorState;
}

export default (config = {}) => {
  const defaultTheme = linkStyles;

  const { theme = defaultTheme, placeholder, Link, linkTarget } = config;

  return {
    decorators: [
      {
        strategy: linkStrategy,
        matchesEntityType,
        component:
          Link ||
          decorateComponentWithProps(DefaultLink, {
            className: theme.link,
            target: linkTarget,
          }),
      },
    ],

    LinkButton: decorateComponentWithProps(LinkButton, {
      ownTheme: theme,
      placeholder,
      onRemoveLinkAtSelection: (setEditorState, getEditorState) =>
        setEditorState(removeEntity(getEditorState())),
    }),
  };
};
