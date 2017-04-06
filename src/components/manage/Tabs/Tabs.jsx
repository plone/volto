/**
 * Tabs component.
 * @module components/manage/Tabs/Tabs
 */

import React, { PropTypes } from 'react';

import { Tab } from '../../../components';

/**
 * Tabs component class.
 * @function Tabs
 * @returns {string} Markup of the component.
 */
const Tabs = ({ tabs, current, selectTab }) =>
  <nav className="autotoc-nav">
    {tabs.map((tab, index) =>
      <Tab
        index={index}
        title={tab}
        selectTab={selectTab}
        active={index === current}
      />,
    )}
  </nav>;

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  current: PropTypes.number.isRequired,
  selectTab: PropTypes.func.isRequired,
};

export default Tabs;
