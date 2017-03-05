/**
 * Workflow component.
 * @module components/manage/Workflow/Workflow
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router';
import { last } from 'lodash';

import { getWorkflow, transitionWorkflow } from 'actions';
import { getBaseUrl } from 'helpers';
import config from 'config';

@connect(
  state => ({
    loaded: state.workflow.transition.loaded,
    history: state.workflow.history,
    transitions: state.workflow.transitions,
    location: state.routing.location,
  }),
  dispatch => bindActionCreators({ getWorkflow, transitionWorkflow }, dispatch),
)
/**
 * Workflow container class.
 * @class Workflow
 * @extends Component
 */
export default class Workflow extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getWorkflow: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    location: PropTypes.object,
    history: PropTypes.array,
    transitions: PropTypes.array,
  }

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.state = { menuOpen: false };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getWorkflow(getBaseUrl(this.props.location.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.getWorkflow(getBaseUrl(nextProps.location.pathname));
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.props.getWorkflow(getBaseUrl(nextProps.location.pathname));
    }
  }

  /**
   * Toggle menu.
   * @method toggleMenu
   * @returns {undefined}
   */
  toggleMenu() {
    this.setState({
      menuOpen: !this.state.menuOpen,
    })
  }

  /**
   * On transition handler
   * @method transition
   * @param {string} url Transition url
   * @returns {undefined}
   */
  transition(url) {
    this.setState({
      menuOpen: false,
    });
    this.props.transitionWorkflow(url.replace(config.apiPath, ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const current = this.props.history.length > 0 && last(this.props.history).review_state;
    return (
      this.props.history.length > 0 &&
        <li className={this.state.menuOpen ? "active" : ""}>
          <a onClick={::this.toggleMenu}>
            <span aria-hidden="true" className="icon-plone-contentmenu-workflow" />
            <span>
              <span>State:</span><br/>
              <span>{current}</span>
            </span>
          </a>
          {this.state.menuOpen &&
            <ul style={{ top: '200px' }} aria-hidden={this.state.menuOpen ? 'true' : 'false'}>
              <li className="plone-toolbar-submenu-header">
                <span>
                  <span>State:</span> <span className={`state-${current}`}>{current}</span>
                </span>
              </li>
              {this.props.transitions.map((item, index, items) =>
                <li key={index} className="plonetoolbar-workfow-transition">
                  <a title={item.title} onClick={this.transition.bind(this, item['@id'])}>
                    {item.title}
                  </a>
                </li>
              )}
            </ul>
          }
        </li>
      || <span />
    );
  }
}
