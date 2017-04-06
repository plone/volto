/**
 * Tab component.
 * @module components/manage/Tabs/Tab
 */

import React, { PropTypes, Component } from 'react';

/**
 * Tab component class.
 * @class Tab
 * @extends Component
 */
export default class Tab extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    index: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    active: PropTypes.bool,
    selectTab: PropTypes.func.isRequired,
  }

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    active: false,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }

  /**
   * On click handler
   * @method onClick
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  onClick(event) {
    this.props.selectTab(this.props.index);
    event.preventDefault();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { index, title, active } = this.props;
    return (
      <a
        id={`autotoc-item-autotoc-${index}`}
        href={`#autotoc-item-autotoc-${index}`}
        className={`autotoc-level-1 ${active ? 'active' : ''}`}
        onClick={this.onClick}
      >
        {title}
      </a>
    );
  }
}
