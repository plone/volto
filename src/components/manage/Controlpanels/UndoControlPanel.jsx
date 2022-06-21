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
import { Button } from 'semantic-ui-react';
import {
  Container,
  // Header,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';
import undoSVG from '@plone/volto/icons/undo.svg';
import { map } from 'lodash';
import { Helmet } from '@plone/volto/helpers';
import { Form } from '@plone/volto/components';
import TransactionsTable from './TransactionsTable';
import { getTransactions } from '@plone/volto/actions';

const messages = defineMessages({
  undoControlPanel: {
    id: 'Undo Control Panel',
    defaultMessage: 'Undo Control Panel',
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
    id: 'Sort transactions by Name, User-Name or Email',
    defaultMessage: 'Sort transactions by Name, User-Name or Email',
  },
  undo: {
    id: 'Undo',
    defaultMessage: 'Undo',
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
    transactions: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string,
        id: PropTypes.string,
        size: PropTypes.number,
        time: PropTypes.string,
        user_name: PropTypes.string,
      }),
    ),
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
      isSorted: false,
      sortBy: 'value',
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.undoTransactions = this.undoTransactions.bind(this);
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getTransactions();
    this.setState({ isClient: true });
  }

  onSubmit(data) {
    let sortBy = data.sortBy || 'no value';
    let value = data.enteredValue || undefined;

    if (sortBy.toLowerCase() !== 'no value' && value !== undefined) {
      // console.log(data)
    } else if (sortBy.toLowerCase() !== 'no value') {
      this.setState({ isSorted: true });
      sortBy.toLowerCase() === 'name' && this.setState({ sortBy: 'name' });
      sortBy.toLowerCase() === 'user name' &&
        this.setState({ sortBy: 'user name' });
      sortBy.toLowerCase() === 'email' && this.setState({ sortBy: 'email' });
    } else {
      this.setState({ isSorted: false });
      // Free all the sorted transactions
    }
  }

  undoTransactions() {
    // let undoTransactionId = map(this.props.transactions, (transaction) => {
    //   if(document.getElementById(transaction.id).firstElementChild.firstElementChild.checked === true){
    //     return transaction.id;
    //   }
    //   return "";
    // })
    //Uncomment above code and Write additional code to perform transactions Patching here
  }

  onCancel() {
    this.setState({ isSorted: false });
    // Free all the sorted transactions
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const transactions = this.props.transactions;
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
            {this.state.isSorted ? (
              <Form
                schema={{
                  fieldsets: [
                    {
                      id: 'default',
                      title: this.props.intl.formatMessage(messages.default),
                      fields: this.state.isSorted
                        ? ['sortBy', 'enteredValue']
                        : ['sortBy'],
                    },
                  ],
                  properties: {
                    sortBy: {
                      title: this.props.intl.formatMessage(messages.sortBy),
                      description: this.props.intl.formatMessage(
                        messages.sortByDescription,
                      ),
                      type: 'string',
                      choices: map(['Name', 'User Name', 'Email'], (type) => [
                        type,
                        type,
                      ]),
                    },
                    enteredValue: {
                      title: `Enter ${this.state.sortBy}`,
                      type: 'string',
                    },
                  },
                  required: [],
                }}
                onSubmit={this.onSubmit}
                onCancel={this.onCancel}
              />
            ) : (
              <Form
                schema={{
                  fieldsets: [
                    {
                      id: 'default',
                      title: this.props.intl.formatMessage(messages.default),
                      fields: this.state.isSorted
                        ? ['sortBy', 'enteredValue']
                        : ['sortBy'],
                    },
                  ],
                  properties: {
                    sortBy: {
                      title: this.props.intl.formatMessage(messages.sortBy),
                      description: this.props.intl.formatMessage(
                        messages.sortByDescription,
                      ),
                      type: 'string',
                      choices: map(['Name', 'User Name', 'Email'], (type) => [
                        type,
                        type,
                      ]),
                    },
                    enteredValue: {
                      title: `Enter ${this.state.sortBy}`,
                      type: 'string',
                    },
                  },
                  required: [],
                }}
                onSubmit={this.onSubmit}
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
            <TransactionsTable transactions={transactions} />
            <Segment>
              <Button
                basic
                id="transactions-undo"
                className="undo"
                aria-label={this.props.intl.formatMessage(messages.undo)}
                onClick={this.undoTransactions}
                // disabled={}
                // loading={}
              >
                <Icon
                  name={undoSVG}
                  className="circled"
                  size="30px"
                  title={this.props.intl.formatMessage(messages.undo)}
                />
              </Button>
            </Segment>
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
    }),
    { getTransactions },
  ),
)(UndoControlPanel);
