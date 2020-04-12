/**
 * Workflow component.
 * @module components/manage/Workflow/Workflow
 */

import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { uniqBy } from 'lodash';
import loadable from '@loadable/component';
import { toast } from 'react-toastify';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import getWorkflowMapping from '@plone/volto/constants/Workflows';
import { Icon, Toast } from '@plone/volto/components';
import { settings } from '~/config';

import {
  getContent,
  getWorkflow,
  transitionWorkflow,
} from '@plone/volto/actions';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';

const ReactSelect = loadable.lib(() => import('react-select'));

const messages = defineMessages({
  messageUpdated: {
    id: 'Workflow updated.',
    defaultMessage: 'Workflow updated.',
  },
  messageNoWorkflow: {
    id: 'No workflow',
    defaultMessage: 'No workflow',
  },
});

const Placeholder = props => {
  return (
    <ReactSelect>
      {({ components }) => <components.Placeholder {...props} />}
    </ReactSelect>
  );
};

const SingleValue = ({ children, ...props }) => {
  const stateDecorator = {
    marginLeft: '10px',
    marginRight: '10px',
    display: 'inline-block',
    backgroundColor: props.selectProps.value.color || null,
    content: ' ',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
  };
  return (
    <ReactSelect>
      {({ components }) => (
        <components.SingleValue {...props}>
          <span style={stateDecorator} />
          {children}
        </components.SingleValue>
      )}
    </ReactSelect>
  );
};

const Option = props => {
  const stateDecorator = {
    marginLeft: '10px',
    marginRight: '10px',
    display: 'inline-block',
    backgroundColor:
      props.selectProps.value.value === props.data.value
        ? props.selectProps.value.color
        : null,
    content: ' ',
    height: '10px',
    width: '10px',
    borderRadius: '50%',
    border:
      props.selectProps.value.value !== props.data.value
        ? `1px solid ${props.data.color}`
        : null,
  };
  return (
    <ReactSelect>
      {({ components }) => (
        <components.Option {...props}>
          <span style={stateDecorator} />
          <div style={{ marginRight: 'auto' }}>{props.label}</div>
          {props.isFocused && !props.isSelected && (
            <Icon name={checkSVG} size="24px" color="#b8c6c8" />
          )}
          {props.isSelected && (
            <Icon name={checkSVG} size="24px" color="#007bc1" />
          )}
        </components.Option>
      )}
    </ReactSelect>
  );
};

const DropdownIndicator = props => {
  return (
    <ReactSelect>
      {({ components }) => (
        <components.DropdownIndicator {...props}>
          {props.selectProps.menuIsOpen ? (
            <Icon name={upSVG} size="24px" color="#007bc1" />
          ) : (
            <Icon name={downSVG} size="24px" color="#007bc1" />
          )}
        </components.DropdownIndicator>
      )}
    </ReactSelect>
  );
};

const selectTheme = theme => ({
  ...theme,
  borderRadius: 0,
  colors: {
    ...theme.colors,
    primary25: 'hotpink',
    primary: '#b8c6c8',
  },
});

const customSelectStyles = {
  control: (styles, state) => ({
    ...styles,
    border: 'none',
    borderBottom: '2px solid #b8c6c8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '2px solid #b8c6c8',
  }),
  indicatorSeparator: styles => ({
    ...styles,
    width: null,
  }),
  valueContainer: styles => ({
    ...styles,
  }),
  option: (styles, state) => ({
    ...styles,
    backgroundColor: null,
    height: '50px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 12px',
    color: state.isSelected
      ? '#007bc1'
      : state.isFocused
      ? '#4a4a4a'
      : 'inherit',
    ':active': {
      backgroundColor: null,
    },
  }),
};

/**
 * Workflow container class.
 * @class Workflow
 * @extends Component
 */
class Workflow extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getContent: PropTypes.func.isRequired,
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
    selectedOption: this.props.content.review_state
      ? getWorkflowMapping(null, this.props.content.review_state)
      : {},
  };

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  UNSAFE_componentWillMount() {
    this.props.getWorkflow(this.props.pathname);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.pathname !== this.props.pathname) {
      this.props.getWorkflow(nextProps.pathname);
    }
    if (!this.props.loaded && nextProps.loaded) {
      this.props.getWorkflow(nextProps.pathname);
      this.props.getContent(nextProps.pathname);
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
    toast.success(
      <Toast
        success
        title={this.props.intl.formatMessage(messages.messageUpdated)}
      />,
    );
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

    return (
      <Fragment>
        <label htmlFor="state-select">
          <FormattedMessage id="State" defaultMessage="State" />
        </label>
        <ReactSelect>
          {({ default: Select }) => (
            <Select
              name="display-select"
              className="react-select-container"
              classNamePrefix="react-select"
              isDisabled={
                !this.props.content.review_state ||
                this.props.transitions.length === 0
              }
              options={uniqBy(
                this.props.transitions.map(transition =>
                  getWorkflowMapping(transition['@id']),
                ),
                'label',
              ).concat(selectedOption)}
              styles={customSelectStyles}
              theme={selectTheme}
              components={{
                DropdownIndicator,
                Placeholder,
                Option,
                SingleValue,
              }}
              onChange={this.transition}
              defaultValue={
                this.props.content.review_state
                  ? selectedOption
                  : {
                      label: this.props.intl.formatMessage(
                        messages.messageNoWorkflow,
                      ),
                      value: 'noworkflow',
                    }
              }
              isSearchable={false}
            />
          )}
        </ReactSelect>
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      loaded: state.workflow.transition.loaded,
      content: state.content.data,
      history: state.workflow.history,
      transitions: state.workflow.transitions,
    }),
    { getContent, getWorkflow, transitionWorkflow },
  ),
)(Workflow);
