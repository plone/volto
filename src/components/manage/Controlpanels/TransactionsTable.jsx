import { Table, Menu, Input } from 'semantic-ui-react';
import { Icon } from '@plone/volto/components';
import nextIcon from '@plone/volto/icons/right-key.svg';
import prevIcon from '@plone/volto/icons/left-key.svg';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { map } from 'lodash';
import { Component } from 'react';
import PropTypes from 'prop-types';
import undoSVG from '@plone/volto/icons/undo.svg';
import { getTransactions, revertTransactions } from '@plone/volto/actions';

const messages = defineMessages({
  undo: {
    id: 'Undo',
    defaultMessage: 'Undo',
  },
});

class TransactionsTable extends Component {
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
   * @constructs TrasactionsTable
   */
  constructor(props) {
    super(props);
    this.state = {
      lowerIndex: 0,
      upperIndex: 20,
      defaultTransactionsLenInTable: 20,
    };
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
    transactionsSelected && this.props.revertTransactions(undoTransactionsIds);

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
    this.props.transactions.length &&
      this.state.upperIndex >= this.props.transactions.length &&
      (document.getElementById('next-button').style.visibility = 'hidden');
    this.props.transactions.length &&
      this.state.upperIndex < this.props.transactions.length &&
      (document.getElementById('next-button').style.visibility = 'visible');
    document.getElementById('prev-button') !== null &&
      this.state.lowerIndex <= 0 &&
      (document.getElementById('prev-button').style.visibility = 'hidden');
    document.getElementById('prev-button') !== null &&
      this.state.lowerIndex > 0 &&
      (document.getElementById('prev-button').style.visibility = 'visible');
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const transactionsRange = this.props.transactions.slice(
      this.state.lowerIndex,
      this.state.upperIndex,
    );
    this.setTableVisiblity();
    return (
      <Table selectable fixed celled compact singleLine attached>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell width={1}>
              <FormattedMessage id="Transactions Checkbox" defaultMessage="#" />
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
                <Input type="checkbox" className="transactions-checkboxes" />
              </Table.Cell>
              <Table.Cell width={3} title={[transaction.description].join(' ')}>
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
                  <Icon onClick={this.onPrev} name={prevIcon} title="Prev" />
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
                  <Icon onClick={this.onNext} name={nextIcon} title="Next" />
                </Menu.Item>
              </Menu>
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    (state, props) => ({
      // pathname: props.location.pathname,
      transactions: state.transactions.transactions_recieved,
      revertRequest: state.transactions.revert,
    }),
    { getTransactions, revertTransactions },
  ),
)(TransactionsTable);
