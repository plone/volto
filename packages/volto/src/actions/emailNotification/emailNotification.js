/**
 * emailNotification actions.
 * @module actions/emailNotification/emailNotification
 */

import { EMAIL_NOTIFICATION } from '@plone/volto/constants/ActionTypes';

/**
 * Email notification function
 * @function emailNotification
 * @param {string} from User id
 * @param {string} message Old password.
 * @param {string} name New password.
 * @param {string} subject New password.
 * @param {string} form_token Token from @form-token, when the backend has form tokens.
 * @returns {Object} Edit password action.
 */
export function emailNotification(from, message, name, subject, form_token) {
  return {
    type: EMAIL_NOTIFICATION,
    request: {
      op: 'post',
      path: '/@email-notification',
      data: {
        from,
        message,
        name,
        subject,
        ...(form_token && { form_token }),
      },
    },
  };
}
