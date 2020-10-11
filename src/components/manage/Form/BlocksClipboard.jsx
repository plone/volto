import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Portal } from 'react-portal';
import {
  messages,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import { blocks } from '~/config';
import { v4 as uuid } from 'uuid';

import { setBlocksClipboard, resetBlocksClipboard } from '@plone/volto/actions';

import copySVG from '@plone/volto/icons/copy.svg';
import pasteSVG from '@plone/volto/icons/paste.svg';

class BlockClipboardHandler extends React.Component {
  copyBlocksToClipboard = () => {
    const { formData } = this.props;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocks = formData[blocksFieldname];
    const blocksData = this.props.selectedBlocks.map(
      (blockId) => blocks[blockId],
    );
    this.props.setBlocksClipboard(blocksData);
    this.props.onSetSelectedBlocks([]);
  };

  pasteBlocks = () => {
    const blocksData = this.props.blocksClipboard;
    const cloneWithIds = blocksData
      .filter((blockData) => !!blockData['@type'])
      .map((blockData) => {
        const blockConfig = blocks.blocksConfig[blockData['@type']];
        return blockConfig.cloneData
          ? blockConfig.cloneData(blockData) // returns [blockId, blockData]
          : [uuid(), blockData];
      })
      .filter((info) => !!info); // some blocks may refuse to be copied
    const { formData } = this.props;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const selectedIndex =
      formData[blocksLayoutFieldname].items.indexOf(this.props.selectedBlock) +
      1;

    const newBlockData = {
      [blocksFieldname]: {
        ...formData[blocksFieldname],
        ...Object.assign(
          {},
          ...cloneWithIds.map(([id, data]) => ({ [id]: data })),
        ),
      },
      [blocksLayoutFieldname]: {
        ...formData[blocksLayoutFieldname],
        items: [
          ...formData[blocksLayoutFieldname].items.slice(0, selectedIndex),
          ...cloneWithIds.map(([id]) => id),
          ...formData[blocksLayoutFieldname].items.slice(selectedIndex),
        ],
      },
    };

    this.props.resetBlocksClipboard();
    this.props.onChangeBlocks(newBlockData);
  };

  render() {
    return (
      <>
        {this.props.selectedBlock && this.props.selectedBlocks.length > 0 ? (
          <Portal
            node={
              __CLIENT__ && document.querySelector('#toolbar .toolbar-actions')
            }
          >
            <button
              aria-label={this.props.intl.formatMessage(messages.copyBlocks)}
              onClick={this.copyBlocksToClipboard}
              tabIndex={0}
              className="copyBlocks"
              id="toolbar-copy-blocks"
            >
              <Icon name={copySVG} size="30px" className="circled" />
            </button>
          </Portal>
        ) : (
          ''
        )}
        {this.props.selectedBlock && this.props.blocksClipboard.length > 0 ? (
          <Portal
            node={
              __CLIENT__ && document.querySelector('#toolbar .toolbar-actions')
            }
          >
            <button
              aria-label={this.props.intl.formatMessage(messages.pasteBlocks)}
              onClick={this.pasteBlocks}
              tabIndex={0}
              className="pasteBlocks"
              id="toolbar-paste-blocks"
            >
              <Icon name={pasteSVG} size="30px" className="circled" />
            </button>
          </Portal>
        ) : (
          ''
        )}
      </>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state) => {
      return {
        blocksClipboard: state?.blocksClipboard?.blocksData || [],
      };
    },
    { setBlocksClipboard, resetBlocksClipboard },
  ),
)(BlockClipboardHandler);
