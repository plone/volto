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
import { find, isEqual, pickBy, map } from 'lodash';
import { Button, Checkbox, Form, Icon, Input, Table } from 'semantic-ui-react';

import { editSharing, getSharing } from '../../../actions';
import { getBaseUrl } from '../../../helpers';

/**
 * SharingComponent class.
 * @class SharingComponent
 * @extends Component
 */
@connect(
  (state, props) => ({
    entries: state.sharing.data.entries,
    inherit: state.sharing.data.inherit,
    available_roles: state.sharing.data.available_roles,
    editRequest: state.sharing.edit,
    pathname: props.location.pathname,
    title: state.content.data.title,
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
        disabled: PropTypes.bool,
        login: PropTypes.string,
        roles: PropTypes.object,
        title: PropTypes.string,
        type: PropTypes.string,
      }),
    ).isRequired,
    available_roles: PropTypes.arrayOf(PropTypes.string).isRequired,
    inherit: PropTypes.bool,
    title: PropTypes.string.isRequired,
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    inherit: null,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
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
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  componentWillReceiveProps(nextProps) {
    if (this.props.editRequest.loading && nextProps.editRequest.loaded) {
      this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
    }
    this.setState({
      inherit: this.props.inherit === null
        ? nextProps.inherit
        : this.state.inherit,
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
   * @returns {undefined}
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
   * @returns {undefined}
   */
  onSearch(event) {
    event.preventDefault();
    this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
  }

  /**
   * On change search handler
   * @method onChangeSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onChangeSearch(event) {
    this.setState({
      search: event.target.value,
    });
  }

  /**
   * On toggle inherit handler
   * @method onToggleInherit
   * @returns {undefined}
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
   * @returns {undefined}
   */
  onChange(event, { value }) {
    const [principal, role] = value.split('.');
    this.setState({
      entries: map(this.state.entries, entry => ({
        ...entry,
        roles: entry.id === principal
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
   * @returns {undefined}
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
        <h1>Sharing for <q>{this.props.title}</q></h1>
        <p className="description">
          You can control who can view and edit your item using the list below.
        </p>
        <Form onSubmit={this.onSearch}>
          <Form.Field>
            <Input
              name="SearchableText"
              action="Search"
              placeholder="Search for user or group"
              onChange={this.onChangeSearch}
            />
          </Form.Field>
        </Form>
        <br />
        <Form onSubmit={this.onSubmit}>
          <Table celled padded striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Name</Table.HeaderCell>
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
                    />
                    {' '}
                    {entry.title}
                    {entry.login && ` (${entry.login})`}
                  </Table.Cell>
                  {this.props.available_roles.map(role => (
                    <Table.Cell key={role}>
                      {entry.roles[role] === 'global' &&
                        <Icon
                          name="check circle outline"
                          title="Global role"
                          color="blue"
                        />}
                      {entry.roles[role] === 'acquired' &&
                        <Icon
                          name="check circle"
                          color="green"
                          title="Inherited value"
                        />}
                      {typeof entry.roles[role] === 'boolean' &&
                        <Checkbox
                          onChange={this.onChange}
                          value={`${entry.id}.${role}`}
                          checked={entry.roles[role]}
                          disabled={entry.disabled}
                        />}
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
              label="Inherit permissions from higher levels"
            />
          </Form.Field>
          <p className="help">
            By default, permissions from the container of this item are
            inherited. If you disable this, only the explicitly defined sharing
            permissions will be valid. In the overview, the symbol
            {' '}
            <Icon name="check circle" color="green" />
            {' '}
            indicates an inherited value. Similarly, the symbol
            {' '}
            <Icon name="check circle outline" color="blue" />
            {' '}
            indicates a
            global role, which is managed by the site administrator.
          </p>
          <Button primary type="submit">Save</Button>
          <Button onClick={this.onCancel}>Cancel</Button>
        </Form>
      </div>
    );
  }
}
