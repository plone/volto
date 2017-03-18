/**
 * Workflow component.
 * @module components/manage/Workflow/Workflow
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { last } from 'lodash';

import { getWorkflow, transitionWorkflow } from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import { WorkflowItem } from '../../../components';
import config from '../../../config';

@connect(
  state => ({
    loaded: state.workflow.transition.loaded,
    history: state.workflow.history,
    transitions: state.workflow.transitions,
    pathname: state.routing.locationBeforeTransitions.pathname,
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
    transitionWorkflow: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(PropTypes.shape({
      review_state: PropTypes.string,
    })),
    transitions: PropTypes.arrayOf(PropTypes.shape({
      '@id': PropTypes.string,
      title: PropTypes.string,
    })),
  }

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    history: [],
    transitions: [],
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
    this.toggleMenu = this.toggleMenu.bind(this);
    this.transition = this.transition.bind(this);
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getWorkflow(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getWorkflow(getBaseUrl(nextProps.pathname));
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.props.getWorkflow(getBaseUrl(nextProps.pathname));
    }
  }

  /**
   * Toggle menu.
   * @method toggleMenu
   * @param {Object} event Event object.
   * @returns {undefined}
   */
  toggleMenu(event) {
    this.setState({
      menuOpen: !this.state.menuOpen,
    });
    event.preventDefault();
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
      this.props.history.length > 0 ?
        <li className={this.state.menuOpen ? 'active' : ''}>
          <a href="/manage_workflow" onClick={this.toggleMenu}>
            <span aria-hidden="true" className="icon-plone-contentmenu-workflow" />
            <span>
              <span>State:</span><br />
              <span>{current}</span>
            </span>
          </a>
          {this.state.menuOpen &&
            <ul style={{ top: '250px' }} aria-hidden={this.state.menuOpen ? 'true' : 'false'}>
              <li className="plone-toolbar-submenu-header">
                <span>
                  <span>State:</span> <span className={`state-${current}`}>{current}</span>
                </span>
              </li>
              {this.props.transitions.map(item =>
                <WorkflowItem
                  key={item['@id']}
                  url={item['@id']}
                  title={item.title}
                  transition={this.transition}
                />,
              )}
            </ul>
          }
        </li>
      : <span />
    );
  }
}
