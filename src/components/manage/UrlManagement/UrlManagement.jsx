/**
 * UrlManagement container.
 * @module components/manage/UrlManagement/UrlManagement
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link, withRouter } from 'react-router-dom';
import { find, isEqual, map } from 'lodash';
import { Portal } from 'react-portal';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Header,
  Input,
  Segment,
} from 'semantic-ui-react';
import jwtDecode from 'jwt-decode';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { getBaseUrl } from '@plone/volto/helpers';
import { Icon, Toolbar, Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';

import backSVG from '@plone/volto/icons/back.svg';
import { getParentUrl } from '../../../helpers/Url/Url';

const messages = defineMessages({
  searchForUserOrGroup: {
    id: 'Search for user or group',
    defaultMessage: 'Search for user or group',
  },
  inherit: {
    id: 'Inherit permissions from higher levels',
    defaultMessage: 'Inherit permissions from higher levels',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  sharing: {
    id: 'Sharing',
    defaultMessage: 'Sharing',
  },
  urlManagement: {
    id: 'Url management',
    defaultMessage: 'Url management',
  },
  user: {
    id: 'User',
    defaultMessage: 'User',
  },
  group: {
    id: 'Group',
    defaultMessage: 'Group',
  },
  globalRole: {
    id: 'Global role',
    defaultMessage: 'Global role',
  },
  inheritedValue: {
    id: 'Inherited value',
    defaultMessage: 'Inherited value',
  },
  permissionsUpdated: {
    id: 'Permissions updated',
    defaultMessage: 'Permissions updated',
  },
  permissionsUpdatedSuccessfully: {
    id: 'Permissions have been updated successfully',
    defaultMessage: 'Permissions have been updated successfully',
  },
});

/**
 * UrlManagement class.
 * @class UrlManagement
 * @extends Component
 */
class UrlManagement extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    updateSharing: PropTypes.func.isRequired,
    getSharing: PropTypes.func.isRequired,
    updateRequest: PropTypes.shape({
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
    available_roles: PropTypes.arrayOf(PropTypes.object).isRequired,
    inherit: PropTypes.bool,
    title: PropTypes.string.isRequired,
    login: PropTypes.string,
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
      isClient: false,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    // this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
    this.setState({ isClient: true });
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.updateRequest.loading && nextProps.updateRequest.loaded) {
      // this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.permissionsUpdated)}
          content={this.props.intl.formatMessage(
            messages.permissionsUpdatedSuccessfully,
          )}
        />,
      );
    }
    this.setState({
      inherit:
        this.props.inherit === null ? nextProps.inherit : this.state.inherit,
      entries: map(nextProps.entries, (entry) => {
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
    this.props.updateSharing(getBaseUrl(this.props.pathname), data);
  }

  /**
   * Search handler
   * @method onSearch
   * @param {object} event Event object.
   * @returns {undefined}
   */
  onSearch(event) {
    event.preventDefault();
    // this.props.getSharing(getBaseUrl(this.props.pathname), this.state.search);
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
    const [principal, role] = value.split(':');
    this.setState({
      entries: map(this.state.entries, (entry) => ({
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
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getBaseUrl(this.props.pathname));
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Container id="url-management">
        <Helmet title={this.props.intl.formatMessage(messages.urlManagement)} />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Url management for {title}"
              defaultMessage="Url management for {title}"
              values={{ title: <q>{this.props.title}</q> }}
            />
          </Segment>
          <Segment secondary>
            <FormattedMessage
              id="Using this form, you can manage alternative urls for an item. This is an easy way to make an item available under two different URLs."
              defaultMessage="Using this form, you can manage alternative urls for an item. This is an easy way to make an item available under two different URLs."
            />
          </Segment>
          <Segment>
            {/* <Form onSubmit={this.onSearch}>
              <Form.Field>
                <Input
                  name="SearchableText"
                  action={{ icon: 'search' }}
                  placeholder={this.props.intl.formatMessage(
                    messages.searchForUserOrGroup,
                  )}
                  onChange={this.onChangeSearch}
                />
              </Form.Field>
            </Form> */}
          </Segment>
          <Form>
            <Segment>
              <Header size="medium">Add a new alternative url</Header>
              <p className="help">
                <FormattedMessage
                  id="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                  defaultMessage="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                />
              </p>
              <Form.Field>
                <Input
                  name="alternative-url"
                  placeholder="/example"
                  //onChange={(e) => console.log(e.target.value)}
                />
              </Form.Field>
              <Button primary>Add</Button>
            </Segment>
          </Form>
          <Form>
            <Segment>
              <Header size="medium">
                Existing alternative urls for this item
              </Header>
              {[1, 2, 3].map(() => (
                <Form.Field>
                  <Checkbox
                    //onChange={() => console.log('check')}
                    value={`firstaltlink`}
                    label={'firstaltlink'}
                    checked={false}
                  />
                </Form.Field>
              ))}
              <Button
                // onClick={() =>
                //   console.log(
                //     getParentUrl(this.props.pathname),
                //     'handleremoveselected',
                //   )
                // }
                primary
              >
                Remove
              </Button>
            </Segment>
          </Form>
        </Segment.Group>
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link
                  to={`${getParentUrl(this.props.pathname)}`}
                  className="item"
                >
                  <Icon
                    name={backSVG}
                    className="contents circled"
                    size="30px"
                    title={this.props.intl.formatMessage(messages.back)}
                  />
                </Link>
              }
            />
          </Portal>
        )}
      </Container>
    );
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      state: state,
      entries: state.sharing.data.entries,
      inherit: state.sharing.data.inherit,
      available_roles: state.sharing.data.available_roles,
      updateRequest: state.sharing.update,
      pathname: props.location.pathname,
      title: state.content.data.title,
      login: state.userSession.token
        ? jwtDecode(state.userSession.token).sub
        : '',
    }),
    //  { updateSharing, getSharing },
  ),
)(UrlManagement);
