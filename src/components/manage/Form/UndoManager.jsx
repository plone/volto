import React from 'react';
import { useIntl } from 'react-intl';
import { Portal } from 'react-portal';
import { messages } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import produce, { applyPatches } from 'immer';

import undoSVG from '@plone/volto/icons/undo.svg';
import redoSVG from '@plone/volto/icons/redo.svg';

function UndoManager(props) {
  const { formstate } = props;
  const intl = useIntl();
  // const [history, setHistory] = React.useState();
  //
  const history = React.useState([]);
  React.useEffect(() => {
    const nextState = produce(formstate, (draft) => {
      draft.value = formstate;
    });
    console.log('next', nextState);
  });
  return (
    <Portal
      node={__CLIENT__ && document.querySelector('#toolbar .toolbar-actions')}
    >
      <button
        aria-label={intl.formatMessage(messages.undo)}
        onClick={() => {}}
        tabIndex={0}
        className="undoForm"
        id="toolbar-undo"
      >
        <Icon name={undoSVG} size="30px" />
      </button>
      <button
        aria-label={intl.formatMessage(messages.redo)}
        onClick={() => {}}
        tabIndex={0}
        className="redoForm"
        id="toolbar-redo"
      >
        <Icon name={redoSVG} size="30px" />
      </button>
    </Portal>
  );
}

export default UndoManager;
