/**
 * Aliases container.
 * @module components/manage/Aliases/Aliases
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
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
  addAliases,
  getAliases,
  getContent,
} from '@plone/volto/actions';

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { getBaseUrl } from '@plone/volto/helpers';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  aliases: {
    id: 'URL Management',
    defaultMessage: 'URL Management',
  },
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  successAdd: {
    id: 'Alias has been added',
    defaultMessage: 'Alias has been added',
  },
});

/**
 * Aliases class.
 * @class Aliases
 * @extends Component
 */
class Aliases extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    removeAliases: PropTypes.func.isRequired,
    addAliases: PropTypes.func.isRequired,
    getAliases: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Aliases
   */
  constructor(props) {
    super(props);
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
    this.props.getAliases(getBaseUrl(this.props.pathname), {
      query: '',
      manual: '',
      datetime: '',
      batchSize: '',
    });
    this.props.getContent(getBaseUrl(this.props.pathname));
    this.setState({ isClient: true });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.newAlias !== this.state.newAlias) {
      if (this.state.newAlias.charAt(0) === '/') {
        this.setState({ isAliasCorrect: true });
      } else {
        this.setState({ isAliasCorrect: false });
      }
      if (
        this.props.aliases?.items.find(
          (item) => item.path === this.state.newAlias,
        )
      ) {
        this.setState({ isAliasAlready: true });
      } else {
        this.setState({ isAliasAlready: false });
      }
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.aliases.add.loading && nextProps.aliases.add.loaded) {
      if (nextProps.aliases.add.error) {
        this.setState({ isAliasAlready: true });
      } else {
        this.setState({ isAliasAlready: false });
        toast.success(
          <Toast
            success
            title={this.props.intl.formatMessage(messages.success)}
            content={this.props.intl.formatMessage(messages.successAdd)}
          />,
        );
      }
      this.props.getAliases(getBaseUrl(this.props.pathname), {
        query: '',
        manual: '',
        datetime: '',
        batchSize: '',
      });
    }
    if (this.props.aliases.remove.loading && nextProps.aliases.remove.loaded) {
      this.props.getAliases(getBaseUrl(this.props.pathname), {
        query: '',
        manual: '',
        datetime: '',
        batchSize: '',
      });
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
      this.props.addAliases(getBaseUrl(this.props.pathname), {
        items: this.state.newAlias,
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
    this.props.removeAliases(getBaseUrl(this.props.pathname), {
      items: this.state.aliasesToRemove,
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
      <Container id="aliases">
        <Helmet title={this.props.intl.formatMessage(messages.aliases)} />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="URL Management for {title}"
              defaultMessage="URL Management for {title}"
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
              <Header size="medium">
                <FormattedMessage
                  id="Add a new alternative url"
                  defaultMessage="Add a new alternative url"
                />
              </Header>
              <p className="help">
                <FormattedMessage
                  id="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                  defaultMessage="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                />
              </p>
              <Form.Field>
                <Input
                  id="alternative-url-input"
                  name="alternative-url"
                  placeholder="/example"
                  value={this.state.newAlias}
                  onChange={(e) => this.handleAltChange(e.target.value)}
                />
                {!this.state.isAliasCorrect && this.state.newAlias !== '' && (
                  <p style={{ color: 'red' }}>
                    <FormattedMessage
                      id="Alternative url path must start with a slash."
                      defaultMessage="Alternative url path must start with a slash."
                    />
                  </p>
                )}
                {this.state.isAliasAlready && (
                  <p style={{ color: 'red' }}>
                    <FormattedMessage
                      id="The provided alternative url already exists!"
                      defaultMessage="The provided alternative url already exists!"
                    />
                  </p>
                )}
              </Form.Field>
              <Button
                id="submit-alias"
                primary
                onClick={() => this.handleSubmitAlias()}
                disabled={
                  !this.state.isAliasCorrect ||
                  this.state.newAlias === '' ||
                  this.state.isAliasAlready
                }
              >
                <FormattedMessage id="Add" defaultMessage="Add" />
              </Button>
            </Segment>
          </Form>
          <Form>
            <Segment>
              <Header size="medium">
                <FormattedMessage
                  id="Existing alternative urls for this item"
                  defaultMessage="Existing alternative urls for this item"
                />
              </Header>
              {this.props.aliases?.items.map((alias, i) => (
                <Form.Field key={i}>
                  <Checkbox
                    id={`alias-check-${i}`}
                    onChange={(e, { value }) => this.handleCheckAlias(value)}
                    value={alias.path}
                    label={alias.path}
                    checked={this.state.aliasesToRemove.includes(alias.path)}
                  />
                </Form.Field>
              ))}
              <Button
                id="remove-alias"
                onClick={() => this.handleRemoveAliases()}
                primary
                disabled={this.state.aliasesToRemove.length === 0}
              >
                <FormattedMessage id="Remove" defaultMessage="Remove" />
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
                  to={`${getBaseUrl(this.props.pathname)}`}
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
  injectIntl,
  connect(
    (state, props) => ({
      aliases: state.aliases,
      pathname: props.location.pathname,
      title: state.content.data?.title || '',
    }),
    { addAliases, getAliases, removeAliases, getContent },
  ),
)(Aliases);
