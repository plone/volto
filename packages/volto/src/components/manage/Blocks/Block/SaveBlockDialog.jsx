import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Modal, Input, Header } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { addToFavorites } from '@plone/volto/actions/favorites/favorites';
import config from '@plone/volto/registry';

const messages = defineMessages({
  saveBlock: {
    id: 'Save Block',
    defaultMessage: 'Save Block',
  },
  enterName: {
    id: 'Enter a name for this block',
    defaultMessage: 'Enter a name for this block',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
});

const SaveBlockDialog = ({ block, type, data, isOpen, onClose }) => {
  const intl = useIntl();
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  const handleSave = () => {
    const blockConfig = config.blocks.blocksConfig[type];
    const blockData = {
      id: block,
      type: type,
      data: {
        ...data,
        '@type': type,
        title: name,
      },
    };

    if (blockConfig?.cloneData) {
      blockData.data = blockConfig.cloneData(blockData.data)[1];
    }
    dispatch(addToFavorites(blockData));
    setName('');
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} size="tiny">
      <Header content={intl.formatMessage(messages.saveBlock)} />
      <Modal.Content>
        <Input
          fluid
          placeholder={intl.formatMessage(messages.enterName)}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={onClose}>{intl.formatMessage(messages.cancel)}</Button>
        <Button primary onClick={handleSave} disabled={!name.trim()}>
          {intl.formatMessage(messages.save)}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default SaveBlockDialog;
