/**
 * Workflow component.
 * @module components/manage/Workflow/Workflow
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { last, uniqBy } from 'lodash';
import { FormattedMessage } from 'react-intl';
import Select from 'react-select';
import getWorkflowMapping from '../../../constants/Workflows';
import { Icon } from '../../../components';
import downSVG from '../../../icons/down-key.svg';
import upSVG from '../../../icons/up-key.svg';
import checkSVG from '../../../icons/check.svg';

import { getWorkflow, transitionWorkflow } from '../../../actions';
import { settings } from '~/config';

@connect(
  state => ({
    loaded: state.workflow.transition.loaded,
    content: state.content.data,
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

  state = {
    selectedOption: getWorkflowMapping(null, this.props.content.review_state),
  };

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
  transition = selectedOption => {
    this.props.transitionWorkflow(
      selectedOption.url.replace(settings.apiPath, ''),
    );
    this.setState({ selectedOption });
  };

  selectValue = option => {
    const stateDecorator = {
      marginLeft: '10px',
      marginRight: '10px',
      display: 'inline-block',
      backgroundColor: option.color || null,
      content: ' ',
      height: '10px',
      width: '10px',
      borderRadius: '50%',
    };
    return (
      <Fragment>
        <span style={stateDecorator} />
        <span className="Select-value-label">{option.label}</span>
      </Fragment>
    );
  };

  optionRenderer = option => {
    const stateDecorator = {
      marginLeft: '10px',
      marginRight: '10px',
      display: 'inline-block',
      backgroundColor:
        this.state.selectedOption.value === option.value ? option.color : null,
      content: ' ',
      height: '10px',
      width: '10px',
      borderRadius: '50%',
      border:
        this.state.selectedOption.value !== option.value
          ? `1px solid ${option.color}`
          : null,
    };

    return (
      <Fragment>
        <span style={stateDecorator} />
        <span style={{ marginRight: 'auto' }}>{option.label}</span>
        <Icon name={checkSVG} size="24px" />
      </Fragment>
    );
  };

  render() {
    const { selectedOption } = this.state;
    const value = selectedOption && selectedOption.value;

    return (
      <Fragment>
        <label htmlFor="state-select">State</label>
        <Select
          name="state-select"
          arrowRenderer={({ onMouseDown, isOpen }) =>
            isOpen ? (
              <Icon name={upSVG} size="24px" />
            ) : (
              <Icon name={downSVG} size="24px" />
            )
          }
          clearable={false}
          disabled={!this.props.content.review_state}
          placeholder={
            this.props.content.review_state ? 'Select...' : 'No workflow'
          }
          searchable={false}
          // onBlur={() => {
          //   debugger;
          // }}
          value={value}
          onChange={this.transition}
          options={uniqBy(
            this.props.transitions.map(transition =>
              getWorkflowMapping(transition['@id']),
            ),
            'label',
          ).concat(selectedOption)}
          valueRenderer={this.selectValue}
          optionRenderer={this.optionRenderer}
        />
      </Fragment>
    );
  }
}
