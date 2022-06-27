/**
 * Users controlpanel container.
 * @module components/manage/Controlpanels/UndoControlPanel
 */
import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Link } from 'react-router-dom';
import { Portal } from 'react-portal';
import {
  Container,
  // Header,
  Segment,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { Icon, Toolbar } from '@plone/volto/components';
import backSVG from '@plone/volto/icons/back.svg';
import { map } from 'lodash';
import { Helmet } from '@plone/volto/helpers';
import { Form } from '@plone/volto/components';
import TransactionsTable from './TransactionsTable';

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
    id: 'Sort transactions by User-Name or Date',
    defaultMessage: 'Sort transactions by User-Name or Date',
  },
});

/**
 * UndoControlPanel class.
 * @class UndoControlPanel
 * @extends Component
 */
class UndoControlPanel extends Component {
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
   * On Cancel
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.setState({ isSorted: false });
    // Free all the sorted transactions
  }

  /**
   * On Submit
   * @method onSubmit
   * @param {object} data
   * @returns {undefined}
   */
  onSubmit(data) {
    let sortBy = data.sortBy || 'no value';
    let value = data.enteredValue || undefined;

    if (sortBy.toLowerCase() !== 'no value' && value !== undefined) {
      // Sort Transactions here
    } else if (sortBy.toLowerCase() !== 'no value') {
      this.setState({ isSorted: true });
      sortBy.toLowerCase() === 'user name' &&
        this.setState({ sortBy: 'user name' });
      sortBy.toLowerCase() === 'date' && this.setState({ sortBy: 'date' });
    } else {
      this.setState({ isSorted: false });
      // Free all the sorted transactions
    }
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
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
                      choices: map(['User Name', 'Date'], (type) => [
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
                      choices: map(['User Name', 'Date'], (type) => [
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
            <TransactionsTable />
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
  connect((state, props) => ({
    pathname: props.location.pathname,
  })),
)(UndoControlPanel);
