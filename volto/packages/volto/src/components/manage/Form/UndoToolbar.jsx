import React from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { Plug } from '@plone/volto/components/manage/Pluggable';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { Button } from 'semantic-ui-react';
import useUndoManager from '@plone/volto/helpers/UndoManager/useUndoManager';
import config from '@plone/volto/registry';

import undoSVG from '@plone/volto/icons/undo.svg';
import redoSVG from '@plone/volto/icons/redo.svg';

const messages = defineMessages({
  undo: {
    id: 'Undo',
    defaultMessage: 'Undo',
  },
  redo: {
    id: 'Redo',
    defaultMessage: 'Redo',
  },
});

const UndoToolbar = ({ state, onUndoRedo, maxUndoLevels, enableHotKeys }) => {
  const intl = useIntl();
  const undoLevels = maxUndoLevels ?? config.settings.maxUndoLevels;
  const { doUndo, doRedo, canUndo, canRedo } = useUndoManager(
    state,
    onUndoRedo,
    {
      maxUndoLevels: undoLevels,
    },
  );

  return (
    <>
      <Plug
        pluggable="main.toolbar.bottom"
        id="undo-btn"
        dependencies={[canUndo, canRedo]}
      >
        <Button
          className="undo"
          onClick={() => doUndo()}
          aria-label={intl.formatMessage(messages.undo)}
          disabled={!canUndo}
        >
          <Icon
            name={undoSVG}
            className="circled"
            size="30px"
            title={intl.formatMessage(messages.undo)}
          />
        </Button>
      </Plug>
      <Plug
        pluggable="main.toolbar.bottom"
        id="redo-btn"
        dependencies={[canUndo, canRedo]}
      >
        <Button
          className="redo"
          onClick={() => doRedo()}
          aria-label={intl.formatMessage(messages.redo)}
          disabled={!canRedo}
        >
          <Icon
            name={redoSVG}
            className="circled"
            size="30px"
            title={intl.formatMessage(messages.redo)}
          />
        </Button>
      </Plug>
    </>
  );
};

export default UndoToolbar;
