/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UndoControlpanel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import {
  Container,
  Segment,
  Table,
  Menu,
  Input,
  Dimmer,
  Loader,
  Checkbox,
  Confirm,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { Form } from '@plone/volto/components/manage/Form';
import backSVG from '@plone/volto/icons/back.svg';
import map from 'lodash/map';
import remove from 'lodash/remove';
import findIndex from 'lodash/findIndex';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import nextIcon from '@plone/volto/icons/right-key.svg';
import prevIcon from '@plone/volto/icons/left-key.svg';
import undoSVG from '@plone/volto/icons/undo.svg';
import {
  getTransactions,
  revertTransactions,
} from '@plone/volto/actions/transactions/transactions';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import { toast } from 'react-toastify';

const messages = defineMessages({
  success: {
    id: 'Success',
    defaultMessage: 'Success',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  undo: {
    id: 'Undo',
    defaultMessage: 'Undo',
  },
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  filterBy: {
    id: 'Filter transactions by',
    defaultMessage: 'Filter transactions by',
  },
  filterByUsername: {
    id: 'filter by Username',
    defaultMessage: 'Username',
  },
  filterByPath: {
    id: 'filter by Path',
    defaultMessage: 'Path',
  },
  filterByDate: {
    id: 'filter by Date',
    defaultMessage: 'Date',
  },
  filtered: {
    id: 'Filtered',
    defaultMessage: 'Filtered',
  },
  unfiltered: {
    id: 'Unfiltered',
    defaultMessage: 'Unfiltered',
  },
  filterByDescription: {
    id: 'Filter transactions by User, Path or Date',
    defaultMessage: 'Filter transactions by User, Path or Date',
  },
  filterByUsername_filter: {
    id: 'Enter Username',
    defaultMessage: 'Enter Username',
  },
  filterByPath_filter: {
    id: 'Enter Path',
    defaultMessage: 'Enter Path',
  },
  filterByDate_filter: {
    id: 'Enter Date',
    defaultMessage: 'Enter Date and time',
  },
  failedToUndoTransactions: {
    id: 'Failed To Undo Transactions',
    defaultMessage: 'Failed to undo transactions',
  },
  successfullyUndoneTransactions: {
    id: 'Successfully Undone Transactions',
    defaultMessage: 'Successfully undone transactions',
  },
  transactionsHaveBeenFiltered: {
    id: 'Transactions Have Been Filtered',
    defaultMessage: 'Transactions have been filtered',
  },
  transactionsHaveBeenUnfiltered: {
    id: 'Transactions Have Been Unfiltered',
    defaultMessage: 'Transactions have been unfiltered',
  },
  executeUndo: {
    id: 'Are you sure you want to undo selected actions?',
    defaultMessage: 'Are you sure you want to undo selected actions?',
  },
  emptyInputForFiltering: {
    id: 'Please enter any input to perform filter',
    defaultMessage: 'Please enter any input to perform filter',
  },
  prevPage: {
    id: 'Prev page',
    defaultMessage: 'Previous page',
  },
  nextPage: {
    id: 'Next page',
    defaultMessage: 'Next page',
  },
});

/**
 * UndoControlpanel class.
 * @class UndoControlpanel
 * @extends Component
 */
class UndoControlpanel extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    getTransactions: PropTypes.func.isRequired,
    revertTransactions: PropTypes.func.isRequired,
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        size: PropTypes.number,
        time: PropTypes.string,
        username: PropTypes.string,
      }),
    ),
    revertRequest: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
    }).isRequired,
    getRequest: PropTypes.shape({
      loaded: PropTypes.bool,
      loading: PropTypes.bool,
    }).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs UndoControlpanel
   */
  constructor(props) {
    super(props);
    this.state = {
      isClient: false,
      filterType: 'no value',
      lowerIndex: 0,
      upperIndex: 20,
      selectedTransactions: [],
      defaultTransactionsLenInTable: 20,
      isFilterTypeSelected: false,
      filteredTransactions: [],
      isemptyInputForFiltering: false,
      isTransactionsNotFound: false,
      undoRequested: false,
      doUndo: false,
      showPrevButton: false,
      showNextButton: false,
    };
    this.onCancelFilter = this.onCancelFilter.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.handleTableVisiblity = this.handleTableVisiblity.bind(this);
    this.handleNotFilteredNextPrevButtons =
      this.handleNotFilteredNextPrevButtons.bind(this);
    this.handleFilteredNextPrevButtons =
      this.handleFilteredNextPrevButtons.bind(this);
    this.checkTransactionsUndoneStatus =
      this.checkTransactionsUndoneStatus.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.setState({
      isClient: true,
    });
    this.props.getTransactions();
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (this.props.revertRequest.loading && nextProps.revertRequest.loaded) {
      this.props.getTransactions();
      this.setState({ selectedTransactions: [], doUndo: false });
    }
  }

  setfilteredTransactions(filteredTransactions) {
    if (filteredTransactions.length > 0) {
      this.setState({
        lowerIndex: 0,
        upperIndex: this.state.defaultTransactionsLenInTable,
        filteredTransactions: filteredTransactions,
        isemptyInputForFiltering: false,
        isTransactionsNotFound: false,
      });
    } else {
      this.setState({ isTransactionsNotFound: true });
    }
  }

  /**
   * On Cancel
   * @method onCancelFilter
   * @returns {undefined}
   */
  onCancelFilter() {
    if (this.state.filteredTransactions.length > 0) {
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.unfiltered)}
          content={this.props.intl.formatMessage(
            messages.transactionsHaveBeenUnfiltered,
          )}
        />,
      );
    }
    this.setState({
      isFilterTypeSelected: false,
      isTransactionsNotFound: false,
      isemptyInputForFiltering: false,
      filterType: 'no value',
      filteredTransactions: [],
      lowerIndex: 0,
      upperIndex: this.state.defaultTransactionsLenInTable,
    });
  }

  /**
   * On Select
   * @method onSelect
   * @param {object} data
   * @returns {undefined}
   */
  onSelect(data) {
    if (
      data !== null &&
      data.filterTypes !== null &&
      this.state.filterType === data.filterTypes
    ) {
      return;
    }
    let filterType = (data !== null && data.filterTypes) || 'no value';

    if (filterType !== 'no value') {
      this.setState({ isFilterTypeSelected: true, filterType });
    } else {
      this.onCancelFilter();
    }
  }

  /**
   * On Filter
   * @method onFilter
   * @param {object} data
   * @returns {undefined}
   */
  onFilter(data) {
    let filterType = data.filterTypes || 'no value';
    let value;
    (filterType === 'user' && (value = data.filterByUsername)) ||
      (filterType === 'path' && (value = data.filterByPath)) ||
      (filterType === 'date' && (value = data.filterByDate)) ||
      (value = undefined);

    if (filterType !== 'no value' && value !== undefined) {
      let filteredTransactions = [];
      if (filterType === 'user') {
        this.props.transactions.forEach((element) => {
          if (value.trim().toLowerCase() === 'zope' && !element.username) {
            filteredTransactions.push(element);
          } else if (
            element.username
              .trim()
              .toLowerCase()
              .includes(value.trim().toLowerCase())
          ) {
            filteredTransactions.push(element);
          }
        });
        this.setfilteredTransactions(filteredTransactions);
      } else if (filterType === 'path') {
        this.props.transactions.forEach((element) => {
          if (
            element.id.trim().toLowerCase().includes(value.trim().toLowerCase())
          ) {
            filteredTransactions.push(element);
          }
        });
        this.setfilteredTransactions(filteredTransactions);
      } else {
        // MS is Milli Seconds
        let MSInADay = 86400000;
        let timeInMS = Date.parse(value);
        let endInMS = timeInMS + (timeInMS % 60000) + 60000; // next minute
        let startInMS = timeInMS - (timeInMS % MSInADay);

        this.props.transactions.forEach((element) => {
          if (
            endInMS >= Date.parse(element.time) &&
            Date.parse(element.time) >= startInMS
          ) {
            filteredTransactions.push(element);
          }
        });
        this.setfilteredTransactions(filteredTransactions);
      }
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.filtered)}
          content={this.props.intl.formatMessage(
            messages.transactionsHaveBeenFiltered,
          )}
        />,
      );
    } else {
      this.setState({ isemptyInputForFiltering: true });
    }
  }

  /**
   * On Undo
   * @method onUndo
   * @returns {undefined}
   */
  onUndo() {
    const undoTransactionsIds = map(
      this.state.selectedTransactions,
      (transaction) => {
        return transaction.id;
      },
    );

    this.setState({
      undoRequested: true,
    });
    this.props.revertTransactions(undoTransactionsIds);
  }

  /**
   * On Prev
   * @method onPrev
   * @returns {undefined}
   */
  onPrev() {
    0 < this.state.lowerIndex &&
      this.setState({
        upperIndex: this.state.lowerIndex,
        lowerIndex:
          this.state.lowerIndex - this.state.defaultTransactionsLenInTable,
      });
  }

  /**
   * On Next
   * @method onNext
   * @returns {undefined}
   */
  onNext() {
    this.props.transactions.length > this.state.upperIndex &&
      this.setState({
        lowerIndex: this.state.upperIndex,
        upperIndex:
          this.state.upperIndex + this.state.defaultTransactionsLenInTable,
      });
  }

  /**
   * Handle next and prev buttons visibility when transactions are filtered
   * @method handleFilteredNextPrevButtons
   * @returns {undefined}
   */
  handleFilteredNextPrevButtons() {
    this.state.upperIndex >= this.state.filteredTransactions.length &&
      this.state.showNextButton &&
      this.setState({ showNextButton: false });

    this.state.upperIndex < this.state.filteredTransactions.length &&
      !this.state.showNextButton &&
      this.setState({ showNextButton: true });

    this.state.lowerIndex <= 0 &&
      this.state.showPrevButton &&
      this.setState({ showPrevButton: false });

    this.state.lowerIndex > 0 &&
      !this.state.showPrevButton &&
      this.setState({ showPrevButton: true });
  }

  /**
   * Handle next and prev buttons visibility when transactions are not filtered
   * @method handleNotFilteredNextPrevButtons
   * @returns {undefined}
   */
  handleNotFilteredNextPrevButtons() {
    this.state.upperIndex >= this.props.transactions?.length &&
      this.state.showNextButton &&
      this.setState({ showNextButton: false });

    this.state.upperIndex < this.props.transactions?.length &&
      !this.state.showNextButton &&
      this.setState({ showNextButton: true });

    this.state.lowerIndex <= 0 &&
      this.state.showPrevButton &&
      this.setState({ showPrevButton: false });

    this.state.lowerIndex > 0 &&
      !this.state.showPrevButton &&
      this.setState({ showPrevButton: true });
  }

  /**
   * Handle next, prev buttons and table visibility
   * @method handleTableVisiblity
   * @returns {undefined}
   */
  handleTableVisiblity() {
    if (this.state.filteredTransactions.length > 0) {
      this.handleFilteredNextPrevButtons();
    } else if (!this.state.isFilterTypeSelected) {
      this.props.transactions?.length > 0 &&
        this.state.isTransactionsNotFound &&
        this.setState({ isTransactionsNotFound: false });

      this.props.transactions?.length <= 0 &&
        !this.state.isTransactionsNotFound &&
        this.setState({ isTransactionsNotFound: true });

      this.handleNotFilteredNextPrevButtons();
    } else {
      this.handleNotFilteredNextPrevButtons();
    }
  }

  /**
   * Check transactions undone status
   * @method checkTransactionsUndoneStatus
   * @returns {undefined}
   */
  checkTransactionsUndoneStatus() {
    if (
      this.props.revertRequest.error &&
      this.props.revertRequest.error !== null &&
      this.state.undoRequested
    ) {
      this.setState({
        undoRequested: false,
      });
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={this.props.intl.formatMessage(
            messages.failedToUndoTransactions,
          )}
        />,
      );
    } else if (
      this.props.revertRequest.error === null &&
      this.state.undoRequested
    ) {
      this.setState({
        undoRequested: false,
      });
      toast.success(
        <Toast
          success
          title={this.props.intl.formatMessage(messages.success)}
          content={this.props.intl.formatMessage(
            messages.successfullyUndoneTransactions,
          )}
        />,
      );
    }
  }

  toggleCheckedTransactions(t, checked) {
    let list = [...this.state.selectedTransactions];
    if (checked) {
      list.push(t);
    } else {
      remove(list, t);
    }
    this.setState({ selectedTransactions: list });
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const transactionsRange =
      (this.state.filteredTransactions.length > 0 &&
        this.state.filteredTransactions.slice(
          this.state.lowerIndex,
          this.state.upperIndex,
        )) ||
      this.props.transactions?.slice(
        this.state.lowerIndex,
        this.state.upperIndex,
      );
    this.handleTableVisiblity();
    this.checkTransactionsUndoneStatus();

    const TransactionsTable = ({ items, summary = false }) => {
      const elabDescription = (d) => {
        const parts = d
          .replaceAll('\nUndo', '<br/>Undo:')
          .replaceAll('\n', '<br/>')
          .replaceAll(' ', '<br/>')
          .split('<br/>');
        return (
          <>
            {parts.map((p, i) =>
              i === 0 ? (
                <div key={i}>{p}</div>
              ) : (
                <div key={i} style={{ fontStyle: 'italic', color: '#878f93' }}>
                  {p}
                </div>
              ),
            )}
          </>
        );
      };
      return (
        <Table selectable fixed celled compact singleLine attached>
          <Table.Header>
            <Table.Row>
              {!summary && (
                <Table.HeaderCell
                  width={1}
                  textAlign="center"
                  style={{ width: '40px' }}
                >
                  <FormattedMessage
                    id="Transactions Checkbox"
                    defaultMessage="#"
                  />
                </Table.HeaderCell>
              )}
              <Table.HeaderCell width={summary ? 10 : 8}>
                <FormattedMessage id="What" defaultMessage="What" />
              </Table.HeaderCell>
              <Table.HeaderCell width={1}>
                <FormattedMessage id="Who" defaultMessage="Who" />
              </Table.HeaderCell>
              <Table.HeaderCell width={2}>
                <FormattedMessage id="When" defaultMessage="When" />
              </Table.HeaderCell>
              {!summary && (
                <Table.HeaderCell width={1}>
                  <FormattedMessage id="Note" defaultMessage="Note" />
                </Table.HeaderCell>
              )}
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {map(items, (transaction) => (
              <Table.Row id={transaction.id} key={transaction.id}>
                {!summary && (
                  <Table.Cell width={1} textAlign="center">
                    <Checkbox
                      onChange={(e, data) => {
                        this.toggleCheckedTransactions(
                          transaction,
                          data.checked,
                        );
                      }}
                      checked={
                        findIndex(
                          this.state.selectedTransactions,
                          transaction,
                        ) >= 0
                      }
                    />
                  </Table.Cell>
                )}
                <Table.Cell
                  width={summary ? 10 : 8}
                  title={[transaction.description].join(' ')}
                >
                  {elabDescription(transaction.description)}
                </Table.Cell>
                <Table.Cell
                  width={1}
                  title={transaction.username ? transaction.username : 'Zope'}
                >
                  {transaction.username ? transaction.username : 'Zope'}
                </Table.Cell>
                <Table.Cell width={2}>
                  <FormattedDate
                    date={transaction.time}
                    format={{
                      dateStyle: 'medium',
                      timeStyle: 'medium',
                    }}
                  />
                </Table.Cell>
                {!summary && (
                  <Table.Cell width={1}>
                    {transaction.description.includes('Undo') ? 'Undone' : ''}
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          </Table.Body>
          {!summary && (
            <Table.Footer>
              <Table.Row>
                <Table.HeaderCell textAlign="center" colSpan="6">
                  <Menu pagination>
                    {this.state.showPrevButton && (
                      <Menu.Item
                        as="button"
                        id="prev-button"
                        icon
                        style={{ border: 'none' }}
                        title={this.props.intl.formatMessage(messages.prevPage)}
                      >
                        <Icon
                          onClick={this.onPrev}
                          name={prevIcon}
                          title={this.props.intl.formatMessage(
                            messages.prevPage,
                          )}
                        />
                      </Menu.Item>
                    )}
                    <Menu.Item
                      as="button"
                      icon
                      disabled={this.state.selectedTransactions?.length <= 0}
                      style={{ border: 'none' }}
                      title={this.props.intl.formatMessage(messages.undo)}
                    >
                      <Icon
                        name={undoSVG}
                        id="undo-button"
                        className="circled"
                        size="30px"
                        title={this.props.intl.formatMessage(messages.undo)}
                        onClick={() => {
                          this.setState({
                            doUndo: true,
                          });
                        }}
                      />
                    </Menu.Item>
                    <Menu.Item
                      as="button"
                      id="next-button"
                      icon
                      style={{ border: 'none' }}
                      title={this.props.intl.formatMessage(messages.nextPage)}
                    >
                      {this.state.showNextButton ? (
                        <Icon
                          onClick={this.onNext}
                          name={nextIcon}
                          title={this.props.intl.formatMessage(
                            messages.nextPage,
                          )}
                        />
                      ) : (
                        <div style={{ width: '36px' }}></div>
                      )}
                    </Menu.Item>
                  </Menu>
                </Table.HeaderCell>
              </Table.Row>
            </Table.Footer>
          )}
        </Table>
      );
    };

    return (
      <Container id="page-undo" className="controlpanel-undo">
        <Helmet title="Undo" />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Undo Controlpanel"
              defaultMessage="Undo Controlpanel"
            />
          </Segment>
          <Segment>
            {this.props.transactions?.length > 0 && (
              <Form
                schema={{
                  fieldsets: [
                    {
                      id: 'default',
                      title: this.props.intl.formatMessage(messages.default),
                      fields: this.state.isFilterTypeSelected
                        ? [
                            'filterTypes',
                            (this.state.filterType === 'user' &&
                              'filterByUsername') ||
                              (this.state.filterType === 'path' &&
                                'filterByPath') ||
                              (this.state.filterType === 'date' &&
                                'filterByDate'),
                          ]
                        : ['filterTypes'],
                    },
                  ],
                  properties: {
                    filterTypes: {
                      title: this.props.intl.formatMessage(messages.filterBy),
                      description: this.props.intl.formatMessage(
                        messages.filterByDescription,
                      ),
                      type: 'string',
                      choices: [
                        [
                          'user',
                          this.props.intl.formatMessage(
                            messages.filterByUsername,
                          ),
                        ],
                        [
                          'path',
                          this.props.intl.formatMessage(messages.filterByPath),
                        ],
                        [
                          'date',
                          this.props.intl.formatMessage(messages.filterByDate),
                        ],
                      ],
                    },
                    filterByUsername: {
                      title: this.props.intl.formatMessage(
                        messages.filterByUsername_filter,
                      ),
                      type: 'string',
                    },
                    filterByPath: {
                      title: this.props.intl.formatMessage(
                        messages.filterByPath_filter,
                      ),
                      type: 'string',
                    },
                    filterByDate: {
                      title: this.props.intl.formatMessage(
                        messages.filterByDate_filter,
                      ),
                      type: 'date',
                    },
                  },
                  required: [],
                }}
                error={
                  this.state.isemptyInputForFiltering
                    ? {
                        message: this.props.intl.formatMessage(
                          messages.emptyInputForFiltering,
                        ),
                      }
                    : undefined
                }
                onChangeFormData={this.onSelect}
                onSubmit={
                  this.state.isFilterTypeSelected ? this.onFilter : undefined
                }
                onCancel={
                  this.state.isFilterTypeSelected
                    ? this.onCancelFilter
                    : undefined
                }
                resetOnCancel={true}
              />
            )}
          </Segment>
          <Segment.Group raised>
            <Segment className="primary">
              <FormattedMessage
                id="Transactions"
                defaultMessage="Transactions"
              />
            </Segment>

            {this.props.getRequest?.loading ? (
              <Dimmer active>
                <Loader />
              </Dimmer>
            ) : this.state.isTransactionsNotFound ? (
              <Segment>
                <FormattedMessage
                  id="No Transactions Found"
                  defaultMessage="No transactions found"
                />
              </Segment>
            ) : (
              <TransactionsTable items={transactionsRange} />
            )}
          </Segment.Group>
        </Segment.Group>

        {this.state.doUndo && (
          <Confirm
            open
            header={this.props.intl.formatMessage(messages.executeUndo)}
            onCancel={() => {
              this.setState({ doUndo: false });
            }}
            onConfirm={this.onUndo}
            size="fullscreen"
            content={
              <div className="content">
                <TransactionsTable
                  items={this.state.selectedTransactions}
                  summary={true}
                />

                {this.props.revertRequest.loading && (
                  <Dimmer active>
                    <Loader />
                  </Dimmer>
                )}
              </div>
            }
          />
        )}
        {this.state.isClient &&
          createPortal(
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Link to="/controlpanel" className="item">
                    <Icon
                      name={backSVG}
                      aria-label={this.props.intl.formatMessage(messages.back)}
                      className="contents circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.back)}
                    />
                  </Link>
                </>
              }
            />,
            document.getElementById('toolbar'),
          )}
      </Container>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      pathname: props.location.pathname,
      transactions: state.transactions.transactions_recieved,
      getRequest: state.transactions.get,
      revertRequest: state.transactions.revert,
    }),
    { getTransactions, revertTransactions },
  ),
)(UndoControlpanel);
