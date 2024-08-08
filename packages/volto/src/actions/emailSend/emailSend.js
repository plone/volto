/**
 * emailNotification actions.
 * @module actions/emailNotification/emailNotification
 */

import { EMAIL_SEND } from '@plone/volto/constants/ActionTypes';

/**
 * Email send function
 * @function emailSend
 * @param {string} name New password.
 * @param {string} from Sender mail address.
 * @param {string} to Receiver mail address.
 * @param {string} subject Email subject.
 * @param {string} message Email message.
 * @returns {Object} Edit emailSend action.
 */
export function emailSend(name, from, to, subject, message) {
  return {
    type: EMAIL_SEND,
    request: {
      op: 'post',
      path: '/@email-send',
      data: {
        name,
        from,
        to,
        subject,
        message,
      },
    },
  };
}
