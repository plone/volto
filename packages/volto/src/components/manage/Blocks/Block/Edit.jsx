/**
 * Edit block.
 * @module components/manage/Blocks/Block/Edit
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { setSidebarTab } from '@plone/volto/actions/sidebar/sidebar';
import { setUIState } from '@plone/volto/actions/form/form';
import config from '@plone/volto/registry';
import withObjectBrowser from '@plone/volto/components/manage/Sidebar/ObjectBrowser';
import ViewDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultView';
import EditDefaultBlock from '@plone/volto/components/manage/Blocks/Block/DefaultEdit';
import SidebarPortal from '@plone/volto/components/manage/Sidebar/SidebarPortal';
import BlockSettingsSidebar from '@plone/volto/components/manage/Blocks/Block/Settings';
import BlockSettingsSchema from '@plone/volto/components/manage/Blocks/Block/Schema';

const messages = defineMessages({
  unknownBlock: {
    id: 'Unknown Block',
    defaultMessage: 'Unknown Block {block}',
  },
});

/**
 * Edit block component.
 * @function Edit
 * @param {Object} props Component properties.
 */
const Edit = (props) => {
  const {
    type,
    data,
    selected,
    multiSelected,
    id,
    manage,
    onMoveBlock,
    onDeleteBlock,
    editable,
    pathname,
    hovered,
    sidebarTab,
    intl,
    setSidebarTab,
    setUIState,
    handleKeyDown,
    onSelectBlock,
    index,
  } = props;

  const blockNode = useRef(null);
  const blocksConfig = config.blocks.blocksConfig;
  const blockHasOwnFocusManagement = blocksConfig?.[type]?.blockHasOwnFocusManagement || null;
  const disableNewBlocks = data?.disableNewBlocks;

  useEffect(() => {
    if (!blockHasOwnFocusManagement && selected && blockNode.current) {
      blockNode.current.focus();
    }
    const tab = manage ? 1 : blocksConfig?.[type]?.sidebarTab || 0;
    if (selected && editable && sidebarTab !== 2) {
      setSidebarTab(tab);
    }
  }, [selected, editable, sidebarTab, manage, type, setSidebarTab, blockHasOwnFocusManagement]);

  const handleMouseEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (hovered !== id) {
      setUIState({ hovered: id });
    }
  };

  const handleMouseLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setUIState({ hovered: null });
  };

  const handleClick = (e) => {
    const isMultipleSelection = e.shiftKey || e.ctrlKey || e.metaKey;
    if (!selected) {
      onSelectBlock(id, selected ? false : isMultipleSelection, e);
    }
  };

  const Block =
    data?.readOnly || (!editable && !config.blocks.showEditBlocksInBabelView)
      ? blocksConfig?.[type]?.view || ViewDefaultBlock
      : blocksConfig?.[type]?.edit || EditDefaultBlock;

  const schema = blocksConfig?.[type]?.schema || BlockSettingsSchema;

  return (
    <>
      {Block ? (
        <div
          role="presentation"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleClick}
          onKeyDown={
            !(blockHasOwnFocusManagement || disableNewBlocks)
              ? (e) => handleKeyDown(e, index, id, blockNode.current)
              : null
          }
          className={cx('block', type, data.variation, {
            selected: selected || multiSelected,
            multiSelected,
            hovered: hovered === id,
          })}
          style={{ outline: 'none' }}
          ref={blockNode}
          tabIndex={!blockHasOwnFocusManagement ? -1 : null}
        >
          <Block {...props} blockNode={blockNode} data={data} />
          {manage && (
            <SidebarPortal selected={selected} tab="sidebar-settings">
              <BlockSettingsSidebar {...props} schema={schema} />
            </SidebarPortal>
          )}
        </div>
      ) : (
        <div
          role="presentation"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
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
  properties: PropTypes.objectOf(PropTypes.any).isRequired,
  selected: PropTypes.bool.isRequired,
  multiSelected: PropTypes.bool,
  index: PropTypes.number.isRequired,
  id: PropTypes.string.isRequired,
  manage: PropTypes.bool,
  onMoveBlock: PropTypes.func.isRequired,
  onDeleteBlock: PropTypes.func.isRequired,
  editable: PropTypes.bool,
  pathname: PropTypes.string.isRequired,
};

Edit.defaultProps = {
  manage: false,
  editable: true,
};

export default compose(
  injectIntl,
  withObjectBrowser,
  connect(
    (state) => ({
      hovered: state.form?.ui.hovered || null,
      sidebarTab: state.sidebar?.tab,
    }),
    { setSidebarTab, setUIState },
  ),
)(Edit);
