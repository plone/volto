/**
 * Moderate comments component.
 * @module components/manage/Controlpanels/Aliases
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getBaseUrl, getParentUrl, Helmet } from '@plone/volto/helpers';
import { Portal } from 'react-portal';
import {
  Container,
  Button,
  Segment,
  Form,
  Checkbox,
  Header,
  Input,
  Radio,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';

import { removeAliases, addAliases, getAliases } from '@plone/volto/actions';

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import DatetimeWidget from '@plone/volto/components/manage/Widgets/DatetimeWidget';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  aliases: {
    id: 'URL Management',
    defaultMessage: 'URL Management',
  },
});

const filterChoices = [
  { label: 'Both', value: 'both' },
  { label: 'Automatically', value: 'automatically' },
  { label: 'Manually', value: 'manually' },
];

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
    addAliases: PropTypes.func.isRequired,
    getAliases: PropTypes.func.isRequired,
    removeAliases: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Comments
   */
  constructor(props) {
    super(props);
    this.state = {
      isClient: false,
      filterType: filterChoices[0],
      createdBefore: null,
      altUrlPath: '',
      isAltUrlCorrect: false,
      targetUrlPath: '',
      isTargetUrlCorrect: false,
      aliasesToRemove: [],
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
    this.props.getAliases(getBaseUrl(this.props.pathname));
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    if (prevState.altUrlPath !== this.state.altUrlPath) {
      if (this.state.altUrlPath.charAt(0) === '/') {
        this.setState({ isAltUrlCorrect: true });
      } else {
        this.setState({ isAltUrlCorrect: false });
      }
    }

    if (prevState.targetUrlPath !== this.state.targetUrlPath) {
      if (this.state.targetUrlPath.charAt(0) === '/') {
        this.setState({ isTargetUrlCorrect: true });
      } else {
        this.setState({ isTargetUrlCorrect: false });
      }
    }
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {}

  /**
   * Back/Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getParentUrl(this.props.pathname));
  }

  /**
   * Select filter type handler
   * @method handleSelectFilterType
   * @returns {undefined}
   */
  handleSelectFilterType = (type) => {
    this.setState({ filterType: type });
  };

  /**
   * Select Creation date handler
   * @method handleCreateDate
   * @returns {undefined}
   */
  handleCreateDate = (date) => {
    this.setState({ createdBefore: date });
  };

  /**
   * Alternative url handler
   * @method handleAltUrlChange
   * @returns {undefined}
   */
  handleAltUrlChange(url) {
    this.setState({ altUrlPath: url });
  }

  /**
   * Target url handler
   * @method handleTargetUrlChange
   * @returns {undefined}
   */
  handleTargetUrlChange(url) {
    this.setState({ targetUrlPath: url });
  }

  /**
   * New alias submit handler
   * @method handleSubmitAlias
   * @returns {undefined}
   */
  handleSubmitAlias = () => {
    if (this.state.isAltUrlCorrect && this.state.isTargetUrlCorrect) {
      // console.log('new alias', this.state.altUrlPath, this.state.targetUrlPath);
      // this.props.addAliases(getParentUrl(this.props.pathname), {
      //   aliases: this.state.newAlias,
      // });
      // this.setState({ newAlias: '' });
      this.setState({ altUrlPath: '', targetUrlPath: '' });
    }
  };

  /**
   * Check to-remove aliases handler
   * @method handleSubmitAlias
   * @returns {undefined}
   */
  handleCheckAlias = (alias) => {
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
  };

  /**
   * Remove aliases handler
   * @method handleRemoveAliases
   * @returns {undefined}
   */
  handleRemoveAliases = () => {
    this.props.removeAliases('', {
      aliases: this.state.aliasesToRemove,
    });
    this.setState({ aliasesToRemove: [] });
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-aliases">
        <Helmet title={this.props.intl.formatMessage(messages.aliases)} />
        <Container>
          <article id="content">
            <Segment.Group raised>
              <Segment className="primary">
                <FormattedMessage
                  id="URL Management"
                  defaultMessage="URL Management"
                  values={{ title: <q>{this.props.title}</q> }}
                />
              </Segment>
              <Form>
                <Segment>
                  <Header size="medium">
                    <FormattedMessage
                      id="Alternative url path (Required)"
                      defaultMessage="Alternative url path (Required)"
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
                      name="alternative-url-path"
                      placeholder="/example"
                      value={this.state.altUrlPath}
                      onChange={(e) => this.handleAltUrlChange(e.target.value)}
                    />
                    {!this.state.isAltUrlCorrect &&
                      this.state.altUrlPath !== '' && (
                        <p style={{ color: 'red' }}>
                          <FormattedMessage
                            id="Alternative url path must start with a slash."
                            defaultMessage="Alternative url path must start with a slash."
                          />
                        </p>
                      )}
                  </Form.Field>
                  <Header size="medium">
                    <FormattedMessage
                      id="Target Path (Required)"
                      defaultMessage="Target Path (Required)"
                    />
                  </Header>
                  <p className="help">
                    <FormattedMessage
                      id="Enter the absolute path of the target. The path must start with '/'. Target must exist or be an existing alternative url path to the target."
                      defaultMessage="Enter the absolute path of the target. The path must start with '/'. Target must exist or be an existing alternative url path to the target."
                    />
                  </p>
                  <Form.Field>
                    <Input
                      name="target-url-path"
                      placeholder="/example"
                      value={this.state.targetUrlPath}
                      onChange={(e) =>
                        this.handleTargetUrlChange(e.target.value)
                      }
                    />
                    {!this.state.isTargetUrlCorrect &&
                      this.state.targetUrlPath !== '' && (
                        <p style={{ color: 'red' }}>
                          <FormattedMessage
                            id="Target url path must start with a slash."
                            defaultMessage="Target url path must start with a slash."
                          />
                        </p>
                      )}
                  </Form.Field>
                  <Button
                    primary
                    onClick={this.handleSubmitAlias}
                    disabled={
                      !this.state.isAltUrlCorrect ||
                      !this.state.isTargetUrlCorrect ||
                      this.state.altUrlPath === '' ||
                      this.state.targetUrlPath === ''
                    }
                  >
                    <FormattedMessage id="Add" defaultMessage="Add" />
                  </Button>
                </Segment>
              </Form>
              <Form>
                <Segment className="primary">
                  <Header size="medium">
                    <FormattedMessage
                      id="All existing alternative urls for this site"
                      defaultMessage="All existing alternative urls for this site"
                    />
                  </Header>
                  <Header size="small">
                    <FormattedMessage
                      id="Filter by prefix"
                      defaultMessage="Filter by prefix"
                    />
                  </Header>
                  <Form.Field>
                    <Input name="filter" placeholder="/example" />
                  </Form.Field>
                  <Header size="small">
                    <FormattedMessage
                      id="Manually or automatically added?"
                      defaultMessage="Manually or automatically added?"
                    />
                  </Header>
                  {filterChoices.map((o, i) => (
                    <Form.Field key={i}>
                      <Radio
                        label={o.label}
                        name="radioGroup"
                        value={o.value}
                        checked={this.state.filterType === o}
                        onChange={() => this.handleSelectFilterType(o)}
                      />
                    </Form.Field>
                  ))}
                  <Form.Field>
                    <DatetimeWidget
                      id="created-before-date"
                      title={'Created before'}
                      dateOnly={true}
                      value={this.state.createdBefore}
                      onChange={(id, value) => {
                        this.handleCreateDate(value);
                      }}
                    />
                  </Form.Field>
                  <Button
                    onClick={() => {
                      // console.log(this.state.createdBefore);
                    }}
                    primary
                  >
                    Filter
                  </Button>
                  <Header size="small">
                    <FormattedMessage
                      id="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                      defaultMessage="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                    />
                  </Header>
                  {this.props.aliases?.items?.map((alias, i) => (
                    <Form.Field key={i}>
                      <Checkbox
                        onChange={(e, { value }) =>
                          this.handleCheckAlias(value)
                        }
                        value={alias.path}
                        label={`${alias.path} → ${alias['redirect-to']} (${alias.datetime}, ${alias.manual})`}
                        checked={this.state.aliasesToRemove.includes(
                          alias.path,
                        )}
                      />
                    </Form.Field>
                  ))}
                  <Button onClick={this.handleRemoveAliases} primary>
                    <FormattedMessage
                      id="Remove selected"
                      defaultMessage="Remove selected"
                    />
                  </Button>
                </Segment>
              </Form>
            </Segment.Group>
          </article>
        </Container>
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <Link className="item" to="#" onClick={() => this.onCancel()}>
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
      </div>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      aliases: state.aliases,
      pathname: props.location.pathname,
    }),
    { addAliases, getAliases, removeAliases },
  ),
)(Aliases);
