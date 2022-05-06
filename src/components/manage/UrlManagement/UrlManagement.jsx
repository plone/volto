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
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import {
  removeAliases,
  addAlias,
  getAliases,
  getContent,
} from '@plone/volto/actions';

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { getParentUrl } from '@plone/volto/helpers';

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
    removeAliases: PropTypes.func,
    addAlias: PropTypes.func,
    getAliases: PropTypes.func,
    pathname: PropTypes.string.isRequired,
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
   * @constructs Sharing
   */
  constructor(props) {
    super(props);
    this.handleAltChange = this.handleAltChange.bind(this);
    this.handleSubmitAlias = this.handleSubmitAlias.bind(this);
    this.handleCheckAlias = this.handleCheckAlias.bind(this);
    this.handleRemoveAliases = this.handleRemoveAliases.bind(this);
    this.state = {
      isClient: false,
      newAlias: '',
      isAliasCorrect: false,
      isAliasAlready: false,
      aliasesToRemove: [],
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getAliases(getParentUrl(this.props.pathname));
    this.props.getContent(getParentUrl(this.props.pathname));
    this.setState({ isClient: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newAlias !== this.state.newAlias) {
      if (this.state.newAlias.charAt(0) === '/') {
        this.setState({ isAliasCorrect: true });
      } else {
        this.setState({ isAliasCorrect: false });
      }
      if (this.props.aliases.includes(this.state.newAlias)) {
        this.setState({ isAliasAlready: true });
      } else {
        this.setState({ isAliasAlready: false });
      }
    }
  }

  /**
   * Url change handler
   * @method handleAltChange
   * @returns {undefined}
   */
  handleAltChange(val) {
    this.setState({ newAlias: val });
  }

  /**
   * New alias submit handler
   * @method handleSubmitAlias
   * @returns {undefined}
   */
  handleSubmitAlias() {
    if (this.state.isAliasCorrect) {
      this.props.addAlias(getParentUrl(this.props.pathname), {
        aliases: this.state.newAlias,
      });
      this.setState({ newAlias: '' });
    }
  }

  /**
   * Check to-remove aliases handler
   * @method handleSubmitAlias
   * @returns {undefined}
   */
  handleCheckAlias(alias) {
    const aliases = this.state.aliasesToRemove;
    if (aliases.includes(alias)) {
      const index = aliases.indexOf(alias);
      if (index > -1) {
        let newAliasesArr = aliases;
        newAliasesArr.splice(index, 1);
        this.setState({ aliasesToRemove: newAliasesArr });
      }
    } else {
      this.setState({
        aliasesToRemove: [...this.state.aliasesToRemove, alias],
      });
    }
  }

  /**
   * Remove aliases handler
   * @method handleRemoveAliases
   * @returns {undefined}
   */
  handleRemoveAliases() {
    this.props.removeAliases(getParentUrl(this.props.pathname), {
      aliases: this.state.aliasesToRemove,
    });
    this.setState({ aliasesToRemove: [] });
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
                  value={this.state.newAlias}
                  onChange={(e) => this.handleAltChange(e.target.value)}
                />
                {!this.state.isAliasCorrect && this.state.newAlias !== '' && (
                  <p style={{ color: 'red' }}>
                    Alternative url path must start with a slash.
                  </p>
                )}
                {this.state.isAliasAlready && (
                  <p style={{ color: 'red' }}>
                    Alternative url already exists.
                  </p>
                )}
              </Form.Field>
              <Button
                primary
                onClick={this.handleSubmitAlias}
                disabled={
                  !this.state.isAliasCorrect ||
                  this.state.newAlias === '' ||
                  this.state.isAliasAlready
                }
              >
                Add
              </Button>
            </Segment>
          </Form>
          <Form>
            <Segment>
              <Header size="medium">
                Existing alternative urls for this item
              </Header>
              {this.props.aliases &&
                this.props.aliases.length > 0 &&
                this.props.aliases.map((alias, i) => (
                  <Form.Field key={i}>
                    <Checkbox
                      onChange={(e, { value }) => this.handleCheckAlias(value)}
                      value={alias}
                      label={alias}
                      checked={this.state.aliasesToRemove.includes(alias)}
                    />
                  </Form.Field>
                ))}
              <Button
                onClick={this.handleRemoveAliases}
                primary
                disabled={this.state.aliasesToRemove.length === 0}
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
      aliases: state.aliases.data,
      pathname: props.location.pathname,
      title:
        state.content.data !== null && state.content.data.title
          ? state.content.data.title
          : '',
    }),
    { removeAliases, addAlias, getAliases, getContent },
  ),
)(UrlManagement);
