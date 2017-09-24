/**
 * Workflow component.
 * @module components/manage/Workflow/Workflow
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { last } from 'lodash';
import { Dropdown, Icon } from 'semantic-ui-react';
import { FormattedMessage } from 'react-intl';

import { getWorkflow, transitionWorkflow } from '../../../actions';
import config from '../../../config';

@connect(
  state => ({
    loaded: state.workflow.transition.loaded,
    history: state.workflow.history,
    transitions: state.workflow.transitions,
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
    /**
     * Action to get workflow
     */
    getWorkflow: PropTypes.func.isRequired,
    /**
     * Action to transition workflow
     */
    transitionWorkflow: PropTypes.func.isRequired,
    /**
     * Loaded status
     */
    loaded: PropTypes.bool.isRequired,
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * History of the object
     */
    history: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Review state of the history entry
         */
        review_state: PropTypes.string,
      }),
    ),
    /**
     * List of transitions
     */
    transitions: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the transition
         */
        '@id': PropTypes.string,
        /**
         * Title of the transition
         */
        title: PropTypes.string,
      }),
    ),
    /**
     * True if menu is expanded
     */
    expanded: PropTypes.bool,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    history: [],
    transitions: [],
    expanded: true,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Workflow
   */
  constructor(props) {
    super(props);
    this.transition = this.transition.bind(this);
  }

  /**
   * Component will mount
   * @method componentWillMount
   */
  componentWillMount() {
    this.props.getWorkflow(this.props.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getWorkflow(nextProps.pathname);
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.props.getWorkflow(nextProps.pathname);
    }
  }

  /**
   * On transition handler
   * @method transition
   * @param {string} event Event object
   */
  transition(event, { value }) {
    this.props.transitionWorkflow(value.replace(config.apiPath, ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const current =
      this.props.history.length > 0 && last(this.props.history).review_state;
    return this.props.history.length > 0 ? (
      <Dropdown
        item
        trigger={
          <span>
            <Icon name="random" />{' '}
            {this.props.expanded && (
              <FormattedMessage
                id="State: {current}"
                defaultMessage="State: {current}"
                values={{ current }}
              />
            )}
          </span>
        }
        pointing="left"
      >
        <Dropdown.Menu>
          {this.props.transitions.map(item => (
            <Dropdown.Item
              text={item.title}
              value={item['@id']}
              key={item['@id']}
              onClick={this.transition}
            />
          ))}
        </Dropdown.Menu>
      </Dropdown>
    ) : (
      <span />
    );
  }
}
