import React, { forwardRef } from 'react';
import classNames from 'classnames';
import { useDispatch, useSelector } from 'react-redux';
import { includes } from 'lodash';
import cx from 'classnames';
import { Icon } from '@plone/volto/components';
import { setUIState } from '@plone/volto/actions';
import config from '@plone/volto/registry';

import deleteSVG from '@plone/volto/icons/delete.svg';
import dragSVG from '@plone/volto/icons/drag.svg';

export const Item = forwardRef(
  (
    {
      clone,
      data,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      id,
      handleProps,
      indentationWidth,
      onRemove,
      onSelectBlock,
      parentId,
      style,
      value,
      wrapperRef,
      errors,
      ...props
    },
    ref,
  ) => {
    const selected = useSelector((state) => state.form.ui.selected);
    const hovered = useSelector((state) => state.form.ui.hovered);
    const multiSelected = useSelector((state) => state.form.ui.multiSelected);
    const gridSelected = useSelector((state) => state.form.ui.gridSelected);
    const dispatch = useDispatch();

    return (
      <li
        className={classNames(
          'tree-item-wrapper',
          clone && 'clone',
          ghost && 'ghost',
          disableSelection && 'disable-selection',
          disableInteraction && 'disable-interaction',
        )}
        role="presentation"
        onMouseOver={() => dispatch(setUIState({ hovered: id }))}
        onFocus={() => dispatch(setUIState({ hovered: id }))}
        onMouseLeave={() => dispatch(setUIState({ hovered: null }))}
        onClick={(e) => {
          if (depth === 0) {
            const isMultipleSelection = e.shiftKey || e.ctrlKey || e.metaKey;
            selected !== id &&
              onSelectBlock(
                id,
                selected === id ? false : isMultipleSelection,
                e,
              );
          } else {
            dispatch(
              setUIState({
                selected: parentId,
                multiSelected: [],
                gridSelected: id,
              }),
            );
          }
        }}
        ref={wrapperRef}
        style={{
          '--spacing': `${indentationWidth * depth}px`,
        }}
        {...props}
      >
        <div
          className={classNames(
            'tree-item',
            (selected === id || gridSelected === id) && 'selected',
            hovered === id && 'hovered',
            includes(multiSelected, id) && 'multiSelected',
            `depth-${depth}`,
          )}
          ref={ref}
          style={style}
        >
          <button
            ref={ref}
            {...handleProps}
            className={classNames('action', 'drag')}
            tabIndex={0}
            data-cypress="draggable-handle"
          >
            <Icon name={dragSVG} size="16px" />
          </button>
          <span
            className={cx('text', { errored: Object.keys(errors).length > 0 })}
          >
            {config.blocks.blocksConfig[data?.['@type']]?.icon && (
              <Icon
                name={config.blocks.blocksConfig[data?.['@type']]?.icon}
                size="20px"
                style={{ verticalAlign: 'middle' }}
              />
            )}{' '}
            {data?.plaintext ||
              config.blocks.blocksConfig[data?.['@type']]?.title}
          </span>
          {!clone && onRemove && (
            <button
              onClick={onRemove}
              className={classNames('action', 'delete')}
              tabIndex={0}
            >
              <Icon name={deleteSVG} size="18" />
            </button>
          )}
        </div>
      </li>
    );
  },
);
