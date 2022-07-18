/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UndoControlPanel
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Container, Segment, Table, Menu, Input } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';
import { map } from 'lodash';
import { Helmet } from '@plone/volto/helpers';
import { Form } from '@plone/volto/components';
import nextIcon from '@plone/volto/icons/right-key.svg';
import prevIcon from '@plone/volto/icons/left-key.svg';
import undoSVG from '@plone/volto/icons/undo.svg';
import { getTransactions, revertTransactions } from '@plone/volto/actions';
// import TransactionsTable from './TransactionsTable';

const messages = defineMessages({
  undoControlPanel: {
    id: 'Undo Control Panel',
    defaultMessage: 'Undo Control Panel',
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
    id: 'Sort by',
    defaultMessage: 'Sort by',
  },
  sortByDescription: {
    id: 'Sort transactions by User-Name, Path or Date',
    defaultMessage: 'Sort transactions by User-Name, Path or Date',
  },
});

/**
 * UndoControlPanel class.
 * @class UndoControlPanel
 * @extends Component
 */
class UndoControlPanel extends Component {
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
        user_name: PropTypes.string,
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
   * @constructs UndoControlPanel
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
      isTransactionsUndoneFailed: false,
      showPrevButton: false,
      showNextButton: false,
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSort = this.onSort.bind(this);
    this.onSelect = this.onSelect.bind(this);
    this.onPrev = this.onPrev.bind(this);
    this.onNext = this.onNext.bind(this);
    this.onUndo = this.onUndo.bind(this);
    this.setTableVisiblity = this.setTableVisiblity.bind(this);
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
        upperIndex: 20,
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
    this.setState({
      isSortingTypeSelected: false,
      isTransactionsNotFound: false,
      isEmptyInputForSorting: false,
      sortType: 'no value',
      sortedTransactions: [],
      lowerIndex: 0,
      upperIndex: 20,
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
      data.sortingTypes !== null &&
      this.state.sortType.toLowerCase() === data.sortingTypes.toLowerCase()
    ) {
      return;
    }
    let sortType = data.sortingTypes || 'no value';

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
          if (
            element.user_name
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
        let milliSecsInADay = 86400000;
        let currentSetTimeMilliSecs = Date.parse(value);
        this.props.transactions.forEach((element) => {
          if (
            currentSetTimeMilliSecs -
              (currentSetTimeMilliSecs % milliSecsInADay) +
              milliSecsInADay >
              Date.parse(element.time) &&
            Date.parse(element.time) >=
              currentSetTimeMilliSecs -
                (currentSetTimeMilliSecs % milliSecsInADay)
          ) {
            sortedTransactions.push(element);
          }
        });
        this.setSortedTransactions(sortedTransactions);
      }
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
      this.props.transactions.slice(
        this.state.lowerIndex,
        this.state.upperIndex,
      ),
      (transaction) => {
        if (
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
      this.props.revertTransactions(undoTransactionsIds);
    }

    // If transactions reverted successfully then erase all the checkbox from transactions
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
   * Set table footer elements visiblity
   * @method onNext
   * @returns {undefined}
   */
  setTableVisiblity() {
    if (this.state.sortedTransactions.length > 0) {
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
    } else if (
      !this.state.isSortingTypeSelected &&
      this.props.transactions.length
    ) {
      if (
        this.props.transactions.length > 0 &&
        this.state.isTransactionsNotFound
      ) {
        this.setState({ isTransactionsNotFound: false });
      } else if (
        this.props.transactions.length <= 0 &&
        !this.state.isTransactionsNotFound
      ) {
        this.setState({ isTransactionsNotFound: true });
      }

      this.state.upperIndex >= this.props.transactions.length &&
        this.state.showNextButton &&
        this.setState({ showNextButton: false });

      this.state.upperIndex < this.props.transactions.length &&
        !this.state.showNextButton &&
        this.setState({ showNextButton: true });

      this.state.lowerIndex <= 0 &&
        this.state.showPrevButton &&
        this.setState({ showPrevButton: false });

      this.state.lowerIndex > 0 &&
        !this.state.showPrevButton &&
        this.setState({ showPrevButton: true });
    }

    if (
      this.props.revertRequest.error !== null &&
      !this.state.isTransactionsUndoneFailed
    ) {
      this.setState({ isTransactionsUndoneFailed: true });
    } else if (
      this.props.revertRequest.error === null &&
      this.state.isTransactionsUndoneFailed
    ) {
      this.setState({ isTransactionsUndoneFailed: false });
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
      this.props.transactions.slice(
        this.state.lowerIndex,
        this.state.upperIndex,
      );
    this.setTableVisiblity();

    return (
      <Container id="page-undo" className="controlpanel-undo">
        <Helmet title="Undo" />
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage
              id="Undo control panel"
              defaultMessage="Undo Control Panel"
            />
          </Segment>
          <Segment>
            {this.props.transactions.length > 0 && (
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
              <Segment className="primary">
                <FormattedMessage
                  id="No transactions found"
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
                        {transaction.user_name ? transaction.user_name : 'Zope'}
                      </Table.Cell>
                      <Table.Cell width={3}>{transaction.time}</Table.Cell>
                      <Table.Cell width={3}>Note</Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
                <Table.Footer>
                  <Table.Row>
                    <Table.HeaderCell colSpan="3">
                      <Menu floated="right" pagination>
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
        {this.state.isClient && (
          <Portal node={document.getElementById('toolbar')}>
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
      pathname: props.location.pathname,
      transactions: state.transactions.transactions_recieved,
      revertRequest: state.transactions.revert,
    }),
    { getTransactions, revertTransactions },
  ),
)(UndoControlPanel);
