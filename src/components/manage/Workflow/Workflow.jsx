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
import config from '~/config';

import { getWorkflow, transitionWorkflow } from '../../../actions';

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
    getWorkflow: PropTypes.func.isRequired,
    transitionWorkflow: PropTypes.func.isRequired,
    loaded: PropTypes.bool.isRequired,
    pathname: PropTypes.string.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        review_state: PropTypes.string,
      }),
    ),
    transitions: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        title: PropTypes.string,
      }),
    ),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    history: [],
    transitions: [],
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
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.getWorkflow(this.props.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
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
   * @returns {undefined}
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
            <Icon name="random" size="big" />{' '}
            <FormattedMessage
              id="State: {current}"
              defaultMessage="State: {current}"
              values={{ current }}
            />
          </span>
        }
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
