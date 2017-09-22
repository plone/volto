/**
 * Sharing container.
 * @module components/manage/Sharing/Sharing
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { browserHistory } from 'react-router';
import { find, isEqual, map } from 'lodash';
import { Button, Checkbox, Form, Icon, Input, Table } from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

import { editSharing, getSharing } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchForUserOrGroup: {
    id: 'Search for user or group',
    defaultMessage: 'Search for user or group',
  },
  inherit: {
    id: 'Inherit permissions from higher levels',
    defaultMessage: 'Inherit permissions from higher levels',
  },
});

/**
 * SharingComponent class.
 * @class SharingComponent
 * @extends Component
 */
@injectIntl
@connect(
  (state, props) => ({
    entries: state.sharing.data.entries,
    inherit: state.sharing.data.inherit,
    available_roles: state.sharing.data.available_roles,
    editRequest: state.sharing.edit,
    pathname: props.location.pathname,
    title: state.content.data.title,
    login: state.userSession.token
      ? jwtDecode(state.userSession.token).sub
      : '',
  }),
  dispatch => bindActionCreators({ editSharing, getSharing }, dispatch),
)
export default class SharingComponent extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    editSharing: PropTypes.func.isRequired,
    getSharing: PropTypes.func.isRequired,
    editRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
    entries: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        login: PropTypes.string,
        roles: PropTypes.object,
        title: PropTypes.string,
        type: PropTypes.string,
      }),
    ).isRequired,
    available_roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    inherit: PropTypes.bool,
    title: PropTypes.string.isRequired,
    login: PropTypes.string,
    intl: intlShape.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    inherit: null,
    login: '',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onToggleInherit = this.onToggleInherit.bind(this);
    this.state = {
      search: '',
      inherit: props.inherit,
      entries: props.entries,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * 
   */
  componentDidMount() {
    this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * 
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.editRequest.loading && nextProps.editRequest.loaded) {
      this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
    }
    this.setState({
      inherit:
        this.props.inherit === null ? nextProps.inherit : this.state.inherit,
      entries: map(nextProps.entries, entry => {
        const values = find(this.state.entries, { id: entry.id });
        return {
          ...entry,
          roles: values ? values.roles : entry.roles,
        };
      }),
    });
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} event Event object.
   * 
   */
  onSubmit(event) {
    const data = { entries: [] };
    event.preventDefault();
    if (this.props.inherit !== this.state.inherit) {
      data.inherit = this.state.inherit;
    }
    for (let i = 0; i < this.props.entries.length; i += 1) {
      if (!isEqual(this.props.entries[i].roles, this.state.entries[i].roles)) {
        data.entries.push({
          id: this.state.entries[i].id,
          type: this.state.entries[i].type,
          roles: this.state.entries[i].roles,
        });
      }
    }
    this.props.editSharing(getBaseUrl(this.props.pathname), data);
  }

  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * 
   */
  onSearch(event) {
    event.preventDefault();
    this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
  }

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * 
   */
  onChangeSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  /**
   * On toggle inherit handler
   * @method onToggleInherit
   * 
   */
  onToggleInherit() {
    this.setState({
      inherit: !this.state.inherit,
    });
  }

  /**
   * On change handler
   * @method onChange
   * @param {object} event Event object
   * @param {string} value Entry value
   * 
   */
  onChange(event, { value }) {
    const [principal, role] = value.split('.');
    this.setState({
      entries: map(this.state.entries, entry => ({
        ...entry,
        roles:
          entry.id === principal
            ? {
                ...entry.roles,
                [role]: !entry.roles[role],
              }
            : entry.roles,
      })),
    });
  }

  /**
   * Cancel handler
   * @method onCancel
   * 
   */
  onCancel() {
    browserHistory.push(getBaseUrl(this.props.pathname));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-sharing">
        <Helmet title="Sharing" />
        <h1>
          <FormattedMessage
            id="Sharing for {title}"
            defaultMessage="Sharing for {title}"
            values={{ title: <q>{this.props.title}</q> }}
          />
        </h1>
        <p className="description">
          <FormattedMessage
            id="You can control who can view and edit your item using the list below."
            defaultMessage="You can control who can view and edit your item using the list below."
          />
        </p>
        <Form onSubmit={this.onSearch}>
          <Form.Field>
            <Input
              name="SearchableText"
              action={this.props.intl.formatMessage(messages.search)}
              placeholder={this.props.intl.formatMessage(
                messages.searchForUserOrGroup,
              )}
              onChange={this.onChangeSearch}
            />
          </Form.Field>
        </Form>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Table celled padded striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>
                  <FormattedMessage id="Name" defaultMessage="Name" />
                </Table.HeaderCell>
                {this.props.available_roles.map(role => (
                  <Table.HeaderCell key={role}>{role}</Table.HeaderCell>
                ))}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.state.entries.map(entry => (
                <Table.Row key={entry.id}>
                  <Table.Cell>
                    <Icon
                      name={entry.type === 'user' ? 'user' : 'users'}
                      title={entry.type === 'user' ? 'User' : 'Group'}
                    />{' '}
                    {entry.title}
                    {entry.login && ` (${entry.login})`}
                  </Table.Cell>
                  {this.props.available_roles.map(role => (
                    <Table.Cell key={role}>
                      {entry.roles[role] === 'global' && (
                        <Icon
                          name="check circle outline"
                          title="Global role"
                          color="blue"
                        />
                      )}
                      {entry.roles[role] === 'acquired' && (
                        <Icon
                          name="check circle"
                          color="green"
                          title="Inherited value"
                        />
                      )}
                      {typeof entry.roles[role] === 'boolean' && (
                        <Checkbox
                          onChange={this.onChange}
                          value={`${entry.id}.${role}`}
                          checked={entry.roles[role]}
                          disabled={entry.login === this.props.login}
                        />
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <Form.Field>
            <Checkbox
              checked={this.state.inherit}
              onChange={this.onToggleInherit}
              label={this.props.intl.formatMessage(messages.inherit)}
            />
          </Form.Field>
          <p className="help">
            <FormattedMessage
              id="By default, permissions from the container of this item are inherited. If you disable this, only the explicitly defined sharing permissions will be valid. In the overview, the symbol {inherited} indicates an inherited value. Similarly, the symbol {global} indicates a global role, which is managed by the site administrator."
              defaultMessage="By default, permissions from the container of this item are inherited. If you disable this, only the explicitly defined sharing permissions will be valid. In the overview, the symbol {inherited} indicates an inherited value. Similarly, the symbol {global} indicates a global role, which is managed by the site administrator."
              values={{
                inherited: <Icon name="check circle" color="green" />,
                global: <Icon name="check circle outline" color="blue" />,
              }}
            />
          </p>
          <Button primary type="submit">
            <FormattedMessage id="Save" defaultMessage="Save" />
          </Button>
          <Button onClick={this.onCancel}>
            <FormattedMessage id="Cancel" defaultMessage="Cancel" />
          </Button>
        </Form>
      </div>
    );
  }
}
