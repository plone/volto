/**
 * History component.
 * @module components/manage/History/History
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Dropdown, Icon, Table } from 'semantic-ui-react';
import { concat, map, reverse } from 'lodash';
import moment from 'moment';
import { FormattedMessage } from 'react-intl';

import { getHistory, revertHistory } from '../../../actions';
import { getBaseUrl } from '../../../helpers';
import config from '../../../config';

/**
 * HistoryComponent class.
 * @class HistoryComponent
 * @extends Component
 */
@connect(
  (state, props) => ({
    entries: state.history.entries,
    pathname: props.location.pathname,
    title: state.content.data.title,
    revertRequest: state.history.revert,
  }),
  dispatch => bindActionCreators({ getHistory, revertHistory }, dispatch),
)
export default class HistoryComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getHistory: PropTypes.func.isRequired,
    revertHistory: PropTypes.func.isRequired,
    revertRequest: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        transition_title: PropTypes.string,
        type: PropTypes.string,
        action: PropTypes.string,
        state_title: PropTypes.string,
        time: PropTypes.string,
        comments: PropTypes.string,
        actor: PropTypes.shape({ fullname: PropTypes.string }),
      }),
    ).isRequired,
    title: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Workflow
   */
  constructor(props) {
    super(props);
    this.onRevert = this.onRevert.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getHistory(getBaseUrl(this.props.pathname));
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.revertRequest.loading && nextProps.revertRequest.loaded) {
      this.props.getHistory(getBaseUrl(this.props.pathname));
    }
  }

  /**
   * On revert
   * @method onRevert
   * @param {object} event Event object
   * @param {string} value Value
   * @returns {undefined}
   */
  onRevert(event, { value }) {
    this.props.revertHistory(value.replace(config.apiPath, ''));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const entries = reverse(concat(this.props.entries));
    let title = entries.length > 0 ? entries[0].state_title : '';
    for (let x = 1; x < entries.length; x += 1) {
      entries[x].prev_state_title = title;
      title = entries[x].state_title || title;
    }
    reverse(entries);
    return (
      <div id="page-history">
        <Helmet title="History" />
        <h1>
          <FormattedMessage
            id="History of {title}"
            defaultMessage="History of {title}"
            values={{
              title: <q>{this.props.title}</q>,
            }}
          />
        </h1>
        <p className="description">
          <FormattedMessage
            id="You can view the history of your item below."
            defaultValue="You can view the history of your item below."
          />
        </p>

        <Table selectable compact singleLine>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell width={4}>
                <FormattedMessage id="What" defaultMessage="What" />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage id="Who" defaultMessage="Who" />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage id="When" defaultMessage="When" />
              </Table.HeaderCell>
              <Table.HeaderCell width={4}>
                <FormattedMessage
                  id="Change Note"
                  defaultMessage="Change Note"
                />
              </Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(entries, entry => (
              <Table.Row key={entry.time}>
                <Table.Cell>
                  {('version_id' in entry &&
                    entry.version_id > 0 &&
                    <Link
                      className="item"
                      to={`${getBaseUrl(this.props.pathname)}/diff?one=${entry.version_id - 1}&two=${entry.version_id}`}
                    >
                      {entry.transition_title}
                    </Link>) ||
                    <span>
                      {entry.transition_title}
                      {entry.type === 'workflow' &&
                        ` (${entry.action ? `${entry.prev_state_title} → ` : ''}${entry.state_title})`}
                    </span>}
                </Table.Cell>
                <Table.Cell>{entry.actor.fullname}</Table.Cell>
                <Table.Cell>
                  <span title={moment(entry.time).format('LLLL')}>
                    {moment(entry.time).fromNow()}
                  </span>
                </Table.Cell>
                <Table.Cell>{entry.comments}</Table.Cell>
                <Table.Cell>
                  {entry.type === 'versioning' &&
                    <Dropdown icon="ellipsis vertical">
                      <Dropdown.Menu className="left">
                        {'version_id' in entry &&
                          entry.version_id > 0 &&
                          <Link
                            className="item"
                            to={`${getBaseUrl(this.props.pathname)}/diff?one=${entry.version_id - 1}&two=${entry.version_id}`}
                          >
                            <Icon name="copy" />
                            {' '}
                            <FormattedMessage
                              id="View changes"
                              defaultMessage="View changes"
                            />
                          </Link>}
                        {'version_id' in entry &&
                          <Link
                            className="item"
                            to={`${getBaseUrl(this.props.pathname)}?version_id=${entry.version_id}`}
                          >
                            <Icon name="eye" />
                            {' '}
                            <FormattedMessage
                              id="View this revision"
                              defaultMessage="View this revision"
                            />
                          </Link>}
                        {entry.revert_url &&
                          <Dropdown.Item
                            value={entry.revert_url}
                            onClick={this.onRevert}
                          >
                            <Icon name="undo" />
                            {' '}
                            <FormattedMessage
                              id="Revert to this revision"
                              defaultMessage="Revert to this revision"
                            />
                          </Dropdown.Item>}
                      </Dropdown.Menu>
                    </Dropdown>}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  }
}
