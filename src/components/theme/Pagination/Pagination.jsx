/**
 * Pagination component.
 * @module components/theme/Pagination/Pagination
 */

import React from 'react';
import { Menu } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { map } from 'lodash';
import { FormattedMessage, injectIntl } from 'react-intl';

/**
 * Component to display pagination.
 * @function Pagination
 * @param {number} current Current page
 * @param {number} total Total amount of pages
 * @param {number} pageSize Current page size
 * @param {Array} pageSizes Available page sizes
 * @param {function} onChangePage On page change handler
 * @param {function} onChangePageSize On page size change handler
 * @returns {string} Markup of the component.
 */
const Pagination = ({
  current,
  total,
  pageSize,
  pageSizes,
  onChangePage,
  onChangePageSize,
}) => (
  <Menu secondary attached>
    <Menu.Menu>
      {current > 0 && (
        <Menu.Item
          value={current - 1}
          icon="chevron left"
          onClick={onChangePage}
        />
      )}
      {current > 2 && (
        <Menu.Item value={0} onClick={onChangePage}>
          1
        </Menu.Item>
      )}
      {current > 3 && <Menu.Item disabled>...</Menu.Item>}
      {current > 1 && (
        <Menu.Item value={current - 2} onClick={onChangePage}>
          {current - 1}
        </Menu.Item>
      )}
      {current > 0 && (
        <Menu.Item value={current - 1} onClick={onChangePage}>
          {current}
        </Menu.Item>
      )}
      {total > 1 && (
        <Menu.Item value={current} active onClick={onChangePage}>
          {current + 1}
        </Menu.Item>
      )}
      {total > current + 1 && (
        <Menu.Item value={current + 1} onClick={onChangePage}>
          {current + 2}
        </Menu.Item>
      )}
      {total > current + 2 && (
        <Menu.Item value={current + 2} onClick={onChangePage}>
          {current + 3}
        </Menu.Item>
      )}
      {total > current + 4 && <Menu.Item disabled>...</Menu.Item>}
      {total > current + 3 && (
        <Menu.Item value={total - 1} onClick={onChangePage}>
          {total}
        </Menu.Item>
      )}
      {current < total - 1 && (
        <Menu.Item
          value={current + 1}
          icon="chevron right"
          onClick={onChangePage}
        />
      )}
    </Menu.Menu>
    {pageSize && (
      <Menu.Menu position="right">
        <Menu.Item>
          <FormattedMessage id="Show" defaultMessage="Show" />:
        </Menu.Item>
        {map(pageSizes, (size) => (
          <Menu.Item
            key={size}
            value={size}
            active={size === pageSize}
            onClick={onChangePageSize}
          >
            {size}
          </Menu.Item>
        ))}
      </Menu.Menu>
    )}
  </Menu>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Pagination.propTypes = {
  /**
   * Current page
   */
  current: PropTypes.number.isRequired,
  /**
   * Total number of pages
   */
  total: PropTypes.number.isRequired,
  /**
   * Number of items per page
   */
  pageSize: PropTypes.number,
  /**
   * Page sizes to choose from
   */
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  /**
   * Handler called when changing the page
   */
  onChangePage: PropTypes.func.isRequired,
  /**
   * Handler called when changing the pagesize
   */
  onChangePageSize: PropTypes.func,
};

/**
 * Default props.
 * @property {Object} defaultProps Default properties.
 * @static
 */
Pagination.defaultProps = {
  pageSize: null,
  pageSizes: [],
  onChangePageSize: null,
};

export default injectIntl(Pagination);
