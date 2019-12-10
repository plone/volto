/**
 * QuerystringWidget component.
 * @module components/manage/Widgets/QuerystringWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Button,
  Form,
  Grid,
  Icon as OldIcon,
  Input,
  Label,
} from 'semantic-ui-react';
import { filter, remove, toPairs, groupBy, map } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { getQuerystring } from '../../../actions';
import Select, { components } from 'react-select';
import { Icon } from '@plone/volto/components';

import downSVG from '@plone/volto/icons/down-key.svg';
import upSVG from '@plone/volto/icons/up-key.svg';
import checkSVG from '@plone/volto/icons/check.svg';
import clearSVG from '../../../icons/clear.svg';

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
  required: {
    id: 'Required',
    defaultMessage: 'Required',
  },
});

const Option = props => {
  return (
    <components.Option {...props}>
      <div>{props.label}</div>
      {props.isFocused && !props.isSelected && (
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
    borderBottom: '1px solid #c7d5d8',
    boxShadow: 'none',
    borderBottomStyle: state.menuIsOpen ? 'dotted' : 'solid',
    height: '60px',
  }),
  menu: (styles, state) => ({
    ...styles,
    top: null,
    marginTop: 0,
    boxShadow: 'none',
    borderBottom: '1px solid #c7d5d8',
  }),
  indicatorSeparator: styles => ({
    ...styles,
    width: null,
  }),
  valueContainer: styles => ({
    ...styles,
    paddingLeft: 0,
  }),
  dropdownIndicator: styles => ({
    paddingRight: 0,
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
 * QuerystringWidget component class.
 * @class QuerystringWidget
 * @extends Component
 */
class QuerystringWidget extends Component {
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
    value: PropTypes.array,
    focus: PropTypes.bool,
    onChange: PropTypes.func,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    getQuerystring: PropTypes.func.isRequired,
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
    onChange: null,
    onEdit: null,
    onDelete: null,
    focus: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs EditComponent
   */
  constructor(props) {
    super(props);
    this.state = {
      visual: false,
    };
    this.onChangeValue = this.onChangeValue.bind(this);
    this.getWidget = this.getWidget.bind(this);
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
  }

  /**
   * Get correct widget
   * @method getWidget
   * @param {Object} row Row object.
   * @param {number} index Row index.
   * @returns {Object} Widget.
   */
  getWidget(row, index) {
    const props = {
      fluid: true,
      value: row.v,
      onChange: data => this.onChangeValue(index, data.target.value),
    };
    const values = this.props.indexes[row.i].values;

    switch (this.props.indexes[row.i].operators[row.o].widget) {
      case null:
        return <span />;
      case 'DateWidget':
        return (
          <Form.Field width={4}>
            <Input type="date" {...props} />
          </Form.Field>
        );
      case 'DateRangeWidget': // 2 date inputs
        return (
          <React.Fragment>
            <Form.Field width={2}>
              <Input
                type="date"
                {...props}
                value={row.v[0]}
                onChange={data =>
                  this.onChangeValue(index, [data.target.value, row.v[1]])
                }
              />
            </Form.Field>
            <Form.Field width={2}>
              <Input
                type="date"
                {...props}
                value={row.v[1]}
                onChange={data =>
                  this.onChangeValue(index, [row.v[0], data.target.value])
                }
              />
            </Form.Field>
          </React.Fragment>
        );
      case 'RelativeDateWidget':
        return (
          <Form.Field width={4}>
            <Input step={1} type="number" {...props} />
          </Form.Field>
        );
      case 'MultipleSelectionWidget':
        return (
          <Form.Field width={4}>
            <Select
              {...props}
              className="react-select-container"
              classNamePrefix="react-select"
              options={
                values
                  ? map(toPairs(values), value => ({
                      label: value[1].title,
                      value: value[0],
                    }))
                  : []
              }
              styles={customSelectStyles}
              theme={selectTheme}
              components={{ DropdownIndicator, Option }}
              onChange={data => {
                this.onChangeValue(
                  index,
                  map(data, item => item.value),
                );
              }}
              isMulti={true}
              value={map(row.v, value => ({
                label: values[value].title,
                value,
              }))}
            />
          </Form.Field>
        );
      case 'ReferenceWidget':
      default:
        return (
          <Form.Field width={4}>
            <Input {...props} />
          </Form.Field>
        );
    }
  }

