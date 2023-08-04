import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import { Container, Segment, Table, Menu, Input } from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import { Icon, Toolbar, Form, Toast } from '@plone/volto/components';
import { useClient } from '@plone/volto/hooks';
import backSVG from '@plone/volto/icons/back.svg';
import { map } from 'lodash';
import { Helmet, usePrevious } from '@plone/volto/helpers';
import nextIcon from '@plone/volto/icons/right-key.svg';
import prevIcon from '@plone/volto/icons/left-key.svg';
import undoSVG from '@plone/volto/icons/undo.svg';
import { getTransactions, revertTransactions } from '@plone/volto/actions';
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

const UndoControlpanel = (props) => {
  const intl = useIntl();
  const dispatch = useDispatch();

  const isClient = useClient();
  const [sortType, setsortType] = useState('no value');
  const [lowerIndex, setlowerIndex] = useState(0);
  const [upperIndex, setupperIndex] = useState(20);
  const [defaultTransactionsLenInTable] = useState(20);
  const [isSortingTypeSelected, setisSortingTypeSelected] = useState(false);
  const [sortedTransactions, setsortedTransactions] = useState([]);
  const [isEmptyInputForSorting, setisEmptyInputForSorting] = useState(false);
  const [isTransactionsNotFound, setisTransactionsNotFound] = useState(false);
  const [isClickedOnUndoButton, setisClickedOnUndoButton] = useState(false);
  const [showPrevButton, setshowPrevButton] = useState(false);
  const [showNextButton, setshowNextButton] = useState(false);

  const pathname  =props.location;
  const transactions = useSelector(
    (state) => state.transactions.transactions_recieved,
  );
  const revertRequest = useSelector((state) => state.transactions.revert);
  const revertRequestloading=revertRequest.loading;
  const prevrevertRequest = usePrevious(revertRequestloading);
  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (prevrevertRequest && revertRequest.loaded) {
      dispatch(getTransactions());
    }
  }, [dispatch, prevrevertRequest, revertRequest.loaded]);

  const SetSortedTransactions = (sortedTransactions) => {
    if (sortedTransactions.length > 0) {
      setlowerIndex(0);
      setupperIndex(defaultTransactionsLenInTable);
      setsortedTransactions(sortedTransactions);
      setisEmptyInputForSorting(false);
      setisTransactionsNotFound(false);
      setlowerIndex(0);
      setupperIndex(defaultTransactionsLenInTable);
      setsortedTransactions(sortedTransactions);
      setisEmptyInputForSorting(false);
      setisTransactionsNotFound(false);
    } else {
      setisTransactionsNotFound(true);
    }
  };

  const onCancel = () => {
    if (sortedTransactions.length > 0) {
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.unsorted)}
          content={intl.formatMessage(messages.transactionsHaveBeenUnsorted)}
        />,
      );
    }
    setisSortingTypeSelected(false);
    setisTransactionsNotFound(false);
    setisEmptyInputForSorting(false);
    setsortType('no value');
    SetSortedTransactions([]);
    setlowerIndex(0);
    setupperIndex(defaultTransactionsLenInTable);
  };

  const onSelect = (data) => {
    if (
      data !== null &&
      data.sortingTypes !== null &&
      sortType.toLowerCase() === data.sortingTypes.toLowerCase()
    ) {
      return;
    }
    let sorttype = (data !== null && data.sortingTypes) || 'no value';

    if (sorttype.toLowerCase() !== 'no value') {
      setisSortingTypeSelected(true);
      sorttype.toLowerCase() === 'user name' && setsortType('user name');
      sorttype.toLowerCase() === 'date' && setsortType('date');
      sorttype.toLowerCase() === 'path' && setsortType('path');
    } else {
      onCancel();
    }
  };

  const onSort = (data) => {
    let sortType = data.sortingTypes || 'no value';
    let value;
    (sortType.toLowerCase() === 'user name' && (value = data.sortByUsername)) ||
      (sortType.toLowerCase() === 'path' && (value = data.sortByPath)) ||
      (sortType.toLowerCase() === 'date' && (value = data.sortByDate)) ||
      (value = undefined);

    if (sortType.toLowerCase() !== 'no value' && value !== undefined) {
      let sortedTransactions = [];
      if (sortType.toLowerCase() === 'user name') {
        transactions.forEach((element) => {
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
        SetSortedTransactions(sortedTransactions);
      } else if (sortType.toLowerCase() === 'path') {
        transactions.forEach((element) => {
          if (
            element.id.trim().toLowerCase().includes(value.trim().toLowerCase())
          ) {
            sortedTransactions.push(element);
          }
        });
        SetSortedTransactions(sortedTransactions);
      } else {
        // MS is Milli Seconds
        let MSInADay = 86400000;
        let sortingTimeInMS = Date.parse(value);
        let endTimeOfSortingDateInMS =
          sortingTimeInMS - (sortingTimeInMS % MSInADay) + MSInADay - 1;
        let startTimeOfSortingDateInMS =
          sortingTimeInMS - (sortingTimeInMS % MSInADay);

        transactions.forEach((element) => {
          if (
            endTimeOfSortingDateInMS >= Date.parse(element.time) &&
            Date.parse(element.time) >= startTimeOfSortingDateInMS
          ) {
            sortedTransactions.push(element);
          }
        });
        SetSortedTransactions(sortedTransactions);
      }
      toast.info(
        <Toast
          info
          title={intl.formatMessage(messages.sorted)}
          content={intl.formatMessage(messages.transactionsHaveBeenSorted)}
        />,
      );
    } else {
      setisEmptyInputForSorting(true);
    }
  };

  const onUndo = () => {
    let transactionsSelected = false;
    let undoTransactionsIds = map(
      transactions.slice(0, transactions.length),
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
      setisClickedOnUndoButton(true);
      dispatch(revertTransactions(undoTransactionsIds));
    } else {
      toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.noTransactionsSelected)}
          content={intl.formatMessage(messages.noTransactionsSelectedToDoUndo)}
        />,
      );
    }

    Array.from(
      document.getElementsByClassName('transactions-checkboxes'),
    ).forEach((element) => {
      element.firstElementChild.checked = false;
    });
  };

  const onPrev = () => {
    0 < lowerIndex && setupperIndex(lowerIndex);
    setlowerIndex(lowerIndex - defaultTransactionsLenInTable);
  };

  const onNext = () => {
    transactions.length > upperIndex && setlowerIndex(upperIndex);
    setupperIndex(upperIndex + defaultTransactionsLenInTable);
  };

  const handleSortedNextPrevButtons = () => {
    upperIndex >= sortedTransactions.length &&
      showNextButton &&
      setshowNextButton(false);

    upperIndex < sortedTransactions.length &&
      !showNextButton &&
      setshowNextButton(true);

    lowerIndex <= 0 && showPrevButton && setshowPrevButton(false);

    lowerIndex > 0 && !showPrevButton && setshowPrevButton(true);
  };

  const handleNotSortedNextPrevButtons = () => {
    upperIndex >= transactions?.length &&
      showNextButton &&
      setshowNextButton(false);

    upperIndex < transactions?.length &&
      !showNextButton &&
      setshowNextButton(true);

    lowerIndex <= 0 && showPrevButton && setshowPrevButton(false);

    lowerIndex > 0 && !showPrevButton && setshowPrevButton(true);
  };

  const handleTableVisiblity = () => {
    if (sortedTransactions.length > 0) {
      handleSortedNextPrevButtons();
    } else if (!isSortingTypeSelected) {
      transactions?.length > 0 &&
        isTransactionsNotFound &&
        setisTransactionsNotFound(false);

      transactions?.length <= 0 &&
        !isTransactionsNotFound &&
        setisTransactionsNotFound(true);

      handleNotSortedNextPrevButtons();
    } else {
      handleNotSortedNextPrevButtons();
    }
  };

  const checkTransactionsUndoneStatus = () => {
    if (
      revertRequest.error &&
      revertRequest.error !== null &&
      isClickedOnUndoButton
    ) {
      setisClickedOnUndoButton(false);
      toast.error(
        <Toast
          error
          title={intl.formatMessage(messages.error)}
          content={intl.formatMessage(messages.failedToUndoTransactions)}
        />,
      );
    } else if (revertRequest.error === null && isClickedOnUndoButton) {
      setisClickedOnUndoButton(false);
      toast.success(
        <Toast
          success
          title={intl.formatMessage(messages.success)}
          content={intl.formatMessage(messages.successfullyUndoneTransactions)}
        />,
      );
    }
  };

  const transactionsRange =
    (sortedTransactions.length > 0 &&
      sortedTransactions.slice(lowerIndex, upperIndex)) ||
    transactions?.slice(lowerIndex, upperIndex);
  handleTableVisiblity();
  checkTransactionsUndoneStatus();

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
          {transactions?.length > 0 && (
            <Form
              schema={{
                fieldsets: [
                  {
                    id: 'default',
                    title: intl.formatMessage(messages.default),
                    fields: isSortingTypeSelected
                      ? [
                          'sortingTypes',
                          (sortType.toLowerCase() === 'user name' &&
                            'sortByUsername') ||
                            (sortType.toLowerCase() === 'path' &&
                              'sortByPath') ||
                            (sortType.toLowerCase() === 'date' && 'sortByDate'),
                        ]
                      : ['sortingTypes'],
                  },
                ],
                properties: {
                  sortingTypes: {
                    title: intl.formatMessage(messages.sortBy),
                    description: intl.formatMessage(messages.sortByDescription),
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
                isEmptyInputForSorting
                  ? { message: 'Please enter any input to perform sorting' }
                  : undefined
              }
              onChangeFormData={onSelect}
              onSubmit={isSortingTypeSelected ? onSort : undefined}
              onCancel={isSortingTypeSelected ? onCancel : undefined}
              resetOnCancel={true}
            />
          )}
        </Segment>
        <Segment.Group raised>
          <Segment className="primary">
            <FormattedMessage id="Transactions" defaultMessage="Transactions" />
          </Segment>
          {isTransactionsNotFound ? (
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
                      {transaction.description.includes('Undo') ? 'Undone' : ''}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell textAlign="center" colSpan="6">
                    <Menu pagination>
                      <Menu.Item as="a" id="prev-button" icon>
                        {showPrevButton ? (
                          <Icon onClick={onPrev} name={prevIcon} title="Prev" />
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
                          title={intl.formatMessage(messages.undo)}
                          onClick={onUndo}
                        />
                      </Menu.Item>
                      <Menu.Item as="a" id="next-button" icon>
                        {showNextButton ? (
                          <Icon onClick={onNext} name={nextIcon} title="Next" />
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
      {isClient && (
        <Portal node={document.getElementById('toolbar')}>
          <Toolbar
            pathname={pathname}
            hideDefaultViewButtons
            inner={
              <>
                <Link to="/controlpanel" className="item">
                  <Icon
                    name={backSVG}
                    aria-label={intl.formatMessage(messages.back)}
                    className="contents circled"
                    size="30px"
                    title={intl.formatMessage(messages.back)}
                  />
                </Link>
              </>
            }
          />
        </Portal>
      )}
    </Container>
  );
};

export default UndoControlpanel;
