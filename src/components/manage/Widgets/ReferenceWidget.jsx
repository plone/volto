/**
 * ReferenceWidget component.
 * @module components/manage/Widgets/ReferenceWidget
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Grid, Label, Dropdown } from 'semantic-ui-react';
import { compact, concat, fromPairs, map, values, uniqBy } from 'lodash';
import { defineMessages, injectIntl, intlShape } from 'react-intl';
import { bindActionCreators } from 'redux';
import config from '~/config';
import ReferenceWidgetItem from './ReferenceWidgetItem';
import ReferenceWidgetItemHeader from './ReferenceWidgetItemHeader';
import { resetSearchContent, searchContent } from '../../../actions';

const messages = defineMessages({
  no_results_found: {
    id: 'No results found.',
    defaultMessage: 'No results found.',
  },
});

@injectIntl
@connect(
  state => ({
    search: state.search.items,
    context: state.content.data,
  }),
  dispatch =>
    bindActionCreators({ resetSearchContent, searchContent }, dispatch),
)
/**
 * ReferenceWidget component class.
 * @class ReferenceWidget
 * @extends Component
 */
export default class ReferenceWidget extends Component {
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
    value: PropTypes.oneOfType([
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
    intl: intlShape.isRequired,
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
    multiple: true, // BBB: this need to be fixed. Now arrives a list
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Actions
   */
  constructor(props) {
    super(props);
    const hasValue = props.multiple
      ? props.value && props.value.length > 0
      : props.value !== undefined;
    this.state = {
      selectedFolder: null,
      choices: hasValue
        ? props.multiple
          ? fromPairs(
              map(props.value, value => [
                value['@id'],
                this.generateDropdownOptions(value),
              ]),
            )
          : {
              [props.value['@id']]: this.generateDropdownOptions(props.value),
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
            uniqBy(compact(concat(nextProps.value, nextProps.search)), '@id'),
            value => [value['@id'], this.generateDropdownOptions(value)],
          ),
        ),
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
  onSearchChange = (event, data) => {
    if (data.searchQuery && data.searchQuery !== '') {
      const query = {
        Title: `*${data.searchQuery}*`,
        metadata_fields: ['is_folderish'],
      };
      this.setState({ selectedFolder: null });
      this.props.searchContent('', query);
    } else {
      this.props.resetSearchContent();
    }
  };

  /**
   * On select folder handler
   * @method onSelectFolder
   * @param {object} data context data.
   * @returns {undefined}
   */
  onSelectFolder = data => {
    this.setState({ selectedFolder: data });
    const query = {
      'path.depth': 1,
      sort_on: 'getObjPositionInParent',
      sort_order: 'ascending',
      metadata_fields: ['is_folderish'],
    };
    this.props.searchContent(
      data ? data['@id'].replace(config.apiPath, '') : '',
      query,
    );
  };

  /**
   * Generate dropdown options
   * @method generateDropdownOptions
   * @param {object} data option data.
   * @returns {object} option.
   */
  generateDropdownOptions = data => {
    return {
      key: data['@id'],
      text: data.title,
      value: data['@id'],
      content: (
        <ReferenceWidgetItem data={data} onSelectFolder={this.onSelectFolder} />
      ),
      data,
    };
  };

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
      context,
    } = this.props;
    const { selectedFolder } = this.state;
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
                multiple
                header={
                  <ReferenceWidgetItemHeader
                    data={selectedFolder}
                    onSelectFolder={this.onSelectFolder}
                  />
                }
                noResultsMessage={this.props.intl.formatMessage(
                  messages.no_results_found,
                )}
                value={
                  multiple
                    ? value && value.length
                      ? map(value, item => item['@id'])
                      : []
                    : value && value.length > 0 ? value['@id'] : ''
                }
                onChange={(event, data) => {
                  onChange(
                    id,
                    multiple
                      ? map(data.value, item => this.state.choices[item].data)
                      : this.state.choices[data.value].data,
                  );
                }}
                onSearchChange={this.onSearchChange}
                onOpen={() =>
                  this.onSelectFolder({
                    '@id': context['@id'],
                  })
                }
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
