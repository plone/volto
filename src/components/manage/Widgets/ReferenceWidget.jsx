/**
 * ReferenceWidget component.
 * @module components/manage/Widgets/ReferenceWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Form, Grid, Label, Dropdown } from 'semantic-ui-react';
import { compact, concat, fromPairs, map, values, uniqBy } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { settings } from '~/config';

import { resetSearchContent, searchContent } from '../../../actions';

const messages = defineMessages({
  no_results_found: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
});

/**
 * ReferenceWidget component class.
 * @class ReferenceWidget
 * @extends Component
 */
class ReferenceWidget extends Component {
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
    multiple: PropTypes.bool,
    error: PropTypes.arrayOf(PropTypes.string),
    value: PropTypes.oneOf([
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.object,
    ]),
    onChange: PropTypes.func.isRequired,
    resetSearchContent: PropTypes.func.isRequired,
    searchContent: PropTypes.func.isRequired,
    search: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        '@type': PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
      }),
    ),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    description: null,
    required: false,
    error: [],
    search: [],
    value: null,
    multiple: false,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.state = {
      choices: props.value
        ? props.multiple
          ? fromPairs(
              map(props.value, value => [
                value['@id'],
                {
                  key: value['@id'],
                  text: value.title,
                  value: value['@id'],
                  label: {
                    content: value['@id'].replace(settings.apiPath, ''),
                  },
                  data: value,
                },
              ]),
            )
          : {
              [props.value['@id']]: {
                key: props.value['@id'],
                text: props.value.title,
                value: props.value['@id'],
                label: {
                  content: props.value['@id'].replace(settings.apiPath, ''),
                },
                data: props.value,
              },
              novalue: {
                key: 'novalue',
                text: 'No value',
                value: 'novalue',
                data: null,
              },
            }
        : {},
    };
  }

  /**
   * Component will mount
   * @method componentWillMount
   * @returns {undefined}
   */
  componentWillMount() {
    this.props.resetSearchContent();
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    this.setState({
      choices: {
        ...fromPairs(
          map(
            uniqBy(
              map(compact(concat(nextProps.value, nextProps.search)), item => ({
                ...item,
                '@id': item['@id'].replace(settings.apiPath, ''),
              })),
              '@id',
            ),
            value => [
              value['@id'],
              {
                key: value['@id'],
                text: value.title,
                value: value['@id'],
                label: {
                  content: value['@id'],
                },
                data: value,
              },
            ],
          ),
        ),
        novalue: {
          key: 'novalue',
          text: 'No value',
          value: 'novalue',
          data: null,
        },
      },
    });
  }

  /**
   * On search change handler
   * @method onSearchChange
   * @param {object} event Event object.
   * @param {object} data Event data.
   * @returns {undefined}
   */
  onSearchChange(event, data) {
    if (data.searchQuery && data.searchQuery !== '') {
      this.props.searchContent('', {
        Title: `*${data.searchQuery}*`,
      });
    } else {
      this.props.resetSearchContent();
    }
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
      multiple,
      onChange,
      fieldSet,
    } = this.props;
    return (
      <Form.Field
        inline
        required={required}
        error={error.length > 0}
        className={description ? 'help' : ''}
        id={`${fieldSet || 'field'}-${id}`}
      >
        <Grid>
          <Grid.Row stretched>
            <Grid.Column width="4">
              <div className="wrapper">
                <label htmlFor={`field-${id}`}>{title}</label>
              </div>
            </Grid.Column>
            <Grid.Column width="8">
              <Dropdown
                options={values(this.state.choices)}
                placeholder={title}
                search
                selection
                fluid
                noResultsMessage={this.props.intl.formatMessage(
                  messages.no_results_found,
                )}
                value={
                  multiple
                    ? value
                      ? map(value, item =>
                          item['@id'].replace(settings.apiPath, ''),
                        )
                      : []
                    : value
                    ? value['@id'].replace(settings.apiPath, '')
                    : ''
                }
                onChange={(event, data) =>
                  onChange(
                    id,
                    multiple
                      ? map(data.value, item => this.state.choices[item].data)
                      : this.state.choices[data.value].data,
                  )
                }
                onSearchChange={this.onSearchChange}
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
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      search: state.search.items,
    }),
    { resetSearchContent, searchContent },
  ),
)(ReferenceWidget);
