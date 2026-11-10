/**
 * Status messages component.
 * @module components/theme/StatusMessages/StatusMessages
 */

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import config from '@plone/volto/registry';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import {
  addStatusMessages,
  clearStatusMessages,
} from '@plone/volto/actions/statusMessages/statusMessages';
import { takeStatusMessages } from '@plone/volto/helpers/StatusMessages/StatusMessages';

// The types of Plone status messages, and those of the toasts.
const TOAST_TYPES = {
  info: 'info',
  warn: 'warning',
  warning: 'warning',
  error: 'error',
};

/**
 * Show the status messages of the backend as toasts, as Plone Classic shows
 * them on the next page. The API middleware takes them from the cookie after
 * each request; this takes those of the page that was loaded. Projects that
 * show them otherwise set `config.settings.showStatusMessages` to false, and
 * use `state.statusMessages`.
 * @function StatusMessages
 * @returns {null} Nothing: it shows toasts.
 */
const StatusMessages = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.statusMessages?.items);

  useEffect(() => {
    const messages = takeStatusMessages();
    if (messages.length) {
      dispatch(addStatusMessages(messages));
    }
  }, [dispatch]);

  useEffect(() => {
    if (!items?.length || !config.settings.showStatusMessages) {
      return;
    }
    items.forEach(({ message, type }) => {
      const toastType = TOAST_TYPES[type] || 'info';
      toast[toastType](
        <Toast {...{ [toastType]: true }} content={message} />,
        // Warnings and errors stay until they are closed.
        { autoClose: toastType === 'info' ? 10000 : false },
      );
    });
    dispatch(clearStatusMessages());
  }, [items, dispatch]);

  return null;
};

export default StatusMessages;