  /**
   * Change value handler
   * @method onChangeValue
   * @param {Number} index Index of the row.
   * @param {String|Array} value Value of the row.
   * @returns {undefined}
   */
  onChangeValue(index, value) {
    this.props.onChange(
      this.props.id,
      map(this.props.value, (row, i) =>
        index === i
          ? {
              ...row,
              v: value,
            }
          : row,
      ),
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
      title,
      required,
      description,
      error,
      value,
      onChange,
      onEdit,
      onDelete,
      indexes,
      intl,
    } = this.props;

    const schema = {
      fieldsets: [
        {
          id: 'default',
          title: intl.formatMessage(messages.default),
          fields: ['title', 'id', 'description', 'required'],
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
        required: {
          type: 'boolean',
          title: intl.formatMessage(messages.required),
        },
      },
      required: ['id', 'title'],
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
                  <button
                    onClick={() => onEdit(id, schema)}
                    className="item ui noborder button"
                  >
                    <OldIcon name="write square" size="large" color="blue" />
                  </button>
                  <button
                    onClick={() => onDelete(id)}
                    className="item ui noborder button"
                  >
                    <Icon name={clearSVG} size="24px" className="close" />
                  </button>
                </div>
              )}
              {map(value, (row, index) => (
                <Form.Group>
                  <Form.Field width={4}>
                    <Select
                      id={`field-${id}`}
                      name={id}
                      disabled={onEdit !== null}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={map(
                        toPairs(
                          groupBy(toPairs(indexes), item => item[1].group),
                        ),
                        group => ({
                          label: group[0],
                          options: map(
                            filter(group[1], item => item[1].enabled),
                            field => ({
                              label: field[1].title,
                              value: field[0],
                            }),
                          ),
                        }),
                      )}
                      styles={customSelectStyles}
                      theme={selectTheme}
                      components={{ DropdownIndicator, Option }}
                      value={{
                        value: row.i,
                        label: indexes[row.i].title,
                      }}
                      onChange={data =>
                        onChange(
                          id,
                          map(value, (curRow, curIndex) =>
                            curIndex === index
                              ? {
                                  i: data.value,
                                  o: indexes[data.value].operations[0],
                                  v: '',
                                }
                              : curRow,
                          ),
                        )
                      }
                    />
                  </Form.Field>
                  <Form.Field width="3">
                    <Select
                      id={`field-${id}`}
                      name={id}
                      disabled={onEdit !== null}
                      className="react-select-container"
                      classNamePrefix="react-select"
                      options={map(indexes[row.i].operations, operation => ({
                        value: operation,
                        label: indexes[row.i].operators[operation].title,
                      }))}
                      styles={customSelectStyles}
                      theme={selectTheme}
                      components={{ DropdownIndicator, Option }}
                      value={{
                        value: row.o,
                        label: indexes[row.i].operators[row.o].title,
                      }}
                      onChange={data =>
                        onChange(
                          id,
                          map(value, (curRow, curIndex) =>
                            curIndex === index
                              ? {
                                  i: row.i,
                                  o: data.value,
                                  v: '',
                                }
                              : curRow,
                          ),
                        )
                      }
                    />
                  </Form.Field>
                  {this.getWidget(row, index)}
                  <Button
                    onClick={event => {
                      onChange(
                        id,
                        remove(value, (v, i) => i !== index),
                      );
                      event.preventDefault();
                    }}
                    style={{
                      background: 'none',
                      paddingRight: 0,
                      paddingLeft: 0,
                    }}
                  >
                    <Icon name={clearSVG} size="24px" className="close" />
                  </Button>
                </Form.Group>
              ))}
              <Form.Group>
                <Form.Field width={4}>
                  <Select
                    id={`field-${id}`}
                    name={id}
                    disabled={onEdit !== null}
                    className="react-select-container"
                    classNamePrefix="react-select"
                    placeholder="Select criteria"
                    options={map(
                      toPairs(groupBy(toPairs(indexes), item => item[1].group)),
                      group => ({
                        label: group[0],
                        options: map(
                          filter(group[1], item => item[1].enabled),
                          field => ({
                            label: field[1].title,
                            value: field[0],
                          }),
                        ),
                      }),
                    )}
                    styles={customSelectStyles}
                    theme={selectTheme}
                    components={{ DropdownIndicator, Option }}
                    value={null}
                    onChange={data => {
                      onChange(id, [
                        ...(value || []),
                        {
                          i: data.value,
                          o: indexes[data.value].operations[0],
                          v: '',
                        },
                      ]);
                    }}
                  />
                </Form.Field>
              </Form.Group>
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
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      indexes: state.querystring.indexes,
    }),
    { getQuerystring },
  ),
)(QuerystringWidget);
