/**
 * IdWidget component.
 * @module components/manage/Widgets/IdWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Input } from 'semantic-ui-react';
import { compact, concat, keys, map, union, uniq } from 'lodash';

import { defineMessages, injectIntl } from 'react-intl';
import { Icon, FormFieldWrapper } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { getQuerystring } from '@plone/volto/actions';

const messages = defineMessages({
  reservedId: {
    id: "This is a reserved name and can't be used",
    defaultMessage: "This is a reserved name and can't be used",
  },
  invalidCharacters: {
    id:
      'Only lowercase letters (a-z) without accents, numbers (0-9), and the characters "-", "_", and "." are allowed.',
    defaultMessage:
      'Only lowercase letters (a-z) without accents, numbers (0-9), and the characters "-", "_", and "." are allowed.',
  },
});

/**
 * The id widget.
 *
 * This is the id widget to handle for example the short name field.
 */
class IdWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    required: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.string,
    focus: PropTypes.bool,
    onChange: PropTypes.func,
    onBlur: PropTypes.func,
    onClick: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    icon: PropTypes.shape({
      xmlns: PropTypes.string,
      viewBox: PropTypes.string,
      content: PropTypes.string,
    }),
    iconAction: PropTypes.func,
    minLength: PropTypes.number,
    maxLength: PropTypes.number,
    wrapped: PropTypes.bool,
    placeholder: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    value: null,
    onChange: () => {},
    onBlur: () => {},
    onClick: () => {},
    onEdit: null,
    onDelete: null,
    focus: false,
    icon: null,
    iconAction: null,
    minLength: null,
    maxLength: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props) {
    super(props);
    this.state = {
      error: [],
      reservedIds: compact(
        uniq(
          union(
            config.settings.reservedIds,
            map(config.settings.nonContentRoutes, (route) =>
              String(route).replace(/[^a-z-]/g, ''),
            ),
          ),
        ),
      ),
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.fieldValidation = this.fieldValidation.bind(this);
  }

  /**
   * Component did mount lifecycle method
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    if (this.props.focus) {
      this.node.focus();
    }
    this.props.getQuerystring();
    this.fieldValidation(this.props.value);
  }

  /**
   * Field validation.
   * @method fieldValidation
   * @param {string} value New value
   * @returns {undefined}
   */
  fieldValidation(value) {
    const error = [];

    // Check reserved id's
    if (this.state.reservedIds.indexOf(value) !== -1) {
      error.push(this.props.intl.formatMessage(messages.reservedId));
    }

    // Check invalid characters
    if (!/^[.a-z0-9_-]*$/.test(value)) {
      error.push(this.props.intl.formatMessage(messages.invalidCharacters));
    }

    // Check indexes
    if (this.props.indexes.indexOf(value) !== -1) {
      error.push(this.props.intl.formatMessage(messages.reservedId));
    }

    this.setState({ error });
  }

  /**
   * Handle the field change.
   * @method handleChange
   * @param {Object} event Event object
   * @returns {undefined}
   */
  handleChange({ target }) {
    this.fieldValidation(target.value);
    this.props.onChange(
      this.props.id,
      target.value === '' ? undefined : target.value,
    );
  }

  /**
   * Handle the field blur.
   * @method handleBlur
   * @param {Object} event Event object
   * @returns {undefined}
   */
  handleBlur({ target }) {
    this.fieldValidation(target.value);
    this.props.onBlur(
      this.props.id,
      target.value === '' ? undefined : target.value,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const {
      id,
      value,
      onClick,
      icon,
      iconAction,
      minLength,
      maxLength,
      placeholder,
    } = this.props;

    const props = {
      ...this.props,
      error: concat(this.props.error, this.state.error),
    };

    return (
      <FormFieldWrapper {...props} className="text">
        <Input
          id={`field-${id}`}
          name={id}
          value={value || ''}
          disabled={this.props.isDisabled}
          icon={icon || null}
          placeholder={placeholder}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          onClick={() => onClick()}
          ref={(node) => {
            this.node = node;
          }}
          minLength={minLength || null}
          maxLength={maxLength || null}
        />
        {icon && iconAction && (
          <button className={`field-${id}-action-button`} onClick={iconAction}>
            <Icon name={icon} size="18px" />
          </button>
        )}
      </FormFieldWrapper>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      indexes: keys(state.querystring.indexes),
    }),
    {
      getQuerystring,
    },
  ),
)(IdWidget);
