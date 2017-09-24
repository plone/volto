/**
 * Diff component.
 * @module components/manage/Diff/Diff
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { filter, isEqual, map } from 'lodash';
import { Button, Dropdown, Grid, Table } from 'semantic-ui-react';
import { browserHistory } from 'react-router';
import moment from 'moment';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { getDiff, getSchema, getHistory } from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import { DiffField } from '../../../components';

const messages = defineMessages({
  diff: {
    id: 'Diff',
    defaultMessage: 'Diff',
  },
});

@injectIntl
@connect(
  (state, props) => ({
    data: state.diff.data,
    history: state.history.entries,
    schema: state.schema.schema,
    pathname: props.location.pathname,
    one: props.location.query.one,
    two: props.location.query.two,
    view: props.location.query.view || 'split',
    title: state.content.data.title,
    type: state.content.data['@type'],
  }),
  dispatch => bindActionCreators({ getDiff, getSchema, getHistory }, dispatch),
)
/**
 * Component to display the diff view.
 * @class DiffComponent
 * @extends Component
 */
export default class DiffComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    /**
     * Action to get a diff
     */
    getDiff: PropTypes.func.isRequired,
    /**
     * Action to get a schema
     */
    getSchema: PropTypes.func.isRequired,
    /**
     * Action to get the history
     */
    getHistory: PropTypes.func.isRequired,
    /**
     * Schema of the object
     */
    schema: PropTypes.objectOf(PropTypes.any),
    /**
     * Pathname of the object
     */
    pathname: PropTypes.string.isRequired,
    /**
     * Url of the first item to compare
     */
    one: PropTypes.string.isRequired,
    /**
     * Url of the second item to compare
     */
    two: PropTypes.string.isRequired,
    /**
     * Type of diff view to display
     */
    view: PropTypes.string.isRequired,
    /**
     * Diff data
     */
    data: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Id of the diff data
         */
        '@id': PropTypes.string,
      }),
    ).isRequired,
    /**
     * History of the item
     */
    history: PropTypes.arrayOf(
      PropTypes.shape({
        /**
         * Version of the history item
         */
        version: PropTypes.number,
        /**
         * Time of the history item
         */
        time: PropTypes.string,
        /**
         * Actor of the history items
         */
        actor: PropTypes.shape({ fullname: PropTypes.string }),
      }),
    ).isRequired,
    /**
     * Title of the object
     */
    title: PropTypes.string.isRequired,
    /**
     * Type of the object
     */
    type: PropTypes.string.isRequired,
    /**
     * i18n object
     */
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs DiffComponent
   */
  constructor(props) {
    super(props);
    this.onChangeOne = this.onChangeOne.bind(this);
    this.onChangeTwo = this.onChangeTwo.bind(this);
    this.onSelectView = this.onSelectView.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   */
  componentDidMount() {
    this.props.getSchema(this.props.type);
    this.props.getHistory(getBaseUrl(this.props.pathname));
    this.props.getDiff(
      getBaseUrl(this.props.pathname),
      this.props.one,
      this.props.two,
    );
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   */
  componentWillReceiveProps(nextProps) {
    if (
      this.props.pathname !== nextProps.pathname ||
      this.props.one !== nextProps.one ||
      this.props.two !== nextProps.two
    ) {
      this.props.getDiff(
        getBaseUrl(nextProps.pathname),
        nextProps.one,
        nextProps.two,
      );
    }
  }

  /**
   * On select view handler
   * @method onSelectView
   * @param {object} event Event object
   * @param {string} value Value
   */
  onSelectView(event, { value }) {
    browserHistory.push(
      `${this.props.pathname}?one=${this.props.one}&two=${this.props
        .two}&view=${value}`,
    );
  }

  /**
   * On change one handler
   * @method onChangeOne
   * @param {object} event Event object
   * @param {string} value Value
   */
  onChangeOne(event, { value }) {
    browserHistory.push(
      `${this.props.pathname}?one=${value}&two=${this.props.two}&view=${this
        .props.view}`,
    );
  }

  /**
   * On change two handler
   * @method onChangeTwo
   * @param {object} event Event object
   * @param {string} value Value
   */
  onChangeTwo(event, { value }) {
    browserHistory.push(
      `${this.props.pathname}?one=${this.props.one}&two=${value}&view=${this
        .props.view}`,
    );
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const versions = map(
      filter(this.props.history, entry => 'version' in entry),
      (entry, index) => ({
        text: `${index === 0 ? 'Current' : entry.version} (${moment(
          entry.time,
        ).format('LLLL')}, ${entry.actor.fullname})`,
        value: `${entry.version}`,
        key: `${entry.version}`,
      }),
    );
    return (
      <div id="page-diff">
        <Helmet title={this.props.intl.formatMessage(messages.diff)} />
        <h1>
          <FormattedMessage
            id="Difference between revision {one} and {two} of {title}"
            defaultMessage="Difference between revision {one} and {two} of {title}"
            values={{
              one: this.props.one,
              two: this.props.two,
              title: this.props.title,
            }}
          />
        </h1>
        <Grid>
          <Grid.Column width={12}>
            <p className="description">
              <FormattedMessage
                id="You can view the difference of the revisions below."
                defaultMessage="You can view the difference of the revisions below."
              />
            </p>
          </Grid.Column>
          <Grid.Column width={4} textAlign="right">
            <Button.Group>
              {map(
                [
                  { id: 'split', label: 'Split' },
                  { id: 'unified', label: 'Unified' },
                ],
                view => (
                  <Button
                    key={view.id}
                    value={view.id}
                    active={this.props.view === view.id}
                    onClick={this.onSelectView}
                  >
                    {view.label}
                  </Button>
                ),
              )}
            </Button.Group>
          </Grid.Column>
        </Grid>
        {this.props.history.length > 0 && (
          <Table basic="very">
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell width={8}>
                  <FormattedMessage id="Base" defaultMessage="Base" />
                  <Dropdown
                    onChange={this.onChangeOne}
                    value={this.props.one}
                    selection
                    fluid
                    options={versions}
                  />
                </Table.HeaderCell>
                <Table.HeaderCell width={8}>
                  <FormattedMessage id="Compare" defaultMessage="Compare" />
                  <Dropdown
                    onChange={this.onChangeTwo}
                    value={this.props.two}
                    selection
                    fluid
                    options={versions}
                  />
                </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
          </Table>
        )}
        {this.props.schema &&
          this.props.data.length > 0 &&
          map(this.props.schema.fieldsets, fieldset =>
            map(
              fieldset.fields,
              field =>
                !isEqual(
                  this.props.data[0][field],
                  this.props.data[1][field],
                ) && (
                  <DiffField
                    one={this.props.data[0][field]}
                    two={this.props.data[1][field]}
                    schema={this.props.schema.properties[field]}
                    view={this.props.view}
                  />
                ),
            ),
          )}
      </div>
    );
  }
}
