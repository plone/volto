/**
 * SelectWidget component.
 * @module components/manage/Widgets/SelectWidget
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Icon as IconOld, Form, Grid, Label } from 'semantic-ui-react';
import { map, find } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import Select, { components } from 'react-select';
import { Icon } from '../../../components';

import downSVG from '../../../icons/down-key.svg';
import upSVG from '../../../icons/up-key.svg';
import checkSVG from '../../../icons/check.svg';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  idTitle: {
    id: 'Short Name',
    defaultMessage: 'Short Name',
  },
  idDescription: {
    id: 'Used for programmatic access to the fieldset.',
    defaultMessage: 'Used for programmatic access to the fieldset.',
  },
  title: {
    id: 'Title',
    defaultMessage: 'Title',
  },
  description: {
    id: 'Description',
    defaultMessage: 'Description',
  },
  choices: {
    id: 'Choices',
    defaultMessage: 'Choices',
  },
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
});

const Option = props => {
  // console.log(props);
  return (
    <components.Option {...props}>
      <div>{props.label}</div>
      {props.isFocused &&
        !props.isSelected && (
          <Icon name={checkSVG} size="24px" color="#b8c6c8" />
        )}
      {props.isSelected && <Icon name={checkSVG} size="24px" color="#007bc1" />}
    </components.Option>
  );
};

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      {props.selectProps.menuIsOpen ? (
        <Icon name={upSVG} size="24px" color="#007bc1" />
      ) : (
        <Icon name={downSVG} size="24px" color="#007bc1" />
      )}
    </components.DropdownIndicator>
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
    // paddingLeft: 0,
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
 * SelectWidget component class.
 * @function SelectWidget
 * @returns {string} Markup of the component.
 */
const SelectWidget = ({
  id,
  title,
  required,
  description,
  error,
  value,
  choices,
  onChange,
  onEdit,
  onDelete,
  intl,
}) => {
  const schema = {
    fieldsets: [
      {
        id: 'default',
        title: intl.formatMessage(messages.default),
        fields: ['title', 'id', 'description', 'choices', 'required'],
      },
    ],
    properties: {
      id: {
        type: 'string',
        title: intl.formatMessage(messages.idTitle),
        description: intl.formatMessage(messages.idDescription),
      },
      title: {
        type: 'string',
        title: intl.formatMessage(messages.title),
      },
      description: {
        type: 'string',
        widget: 'textarea',
        title: intl.formatMessage(messages.description),
      },
      choices: {
        type: 'array',
        title: intl.formatMessage(messages.choices),
      },
      required: {
        type: 'boolean',
        title: intl.formatMessage(messages.required),
      },
    },
    required: ['id', 'title', 'choices'],
  };

  return (
    <Form.Field
      inline
      required={required}
      error={error.length > 0}
      className={description ? 'help' : ''}
    >
      <Grid>
        <Grid.Row stretched>
          <Grid.Column width="4">
            <div className="wrapper">
              <label htmlFor={`field-${id}`}>
                {onEdit && (
                  <i
                    aria-hidden="true"
                    className="grey bars icon drag handle"
                  />
                )}
                {title}
              </label>
            </div>
          </Grid.Column>
          <Grid.Column width="8">
            {onEdit && (
              <div className="toolbar">
                <a className="item" onClick={() => onEdit(id, schema)}>
                  <IconOld name="write square" size="large" color="blue" />
                </a>
                <a className="item" onClick={() => onDelete(id)}>
                  <IconOld name="close" size="large" color="red" />
                </a>
              </div>
            )}
            <Select
              id={`field-${id}`}
              name={id}
              disabled={onEdit !== null}
              className="react-select-container"
              classNamePrefix="react-select"
              options={[
                ...choices.map(option => ({
                  value: option[0],
                  label: option[1],
                })),
              ]}
              styles={customSelectStyles}
              theme={selectTheme}
              components={{ DropdownIndicator, Option }}
              defaultValue={
                { label: find(choices, o => o[0] === value)[1], value } || {}
              }
              onChange={data => onChange(id, data.value)}
            />
            {map(error, message => (
              <Label key={message} basic color="red" pointing>
                {message}
              </Label>
            ))}
          </Grid.Column>
        </Grid.Row>
        {description && (
          <Grid.Row stretched>
            <Grid.Column stretched width="12">
              <p className="help">{description}</p>
            </Grid.Column>
          </Grid.Row>
        )}
      </Grid>
    </Form.Field>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
SelectWidget.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  required: PropTypes.bool,
  error: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.string,
  choices: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
  onChange: PropTypes.func,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  intl: intlShape.isRequired,
};

/**
 * Default properties.
 * @property {Object} defaultProps Default properties.
 * @static
 */
SelectWidget.defaultProps = {
  description: null,
  required: false,
  error: [],
  value: '',
  choices: [],
  onChange: null,
  onEdit: null,
  onDelete: null,
};

export default injectIntl(SelectWidget);
