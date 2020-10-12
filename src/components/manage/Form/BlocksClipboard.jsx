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
import { v4 as uuid } from 'uuid';
import { load } from 'redux-localstorage-simple';
import { isEqual, omit, without } from 'lodash';

import { setBlocksClipboard, resetBlocksClipboard } from '@plone/volto/actions';
import { blocks } from '~/config';

import copySVG from '@plone/volto/icons/copy.svg';
import cutSVG from '@plone/volto/icons/cut.svg';
import pasteSVG from '@plone/volto/icons/paste.svg';

class BlockClipboardHandler extends React.Component {
  loadFromStorage = () => {
    const clipboard = load({ states: ['blocksClipboard'] })?.blocksClipboard;
    if (!isEqual(clipboard, this.props.blocksClipboard))
      this.props.setBlocksClipboard(clipboard);
  };

  componentDidMount() {
    window.addEventListener('storage', this.loadFromStorage, true);
  }

  componentWillUnmount() {
    window.removeEventListener('storage', this.loadFromStorage);
  }

  copyBlocksToClipboard = () => {
    this.setBlocksClipboard('copy');
  };

  cutBlocksToClipboard = () => {
    const blockIds = this.props.selectedBlocks;

    const { formData } = this.props;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);

    // Might need ReactDOM.unstable_batchedUpdates()
    this.setBlocksClipboard('cut');
    this.props.onSelectBlock(null);
    const newBlockData = {
      [blocksFieldname]: omit(formData[blocksFieldname], blockIds),
      [blocksLayoutFieldname]: {
        ...formData[blocksLayoutFieldname],
        items: without(formData[blocksLayoutFieldname].items, ...blockIds),
      },
    };
    this.props.onChangeBlocks(newBlockData);
  };

  setBlocksClipboard = (actionType) => {
    const { formData } = this.props;
    const blocksFieldname = getBlocksFieldname(formData);
    const blocks = formData[blocksFieldname];
    const blocksData = this.props.selectedBlocks.map(
      (blockId) => blocks[blockId],
    );
    this.props.setBlocksClipboard({ [actionType]: blocksData });
    this.props.onSetSelectedBlocks([]);
  };

  pasteBlocks = () => {
    const { formData, blocksClipboard = {}, selectedBlock } = this.props;
    const mode = Object.keys(blocksClipboard).includes('cut') ? 'cut' : 'copy';
    const blocksData = blocksClipboard[mode] || [];
    const cloneWithIds = blocksData
      .filter((blockData) => !!blockData['@type'])
      .map((blockData) => {
        const blockConfig = blocks.blocksConfig[blockData['@type']];
        return mode === 'copy'
          ? blockConfig.cloneData
            ? blockConfig.cloneData(blockData)
            : [uuid(), blockData]
          : [uuid(), blockData]; // if cut/pasting blocks, we don't clone
      })
      .filter((info) => !!info); // some blocks may refuse to be copied
    const blocksFieldname = getBlocksFieldname(formData);
    const blocksLayoutFieldname = getBlocksLayoutFieldname(formData);
    const selectedIndex =
      formData[blocksLayoutFieldname].items.indexOf(selectedBlock) + 1;

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
    const {
      blocksClipboard = {},
      selectedBlock,
      selectedBlocks,
      intl,
    } = this.props;
    return (
      <>
        {selectedBlock && selectedBlocks.length > 0 ? (
          <Portal
            node={
              __CLIENT__ && document.querySelector('#toolbar .toolbar-actions')
            }
          >
            <button
              aria-label={intl.formatMessage(messages.copyBlocks)}
              onClick={this.copyBlocksToClipboard}
              tabIndex={0}
              className="copyBlocks"
              id="toolbar-copy-blocks"
            >
              <Icon name={copySVG} size="30px" className="circled" />
            </button>
            <button
              aria-label={intl.formatMessage(messages.cutBlocks)}
              onClick={this.cutBlocksToClipboard}
              tabIndex={0}
              className="cutBlocks"
              id="toolbar-cut-blocks"
            >
              <Icon name={cutSVG} size="30px" className="circled" />
            </button>
          </Portal>
        ) : (
          ''
        )}
        {selectedBlock && (blocksClipboard?.cut || blocksClipboard?.copy) ? (
          <Portal
            node={
              __CLIENT__ && document.querySelector('#toolbar .toolbar-actions')
            }
          >
            <button
              aria-label={intl.formatMessage(messages.pasteBlocks)}
              onClick={this.pasteBlocks}
              tabIndex={0}
              className="pasteBlocks"
              id="toolbar-paste-blocks"
            >
              <span class="blockCount">
                {(blocksClipboard.cut || blocksClipboard.copy).length}
              </span>
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
        blocksClipboard: state?.blocksClipboard || {},
      };
    },
    { setBlocksClipboard, resetBlocksClipboard },
  ),
)(BlockClipboardHandler);
