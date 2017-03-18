/**
 * Workflow item component.
 * @module components/manage/WorkflowItem/WorkflowItem
 */

import React, { PropTypes, Component } from 'react';

/**
 * Workflow item component class.
 * @class WorkflowItem
 * @extends Component
 */
export default class WorkflowItem extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    transition: PropTypes.func.isRequired,
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
    this.props.transition(this.props.url);
    event.preventDefault();
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <li key={this.props.url} className="plonetoolbar-workfow-transition">
        <a href="/manage_workflow" title={this.props.title} onClick={this.onClick}>
          {this.props.title}
        </a>
      </li>
    );
  }
}
