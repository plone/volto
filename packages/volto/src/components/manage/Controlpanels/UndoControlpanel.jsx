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
import { Container, Segment, Table, Menu, Input } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { Form } from '@plone/volto/components/manage/Form';
import backSVG from '@plone/volto/icons/back.svg';
import map from 'lodash/map';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import nextIcon from '@plone/volto/icons/right-key.svg';
import prevIcon from '@plone/volto/icons/left-key.svg';
import undoSVG from '@plone/volto/icons/undo.svg';
import {
  getTransactions,
  revertTransactions,
} from '@plone/volto/actions/transactions/transactions';
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
  sortBy: {
    id: 'Sort By',
    defaultMessage: 'Sort by',
  },
  sorted: {
    id: 'Sorted',
    defaultMessage: 'Sorted',
  },
  unsorted: {
    id: 'Unsorted',
    defaultMessage: 'Unsorted',
  },
  sortByDescription: {
    id: 'Sort transactions by User-Name, Path or Date',
    defaultMessage: 'Sort transactions by User-Name, Path or Date',
  },
  failedToUndoTransactions: {
    id: 'Failed To Undo Transactions',
    defaultMessage: 'Failed to undo transactions',
  },
  successfullyUndoneTransactions: {
    id: 'Successfully Undone Transactions',
    defaultMessage: 'Successfully undone transactions',
  },
  transactionsHaveBeenSorted: {
    id: 'Transactions Have Been Sorted',
    defaultMessage: 'Transactions have been sorted',
  },
  transactionsHaveBeenUnsorted: {
    id: 'Transactions Have Been Unsorted',
    defaultMessage: 'Transactions have been unsorted',
  },
  noTransactionsSelected: {
    id: 'No Transactions Selected',
    defaultMessage: 'No transactions selected',
  },
  noTransactionsSelectedToDoUndo: {
    id: 'No Transactions Selected To Do Undo',
    defaultMessage: 'No transactions selected to do undo',
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
      sortType: 'no value',
      lowerIndex: 0,
      upperIndex: 20,
      defaultTransactionsLenInTable: 20,
      isSortingTypeSelected: false,
      sortedTransactions: [],
      isEmptyInputForSorting: false,
      isTransactionsNotFound: false,
      isClickedOnUndoButton: false,
      showPrevButton: false,
      showNextButton: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.handleTableVisiblity = this.handleTableVisiblity.bind(this);
    this.handleNotSortedNextPrevButtons =
      this.handleNotSortedNextPrevButtons.bind(this);
    this.handleSortedNextPrevButtons =
      this.handleSortedNextPrevButtons.bind(this);
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
    }
  }

  setSortedTransactions(sortedTransactions) {
    if (sortedTransactions.length > 0) {
      this.setState({
        lowerIndex: 0,
        upperIndex: this.state.defaultTransactionsLenInTable,
        sortedTransactions: sortedTransactions,
        isEmptyInputForSorting: false,
        isTransactionsNotFound: false,
      });
    } else {
      this.setState({ isTransactionsNotFound: true });
    }
  }

  /**
   * On Cancel
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    if (this.state.sortedTransactions.length > 0) {
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.unsorted)}
          content={this.props.intl.formatMessage(
            messages.transactionsHaveBeenUnsorted,
          )}
        />,
      );
    }
    this.setState({
      isSortingTypeSelected: false,
      isTransactionsNotFound: false,
      isEmptyInputForSorting: false,
      sortType: 'no value',
      sortedTransactions: [],
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
      data.sortingTypes !== null &&
      this.state.sortType.toLowerCase() === data.sortingTypes.toLowerCase()
    ) {
      return;
    }
    let sortType = (data !== null && data.sortingTypes) || 'no value';

    if (sortType.toLowerCase() !== 'no value') {
      this.setState({ isSortingTypeSelected: true });
      sortType.toLowerCase() === 'user name' &&
        this.setState({ sortType: 'user name' });
      sortType.toLowerCase() === 'date' && this.setState({ sortType: 'date' });
      sortType.toLowerCase() === 'path' && this.setState({ sortType: 'path' });
    } else {
      this.onCancel();
    }
  }

  /**
   * On Sort
   * @method onSort
   * @param {object} data
   * @returns {undefined}
   */
  onSort(data) {
    let sortType = data.sortingTypes || 'no value';
    let value;
    (sortType.toLowerCase() === 'user name' && (value = data.sortByUsername)) ||
      (sortType.toLowerCase() === 'path' && (value = data.sortByPath)) ||
      (sortType.toLowerCase() === 'date' && (value = data.sortByDate)) ||
      (value = undefined);

    if (sortType.toLowerCase() !== 'no value' && value !== undefined) {
      let sortedTransactions = [];
      if (sortType.toLowerCase() === 'user name') {
        this.props.transactions.forEach((element) => {
          if (value.trim().toLowerCase() === 'zope' && !element.username) {
            sortedTransactions.push(element);
          } else if (
            element.username
              .trim()
              .toLowerCase()
              .includes(value.trim().toLowerCase())
          ) {
            sortedTransactions.push(element);
          }
        });
        this.setSortedTransactions(sortedTransactions);
      } else if (sortType.toLowerCase() === 'path') {
        this.props.transactions.forEach((element) => {
          if (
            element.id.trim().toLowerCase().includes(value.trim().toLowerCase())
          ) {
            sortedTransactions.push(element);
          }
        });
        this.setSortedTransactions(sortedTransactions);
      } else {
        // MS is Milli Seconds
        let MSInADay = 86400000;
        let sortingTimeInMS = Date.parse(value);
        let endTimeOfSortingDateInMS =
          sortingTimeInMS - (sortingTimeInMS % MSInADay) + MSInADay - 1;
        let startTimeOfSortingDateInMS =
          sortingTimeInMS - (sortingTimeInMS % MSInADay);

        this.props.transactions.forEach((element) => {
          if (
            endTimeOfSortingDateInMS >= Date.parse(element.time) &&
            Date.parse(element.time) >= startTimeOfSortingDateInMS
          ) {
            sortedTransactions.push(element);
          }
        });
        this.setSortedTransactions(sortedTransactions);
      }
      toast.info(
        <Toast
          info
          title={this.props.intl.formatMessage(messages.sorted)}
          content={this.props.intl.formatMessage(
            messages.transactionsHaveBeenSorted,
          )}
        />,
      );
    } else {
      this.setState({ isEmptyInputForSorting: true });
    }
  }

  /**
   * On Undo
   * @method onUndo
   * @returns {undefined}
   */
  onUndo() {
    let transactionsSelected = false;
    let undoTransactionsIds = map(
      this.props.transactions.slice(0, this.props.transactions.length),
      (transaction) => {
        if (
          document.getElementById(transaction.id) !== null &&
          document.getElementById(transaction.id).firstElementChild
            .firstElementChild.firstElementChild.checked
        ) {
          transactionsSelected = true;
          return transaction.id;
        }
        return '';
      },
    );
    if (transactionsSelected) {
      this.setState({
        isClickedOnUndoButton: true,
      });
      this.props.revertTransactions(undoTransactionsIds);
    } else {
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.noTransactionsSelected)}
          content={this.props.intl.formatMessage(
            messages.noTransactionsSelectedToDoUndo,
          )}
        />,
      );
    }

    Array.from(
      document.getElementsByClassName('transactions-checkboxes'),
    ).forEach((element) => {
      element.firstElementChild.checked = false;
    });
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
   * Handle next and prev buttons visibility when transactions are sorted
   * @method handleSortedNextPrevButtons
   * @returns {undefined}
   */
  handleSortedNextPrevButtons() {
    this.state.upperIndex >= this.state.sortedTransactions.length &&
      this.state.showNextButton &&
      this.setState({ showNextButton: false });

    this.state.upperIndex < this.state.sortedTransactions.length &&
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
   * Handle next and prev buttons visibility when transactions are not sorted
   * @method handleNotSortedNextPrevButtons
   * @returns {undefined}
   */
  handleNotSortedNextPrevButtons() {
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
    if (this.state.sortedTransactions.length > 0) {
      this.handleSortedNextPrevButtons();
    } else if (!this.state.isSortingTypeSelected) {
      this.props.transactions?.length > 0 &&
        this.state.isTransactionsNotFound &&
        this.setState({ isTransactionsNotFound: false });

      this.props.transactions?.length <= 0 &&
        !this.state.isTransactionsNotFound &&
        this.setState({ isTransactionsNotFound: true });

      this.handleNotSortedNextPrevButtons();
    } else {
      this.handleNotSortedNextPrevButtons();
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
      this.state.isClickedOnUndoButton
    ) {
      this.setState({
        isClickedOnUndoButton: false,
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
      this.state.isClickedOnUndoButton
    ) {
      this.setState({
        isClickedOnUndoButton: false,
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

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const transactionsRange =
      (this.state.sortedTransactions.length > 0 &&
        this.state.sortedTransactions.slice(
          this.state.lowerIndex,
          this.state.upperIndex,
        )) ||
      this.props.transactions?.slice(
        this.state.lowerIndex,
        this.state.upperIndex,
      );
    this.handleTableVisiblity();
    this.checkTransactionsUndoneStatus();

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
                      fields: this.state.isSortingTypeSelected
                        ? [
                            'sortingTypes',
                            (this.state.sortType.toLowerCase() ===
                              'user name' &&
                              'sortByUsername') ||
                              (this.state.sortType.toLowerCase() === 'path' &&
                                'sortByPath') ||
                              (this.state.sortType.toLowerCase() === 'date' &&
                                'sortByDate'),
                          ]
                        : ['sortingTypes'],
                    },
                  ],
                  properties: {
                    sortingTypes: {
                      title: this.props.intl.formatMessage(messages.sortBy),
                      description: this.props.intl.formatMessage(
                        messages.sortByDescription,
                      ),
                      type: 'string',
                      choices: map(['User Name', 'Path', 'Date'], (type) => [
                        type,
                        type,
                      ]),
                    },
                    sortByUsername: {
                      title: `Enter Username`,
                      type: 'string',
                    },
                    sortByPath: {
                      title: `Enter Path`,
                      type: 'string',
                    },
                    sortByDate: {
                      title: `Enter Date and Time`,
                      type: 'date',
                    },
                  },
                  required: [],
                }}
                error={
                  this.state.isEmptyInputForSorting
                    ? { message: 'Please enter any input to perform sorting' }
                    : undefined
                }
                onChangeFormData={this.onSelect}
                onSubmit={
                  this.state.isSortingTypeSelected ? this.onSort : undefined
                }
                onCancel={
                  this.state.isSortingTypeSelected ? this.onCancel : undefined
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
            {this.state.isTransactionsNotFound ? (
              <Segment>
                <FormattedMessage
                  id="No Transactions Found"
                  defaultMessage="No transactions found"
                />
              </Segment>
            ) : (
              <Table selectable fixed celled compact singleLine attached>
                <Table.Header>
                  <Table.Row>
                    <Table.HeaderCell width={1}>
                      <FormattedMessage
                        id="Transactions Checkbox"
                        defaultMessage="#"
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3}>
                      <FormattedMessage id="What" defaultMessage="What" />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3}>
                      <FormattedMessage id="Who" defaultMessage="Who" />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3}>
                      <FormattedMessage id="When" defaultMessage="When" />
                    </Table.HeaderCell>
                    <Table.HeaderCell width={3}>
                      <FormattedMessage id="Note" defaultMessage="Note" />
                    </Table.HeaderCell>
                    <Table.HeaderCell />
                  </Table.Row>
                </Table.Header>
                <Table.Body>
                  {map(transactionsRange, (transaction) => (
                    <Table.Row id={transaction.id} key={transaction.id}>
                      <Table.Cell width={1}>
                        <Input
                          type="checkbox"
                          className="transactions-checkboxes"
                        />
                      </Table.Cell>
                      <Table.Cell
                        width={3}
                        title={[transaction.description].join(' ')}
                      >
                        {transaction.description}
                      </Table.Cell>
                      <Table.Cell width={3}>
                        {transaction.username ? transaction.username : 'Zope'}
                      </Table.Cell>
                      <Table.Cell width={3}>{transaction.time}</Table.Cell>
                      <Table.Cell width={3}>
                        {transaction.description.includes('Undo')
                          ? 'Undone'
                          : ''}
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell textAlign="center" colSpan="6">
                      <Menu pagination>
                        <Menu.Item as="a" id="prev-button" icon>
                          {this.state.showPrevButton ? (
                            <Icon
                              onClick={this.onPrev}
                              name={prevIcon}
                              title="Prev"
                            />
                          ) : (
                            <div style={{ width: '36px' }}></div>
                          )}
                        </Menu.Item>
                        <Menu.Item as="a" icon>
                          <Icon
                            name={undoSVG}
                            id="undo-button"
                            className="circled"
                            size="30px"
                            title={this.props.intl.formatMessage(messages.undo)}
                            onClick={this.onUndo}
                          />
                        </Menu.Item>
                        <Menu.Item as="a" id="next-button" icon>
                          {this.state.showNextButton ? (
                            <Icon
                              onClick={this.onNext}
                              name={nextIcon}
                              title="Next"
                            />
                          ) : (
                            <div style={{ width: '36px' }}></div>
                          )}
                        </Menu.Item>
                      </Menu>
                    </Table.HeaderCell>
                  </Table.Row>
                </Table.Footer>
              </Table>
            )}
          </Segment.Group>
        </Segment.Group>
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
      revertRequest: state.transactions.revert,
    }),
    { getTransactions, revertTransactions },
  ),
)(UndoControlpanel);
