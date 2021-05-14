import React from 'react';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Toast } from '@plone/volto/components';
import config from '@plone/volto/registry';

const messages = defineMessages({
  success: {
    id: 'Cut',
    defaultMessage: 'Cut',
  },
});

const WorkingCopyToastsFactory = (props) => {
  const intl = useIntl();
  const pathname = useLocation().pathname;
  const { content } = props;

  React.useEffect(() => {
    if (config.settings.hasWorkingCopySupport && content.working_copy) {
      if (toast.isActive('workingcopyinfo')) {
        toast.update('workingcopyinfo', {
          render: (
            <Toast
              info
              title={intl.formatMessage(messages.success)}
              content={content.title}
            />
          ),
        });
      } else {
        toast.info(
          <Toast
            info
            title={intl.formatMessage(messages.success)}
            content={content.title}
          />,
          {
            toastId: 'workingcopyinfo',
            autoClose: false,
            closeButton: false,
            transition: null,
          },
        );
      }
    }
    if (config.settings.hasWorkingCopySupport && !content.working_copy) {
      if (toast.isActive('workingcopyinfo')) {
        toast.dismiss('workingcopyinfo');
      }
    }
  }, [pathname, content.title, content.working_copy, intl]);

  return null;
};

export default WorkingCopyToastsFactory;
