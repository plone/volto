import React, { useState } from 'react';
import { Button, Modal } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import { v4 as uuid } from 'uuid';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { setBlocksClipboard } from '@plone/volto/actions/blocksClipboard/blocksClipboard';
import config from '@plone/volto/registry';
import trashSVG from '@plone/volto/icons/delete.svg';
import copySVG from '@plone/volto/icons/copy.svg';
import './save.css';

const messages = defineMessages({
  close: {
    id: 'Close',
    defaultMessage: 'Close',
  },
  copyBlock: {
    id: 'Copy Block',
    defaultMessage: 'Copy Block',
  },
  blockCopied: {
    id: 'Block copied to clipboard',
    defaultMessage: 'Block copied to clipboard',
  },
});

const FavoriteItem = ({ item, onRemove }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const intl = useIntl();
  const dispatch = useDispatch();
  const blockConfig = config.blocks.blocksConfig[item?.type];

  const handleCopy = (e) => {
    e.stopPropagation();
    const blockId = uuid();
    const blocksData = [[blockId, { ...item.data, '@type': item.type }]];
    dispatch(setBlocksClipboard({ copy: blocksData }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      setIsModalOpen(true);
    }
  };

  const renderPreview = () => {
    if (!item?.data) return null;

    if (blockConfig?.view) {
      const BlockView = blockConfig.view;
      return (
        <div className="block-preview rounded-lg border border-gray-200 p-4 hover:shadow-lg transition-shadow duration-200">
          <BlockView data={item.data} mode="view" />
        </div>
      );
    }

    return (
      <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
        <pre className="whitespace-pre-wrap text-sm">
          {JSON.stringify(item.data, null, 2)}
        </pre>
      </div>
    );
  };

  return (
    <>
      <div className="item-card">
        <div className="item-content">
          <div
            className="item-info"
            onClick={() => setIsModalOpen(true)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
          >
            <span className="item-title">{item?.data?.title || 'Block'}</span>
          </div>
          <div className="item-actions">
            <button
              onClick={handleCopy}
              className="action-button"
              title={intl.formatMessage(messages.copyBlock)}
            >
              <Icon name={copySVG} className="action-icon-1" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(item?.id);
              }}
              className="action-button"
            >
              <Icon name={trashSVG} className="action-icon-2" />
            </button>
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className="block-modal"
        size="small"
      >
        <Modal.Header className="bg-gray-50 px-6 py-4 rounded-t-lg border-b border-gray-200 flex items-center gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {item?.data?.title || 'Block'}
            </h3>
            {item?.data?.description && (
              <p className="text-sm text-gray-500 mt-1">
                {item.data.description}
              </p>
            )}
          </div>
        </Modal.Header>
        <Modal.Content className="p-6 bg-white">
          {renderPreview()}
        </Modal.Content>
        <Modal.Actions className="bg-gray-50 px-6 py-4 rounded-b-lg border-t border-gray-200 flex justify-end gap-3">
          <Button
            onClick={handleCopy}
            primary
            className="flex items-center gap-2"
          >
            <Icon name={copySVG} size="16px" />
            {intl.formatMessage(messages.copyBlock)}
          </Button>
          <Button onClick={() => setIsModalOpen(false)}>
            {intl.formatMessage(messages.close)}
          </Button>
        </Modal.Actions>
      </Modal>
    </>
  );
};

export default FavoriteItem;
