/**
 * Edit block.
 * @module components/manage/Blocks/Block/Edit
 */

import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
import cx from 'classnames';
import { setSidebarTab, setUIState } from '@plone/volto/actions';
import config from '@plone/volto/registry';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import { applyBlockDefaults } from '@plone/volto/helpers';
import { ViewDefaultBlock, EditDefaultBlock } from '@plone/volto/components';
import {
  SidebarPortal,
  BlockSettingsSidebar,
  BlockSettingsSchema,
} from '@plone/volto/components';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

const Edit = (props) => {
  const {
    type,
    data,
    selected,
    multiSelected,
    index,
    id,
    manage,
    editable,
    hovered,
    sidebarTab,
    setSidebarTab,
    setUIState,
    onSelectBlock,
    handleKeyDown,
  } = props;

  const blockNode = useRef(null);
  const intl = useIntl();
  const blocksConfig = config.blocks.blocksConfig;
  const disableNewBlocks = data?.disableNewBlocks;

  const blockHasOwnFocusManagement =
    blocksConfig?.[type]?.blockHasOwnFocusManagement || null;

  useEffect(() => {
    if (!blockHasOwnFocusManagement && selected && blockNode.current) {
      blockNode.current.focus();
    }
    const tab = manage ? 1 : blocksConfig?.[type]?.sidebarTab || 0;
    if (selected && editable && sidebarTab !== 2) {
      setSidebarTab(tab);
    }
  }, [
    selected,
    type,
    editable,
    sidebarTab,
    manage,
    setSidebarTab,
    blocksConfig,
    blockHasOwnFocusManagement,
  ]);

  useEffect(() => {
    if (!blockHasOwnFocusManagement && selected && blockNode.current) {
      blockNode.current.focus();
    }
  }, [selected, type, blockHasOwnFocusManagement]);

  let Block = blocksConfig?.[type]?.edit || EditDefaultBlock;
  if (
    data?.readOnly ||
    (!editable && !config.blocks.showEditBlocksInBabelView)
  ) {
    Block = blocksConfig?.[type]?.view || ViewDefaultBlock;
  }
  const schema = blocksConfig?.[type]?.schema || BlockSettingsSchema;

  return (
    <>
      {Block !== null ? (
        <div
          role="button"
          onMouseOver={() => hovered !== id && setUIState({ hovered: id })}
          onFocus={() => {}}
          onMouseLeave={() => setUIState({ hovered: null })}
          onClick={(e) => {
            const isMultipleSelection = e.shiftKey || e.ctrlKey || e.metaKey;
            !selected &&
              onSelectBlock(id, selected ? false : isMultipleSelection, e);
          }}
          onKeyDown={
            !(blockHasOwnFocusManagement || disableNewBlocks)
              ? (e) => handleKeyDown(e, index, id, blockNode.current)
              : null
          }
          className={cx('block', type, data.variation, {
            selected: selected || multiSelected,
            multiSelected: multiSelected,
            hovered: hovered === id,
          })}
          style={{ outline: 'none' }}
          ref={blockNode}
          tabIndex={blockHasOwnFocusManagement ? null : -1}
        >
          <Block
            {...props}
            blockNode={blockNode}
            data={applyBlockDefaults(props)}
          />
          {manage && (
            <SidebarPortal selected={selected} tab="sidebar-settings">
              <BlockSettingsSidebar {...props} schema={schema} />
            </SidebarPortal>
          )}
        </div>
      ) : (
        <div
          role="button"
          onMouseOver={() => setUIState({ hovered: id })}
          onFocus={() => setUIState({ hovered: id })}
          onMouseLeave={() => setUIState({ hovered: null })}
          onClick={() => !selected && onSelectBlock(id)}
          onKeyDown={
            !(blockHasOwnFocusManagement || disableNewBlocks)
              ? (e) => handleKeyDown(e, index, id, blockNode.current)
              : null
          }
          className={cx(`block ${type}`, { selected })}
          style={{ outline: 'none' }}
          ref={blockNode}
          tabIndex={-1}
        >
          {intl.formatMessage(messages.unknownBlock, { block: type })}
        </div>
      )}
    </>
  );
};

Edit.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.bool.isRequired,
  multiSelected: PropTypes.bool,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  manage: PropTypes.bool,
  editable: PropTypes.bool,
  hovered: PropTypes.string,
  sidebarTab: PropTypes.number,
  setSidebarTab: PropTypes.func.isRequired,
  setUIState: PropTypes.func.isRequired,
  onSelectBlock: PropTypes.func.isRequired,
  handleKeyDown: PropTypes.func.isRequired,
};

Edit.defaultProps = {
  manage: false,
  editable: true,
  multiSelected: false,
  hovered: null,
  sidebarTab: 0,
};

export default compose(
  withObjectBrowser,
  connect(
    (state) => ({
      hovered: state.form?.ui.hovered || null,
      sidebarTab: state.sidebar?.tab,
    }),
    { setSidebarTab, setUIState },
  ),
)(Edit);
