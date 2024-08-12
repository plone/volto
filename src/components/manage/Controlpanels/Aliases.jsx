import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { getBaseUrl, getParentUrl, Helmet } from '@plone/volto/helpers';
import { removeAliases, addAliases, getAliases } from '@plone/volto/actions';
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
  Message,
  Table,
  Pagination,
  Menu,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import DatetimeWidget from '@plone/volto/components/manage/Widgets/DatetimeWidget';
import { Icon, Toolbar } from '@plone/volto/components';

import backSVG from '@plone/volto/icons/back.svg';
import { map } from 'lodash';
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

const filterChoices = [
  { label: 'Both', value: '' },
  { label: 'Automatically', value: 'no' },
  { label: 'Manually', value: 'yes' },
];

const itemsPerPageChoices = [10, 25, 50, 'All'];

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
   * @constructs Aliases
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
      aliasesToRemove: [],
      errorMessageAdd: '',
      filterQuery: '',
      aliases: [],
      activePage: 1,
      pages: '',
      itemsPerPage: 10,
    };
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    const { filterQuery, filterType, createdBefore, itemsPerPage } = this.state;
    this.setState({ isClient: true });
    this.props.getAliases(getBaseUrl(this.props.pathname), {
      query: filterQuery,
      manual: filterType.value,
      datetime: createdBefore,
      batchSize: itemsPerPage,
    });
  }

  /**
   * Component did mount
   * @method componentDidUpdate
   * @returns {undefined}
   */
  componentDidUpdate(prevProps, prevState) {
    const { filterQuery, filterType, createdBefore, itemsPerPage } = this.state;
    if (
      prevProps.aliases.items_total !== this.props.aliases.items_total ||
      prevState.itemsPerPage !== this.state.itemsPerPage
    ) {
      const pages = Math.ceil(
        this.props.aliases.items_total / this.state.itemsPerPage,
      );

      if (pages === 0 || isNaN(pages)) {
        this.setState({ pages: '' });
      } else {
        this.setState({ pages });
      }
    }
    if (
      prevState.activePage !== this.state.activePage ||
      prevState.itemsPerPage !== this.state.itemsPerPage
    ) {
      this.props.getAliases(getBaseUrl(this.props.pathname), {
        query: filterQuery,
        manual: filterType.value,
        datetime: createdBefore,
        batchSize: itemsPerPage === 'All' ? 999999999999 : itemsPerPage,
        batchStart: (this.state.activePage - 1) * this.state.itemsPerPage,
      });
    }
    if (prevState.altUrlPath !== this.state.altUrlPath) {
      if (this.state.altUrlPath.charAt(0) === '/') {
        this.setState({ isAltUrlCorrect: true });
      } else {
        this.setState({ isAltUrlCorrect: false });
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
    if (this.props.aliases.add.loading && !nextProps.aliases.add.loaded) {
      if (nextProps.aliases.add.error) {
        this.setState({
          errorMessageAdd: nextProps.aliases.add.error.response.body.message,
        });
      }
    }
    if (this.props.aliases.add.loading && nextProps.aliases.add.loaded) {
      const {
        filterQuery,
        filterType,
        createdBefore,
        itemsPerPage,
      } = this.state;

      this.props.getAliases(getBaseUrl(this.props.pathname), {
        query: filterQuery,
        manual: filterType.value,
        datetime: createdBefore,
        batchSize: itemsPerPage,
      });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(messages.successAdd)}
        />,
      );
      if (!nextProps.aliases.add.error) {
        this.setState({
          errorMessageAdd: '',
        });
      }
    }
    if (this.props.aliases.remove.loading && nextProps.aliases.remove.loaded) {
      const {
        filterQuery,
        filterType,
        createdBefore,
        itemsPerPage,
      } = this.state;

      this.props.getAliases(getBaseUrl(this.props.pathname), {
        query: filterQuery,
        manual: filterType.value,
        datetime: createdBefore,
        batchSize: itemsPerPage,
      });
    }
  }

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
   * Select filter type handler
   * @method handleFilterQueryChange
   * @returns {undefined}
   */
  handleFilterQueryChange(query) {
    this.setState({ filterQuery: query });
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
   * Select Creation date handler
   * @method handleSubmitFilter
   * @returns {undefined}
   */
  handleSubmitFilter() {
    const { filterQuery, filterType, createdBefore, itemsPerPage } = this.state;
    this.props.getAliases(getBaseUrl(this.props.pathname), {
      query: filterQuery,
      manual: filterType.value,
      datetime: createdBefore,
      batchSize: itemsPerPage,
    });
  }

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
  handleSubmitAlias() {
    if (this.state.isAltUrlCorrect) {
      this.props.addAliases('', {
        items: [
          {
            path: this.state.altUrlPath,
            'redirect-to': this.state.targetUrlPath,
          },
        ],
      });
      this.setState({ altUrlPath: '', targetUrlPath: '' });
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
  handleRemoveAliases = () => {
    const items = this.state.aliasesToRemove.map((a) => {
      return {
        path: a,
      };
    });
    this.props.removeAliases('', {
      items,
    });
    this.setState({ aliasesToRemove: [] });
  };

  /**
   * Pagination change handler
   * @method handlePageChange
   * @returns {undefined}
   */
  handlePageChange(e, { activePage }) {
    this.setState({ activePage });
  }

  /**
   * Items per page change handler
   * @method handleItemsPerPage
   * @returns {undefined}
   */
  handleItemsPerPage(e, { value }) {
    this.setState({ itemsPerPage: value, activePage: 1 });
  }

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
                      id="alternative-url-input"
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
                      id="Enter the absolute path of the target. Target must exist or be an existing alternative url path to the target."
                      defaultMessage="Enter the absolute path of the target. Target must exist or be an existing alternative url path to the target."
                    />
                  </p>
                  <Form.Field>
                    <Input
                      id="target-url-input"
                      name="target-url-path"
                      placeholder="/example"
                      value={this.state.targetUrlPath}
                      onChange={(e) =>
                        this.handleTargetUrlChange(e.target.value)
                      }
                    />
                  </Form.Field>
                  <Button
                    id="submit-alias"
                    primary
                    onClick={() => this.handleSubmitAlias()}
                    disabled={
                      !this.state.isAltUrlCorrect ||
                      this.state.altUrlPath === '' ||
                      this.state.targetUrlPath === ''
                    }
                  >
                    <FormattedMessage id="Add" defaultMessage="Add" />
                  </Button>
                  {this.state.errorMessageAdd && (
                    <Message color="red">
                      <Message.Header>
                        <FormattedMessage
                          id="ErrorHeader"
                          defaultMessage="Error"
                        />
                      </Message.Header>
                      <p>{this.state.errorMessageAdd}</p>
                    </Message>
                  )}
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
                    <Input
                      name="filter"
                      placeholder="/example"
                      value={this.state.filterQuery}
                      onChange={(e) =>
                        this.handleFilterQueryChange(e.target.value)
                      }
                    />
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
                  <Button onClick={() => this.handleSubmitFilter()} primary>
                    Filter
                  </Button>
                  <Header size="small">
                    <FormattedMessage
                      id="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                      defaultMessage="Alternative url path → target url path (date and time of creation, manually created yes/no)"
                    />
                  </Header>

                  <Table>
                    <Table.Body>
                      <Table.Row>
                        <Table.HeaderCell>
                          <FormattedMessage
                            id="Select"
                            defaultMessage="Select"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id="Alias" defaultMessage="Alias" />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage
                            id="Target"
                            defaultMessage="Target"
                          />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage id="Date" defaultMessage="Date" />
                        </Table.HeaderCell>
                        <Table.HeaderCell>
                          <FormattedMessage
                            id="Manual"
                            defaultMessage="Manual"
                          />
                        </Table.HeaderCell>
                      </Table.Row>
                      {this.props.aliases.items.length > 0 &&
                        this.props.aliases.items.map((alias, i) => (
                          <Table.Row key={i}>
                            <Table.Cell>
                              <Checkbox
                                onChange={(e, { value }) =>
                                  this.handleCheckAlias(value)
                                }
                                checked={this.state.aliasesToRemove.includes(
                                  alias.path,
                                )}
                                value={alias.path}
                              />
                            </Table.Cell>
                            <Table.Cell>
                              <p>{alias.path}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p>{alias['redirect-to']}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p>{alias.datetime}</p>
                            </Table.Cell>
                            <Table.Cell>
                              <p>{`${alias.manual}`}</p>
                            </Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    {this.state.pages && (
                      <Pagination
                        boundaryRange={0}
                        activePage={this.state.activePage}
                        ellipsisItem={null}
                        firstItem={null}
                        lastItem={null}
                        siblingRange={1}
                        totalPages={this.state.pages}
                        onPageChange={(e, o) => this.handlePageChange(e, o)}
                      />
                    )}
                    <Menu.Menu
                      position="right"
                      style={{ display: 'flex', marginLeft: 'auto' }}
                    >
                      <Menu.Item style={{ color: 'grey' }}>
                        <FormattedMessage id="Show" defaultMessage="Show" />:
                      </Menu.Item>
                      {map(itemsPerPageChoices, (size) => (
                        <Menu.Item
                          style={{
                            padding: '0 0.4em',
                            margin: '0em 0.357em',
                            cursor: 'pointer',
                          }}
                          key={size}
                          value={size}
                          active={size === this.state.itemsPerPage}
                          onClick={(e, o) => this.handleItemsPerPage(e, o)}
                        >
                          {size}
                        </Menu.Item>
                      ))}
                    </Menu.Menu>
                  </div>
                  <Button
                    disabled={this.state.aliasesToRemove.length === 0}
                    onClick={this.handleRemoveAliases}
                    primary
                  >
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
