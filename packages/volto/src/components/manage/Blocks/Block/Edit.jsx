/**
 * Edit block.
 * @module components/manage/Blocks/Block/Edit
 */

import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { defineMessages, useIntl } from 'react-intl';
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
 * @param {Object} props Component props
 * @returns {JSX.Element} The rendered component
 */
function Edit(props) {
  const {
    type,
    data,
    multiSelected,
    index,
    id,
    manage,
    editable,
    selected,
    sidebarTab,
  } = props;

  const intl = useIntl();
  const blockNode = useRef(null);
  const prevSelectedRef = useRef(selected);
  const prevTypeRef = useRef(type);

  const { blocksConfig = config.blocks.blocksConfig } = props;
  const { setSidebarTab: setSidebarTabProp } = props;

  useEffect(() => {
    const blockHasOwnFocusManagement =
      blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;
    if (!blockHasOwnFocusManagement && selected && blockNode.current) {
      blockNode.current.focus();
    }
    const tab = manage ? 1 : blocksConfig?.[type]?.sidebarTab || 0;
    if (selected && editable && sidebarTab !== 2) {
      setSidebarTabProp(tab);
    }
  }, [
    manage,
    editable,
    sidebarTab,
    type,
    selected,
    setSidebarTabProp,
    blocksConfig,
  ]);

  useEffect(() => {
    const blockHasOwnFocusManagement =
      blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;

    if (
      !blockHasOwnFocusManagement &&
      selected &&
      prevSelectedRef.current !== selected &&
      blockNode.current
    ) {
      blockNode.current.focus();
    }
    if (
      ((!prevSelectedRef.current && selected) ||
        prevTypeRef.current !== type) &&
      editable
    ) {
      const tab = manage ? 1 : blocksConfig?.[type]?.sidebarTab || 0;
      if (sidebarTab !== 2) {
        setSidebarTabProp(tab);
      }
    }

    prevSelectedRef.current = selected;
    prevTypeRef.current = type;
  }, [
    editable,
    manage,
    sidebarTab,
    type,
    selected,
    setSidebarTabProp,
    blocksConfig,
  ]);

  const { isContainer: parentIsContainer } = props;

  const disableNewBlocks = data?.disableNewBlocks;

  let Block = blocksConfig?.[type]?.['edit'] || EditDefaultBlock;
  if (
    data?.readOnly ||
    (!editable && !config.blocks.showEditBlocksInBabelView)
  ) {
    Block = blocksConfig?.[type]?.['view'] || ViewDefaultBlock;
  }
  const schema = blocksConfig?.[type]?.['schema'] || BlockSettingsSchema;
  const blockHasOwnFocusManagement =
    blocksConfig?.[type]?.['blockHasOwnFocusManagement'] || null;

  return (
    <>
      {Block !== null ? (
        <div
          role="presentation"
          onMouseEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (props.hovered !== id) {
              props.setUIState({ hovered: id });
            }
          }}
          onFocus={(e) => {
            // TODO: This `onFocus` steals somehow the focus from the slate block
            // we have to investigate why this is happening
            // Apparently, I can't see any difference in the behavior
            // If any, we can fix it in successive iterations
            // if (props.hovered !== props.id) {
            //   props.setUIState({ hovered: props.id });
            // }
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.setUIState({ hovered: null });
          }}
          onClick={(e) => {
            const isMultipleSelection = e.shiftKey || e.ctrlKey || e.metaKey;
            !selected &&
              props.onSelectBlock(
                id,
                selected ? false : isMultipleSelection,
                e,
              );
          }}
          onKeyDown={
            !(blockHasOwnFocusManagement || disableNewBlocks)
              ? (e) => props.handleKeyDown(e, index, id, blockNode.current)
              : null
          }
          className={cx('block', type, data.variation, {
            selected: selected || multiSelected,
            multiSelected: multiSelected,
            hovered: props.hovered === id,
            error: !!props.blocksErrors?.[id],
          })}
          style={{ outline: 'none' }}
          ref={blockNode}
          // The tabIndex is required for the keyboard navigation
          /* eslint-disable jsx-a11y/no-noninteractive-tabindex */
          tabIndex={!blockHasOwnFocusManagement ? -1 : null}
        >
          <Block
            {...props}
            blockNode={blockNode}
            data={data}
            className={cx({ contained: parentIsContainer })}
          />
          {manage && (
            <SidebarPortal selected={selected} tab="sidebar-settings">
              <BlockSettingsSidebar {...props} schema={schema} />
            </SidebarPortal>
          )}
        </div>
      ) : (
        <div
          role="presentation"
          onMouseEnter={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.setUIState({ hovered: id });
          }}
          onFocus={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.setUIState({ hovered: id });
          }}
          onMouseLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            props.setUIState({ hovered: null });
          }}
          onClick={() => !selected && props.onSelectBlock(id)}
          onKeyDown={
            !(blockHasOwnFocusManagement || disableNewBlocks)
              ? (e) => props.handleKeyDown(e, index, id, blockNode.current)
              : null
          }
          className={cx(`block ${type}`, { selected: selected })}
          style={{ outline: 'none' }}
          ref={blockNode}
          // The tabIndex is required for the keyboard navigation
          tabIndex={-1}
        >
          {intl.formatMessage(messages.unknownBlock, {
            block: type,
          })}
        </div>
      )}
    </>
  );
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 */
Edit.propTypes = {
  type: PropTypes.string.isRequired,
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  // properties is mapped to formData, so it's not connected to changes of the object
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

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 */
Edit.defaultProps = {
  manage: false,
  editable: true,
};

export default compose(
  withObjectBrowser,
  connect(
    (state, props) => ({
      hovered: state.form?.ui.hovered || null,
      sidebarTab: state.sidebar?.tab,
    }),
    { setSidebarTab, setUIState },
  ),
)(Edit);
