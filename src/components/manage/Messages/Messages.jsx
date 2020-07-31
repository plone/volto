/**
 * Messages component.
 * @module components/manage/Messages/Messages
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Message, Container } from 'semantic-ui-react';
import { map } from 'lodash';

import { removeMessage } from '@plone/volto/actions';

/**
 * Messages container class.
 * @class Messages
 * @extends Component
 */
class Messages extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    removeMessage: PropTypes.func.isRequired,
    messages: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        body: PropTypes.string,
        level: PropTypes.string,
      }),
    ).isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Messages
   */
  constructor(props) {
    super(props);
    this.onDismiss = this.onDismiss.bind(this);
  }

  // /**
  //  * Component will receive props
  //  * @method componentWillReceiveProps
  //  * @param {Object} nextProps Next properties
  //  * @returns {undefined}
  //  */
  // componentWillReceiveProps(nextProps) {
  //   if (nextProps.messages.length > this.props.messages.length) {
  //     window.setTimeout(() => {
  //       if (this.props.messages.length > 0) {
  //         this.props.removeMessage(-1);
  //       }
  //     }, 6000);
  //   }
  // }

  /**
   * On dismiss
   * @method onDismiss
   * @param {Object} event Event object
   * @param {number} value Index of message
   * @returns {undefined}
   */
  onDismiss(event, { value }) {
    this.props.removeMessage(value);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      this.props.messages && (
        <Container className="messages">
          {map(this.props.messages, (message, index) => (
            <Message
              key={message.id}
              value={index}
              onDismiss={this.onDismiss}
              error={message.level === 'error'}
              success={message.level === 'success'}
              warning={message.level === 'warning'}
              info={message.level === 'info'}
              header={message.title}
              content={message.body}
            />
          ))}
        </Container>
      )
    );
  }
}

export default connect(
  (state) => ({
    messages: state.messages.messages,
  }),
  { removeMessage },
)(Messages);
