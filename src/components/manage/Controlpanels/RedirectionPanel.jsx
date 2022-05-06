/**
 * Moderate comments component.
 * @module components/manage/Controlpanels/RedirectionPanel
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getParentUrl, Helmet } from '@plone/volto/helpers';
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

import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import DatetimeWidget from '@plone/volto/components/manage/Widgets/DatetimeWidget';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  RedirectionPanel: {
    id: 'Moderate comments',
    defaultMessage: 'Moderate comments',
  },
});

const filterChoices = [
  { label: 'Both', value: 'both' },
  { label: 'Automatically', value: 'automatically' },
  { label: 'Manually', value: 'manually' },
];

/**
 * RedirectionPanelComponent class.
 * @class RedirectionPanel
 * @extends Component
 */
class RedirectionPanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    searchContent: PropTypes.func.isRequired,
    deleteComment: PropTypes.func.isRequired,
    items: PropTypes.arrayOf(
      PropTypes.shape({
        '@id': PropTypes.string,
        author_name: PropTypes.string,
        creation_date: PropTypes.string,
        text: PropTypes.shape({
          data: PropTypes.string,
        }),
        is_deletable: PropTypes.bool,
        is_editable: PropTypes.bool,
      }),
    ).isRequired,
    deleteRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Comments
   */
  constructor(props) {
    super(props);
    this.handleSelectFilterType = this.handleSelectFilterType.bind(this);
    this.handleCreateDate = this.handleCreateDate.bind(this);
    this.state = {
      showEdit: false,
      editId: null,
      editText: null,
      isClient: false,
      filterType: filterChoices[0],
      createdBefore: null,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({ isClient: true });
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate() {
    console.log('stateupdated', this.state);
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
  handleSelectFilterType(type) {
    this.setState({ filterType: type });
  }

  /**
   * Select Creation date handler
   * @method handleCreateDate
   * @returns {undefined}
   */
  handleCreateDate(date) {
    this.setState({ createdBefore: date });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div id="page-url-management">
        <Helmet
          title={this.props.intl.formatMessage(messages.RedirectionPanel)}
        />
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
                  <Header size="medium">Alternative url path (Required)</Header>
                  <p className="help">
                    <FormattedMessage
                      id="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                      defaultMessage="Enter the absolute path where the alternative url should exist. The path must start with '/'. Only urls that result in a 404 not found page will result in a redirect occurring."
                    />
                  </p>
                  <Form.Field>
                    <Input name="alternative-url-path" placeholder="/example" />
                    {!this.state.isAliasCorrect &&
                      this.state.newAlias !== '' && (
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
                  <Header size="medium">Target Path (Required)</Header>
                  <p className="help">
                    <FormattedMessage
                      id="Enter the absolute path of the target. The path must start with '/'. Target must exist or be an existing alternative url path to the target."
                      defaultMessage="Enter the absolute path of the target. The path must start with '/'. Target must exist or be an existing alternative url path to the target."
                    />
                  </p>
                  <Form.Field>
                    <Input name="target-url-path" placeholder="/example" />
                    {!this.state.isAliasCorrect &&
                      this.state.newAlias !== '' && (
                        <p style={{ color: 'red' }}>
                          Target url path must start with a slash.
                        </p>
                      )}
                  </Form.Field>
                  <Button
                    primary
                    //   onClick={this.handleSubmitAlias}
                  >
                    Add
                  </Button>
                </Segment>
              </Form>
              <Form>
                <Segment className="primary">
                  <Header size="medium">
                    All existing alternative urls for this site
                  </Header>
                  <Header size="small">Filter by prefix</Header>
                  <Form.Field>
                    <Input name="filter" placeholder="/" />
                  </Form.Field>
                  <Header size="small">Manually or automatically added?</Header>
                  {filterChoices.map((o, i) => (
                    <Form.Field>
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
                    onClick={() => console.log(this.state.createdBefore)}
                    primary
                  >
                    Filter
                  </Button>
                  <Header size="small">
                    Alternative url path → target url path (date and time of
                    creation, manually created yes/no)
                  </Header>
                  {/* {this.props.aliases &&
                    this.props.aliases.length > 0 &&
                    this.props.aliases.map((alias, i) => (
                      <Form.Field key={i}>
                        <Checkbox
                          // onChange={(e, { value }) =>
                          //   this.handleCheckAlias(value)
                          // }
                          value={alias}
                          label={alias}
                          checked={this.state.aliasesToRemove.includes(alias)}
                        />
                      </Form.Field>
                    ))} */}
                  <Button
                    onClick={() => console.log(this.state.createdBefore)}
                    primary
                  >
                    Remove selected
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
      items: state.search.items,
      deleteRequest: state.comments.delete,
      pathname: props.location.pathname,
    }),
    // { deleteComment, searchContent },
  ),
)(RedirectionPanel);
