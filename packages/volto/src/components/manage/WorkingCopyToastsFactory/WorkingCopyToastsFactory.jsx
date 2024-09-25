import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import Toast from '@plone/volto/components/manage/Toast/Toast';
import { flattenToAppURL } from '@plone/volto/helpers';
import FormattedDate from '@plone/volto/components/theme/FormattedDate/FormattedDate';
import config from '@plone/volto/registry';
import useDeepCompareEffect from 'use-deep-compare-effect';

const messages = defineMessages({
  thisIsAWorkingCopyOf: {
    id: 'This is a working copy of {title}',
    defaultMessage: 'This is a working copy of {title}',
  },
  workingCopyIs: {
    id: 'This has an ongoing working copy in {title}',
    defaultMessage: 'This has an ongoing working copy in {title}',
  },
  workingCopyCreatedBy: {
    id: 'Created by {creator} on {date}',
    defaultMessage: 'Created by {creator} on {date}',
  },
});

const WorkingCopyToastsFactory = (props) => {
  const intl = useIntl();
  const pathname = useLocation().pathname;
  const lang = useSelector((state) => state.intl.locale);
  const { content } = props;
  const title = content?.title;
  const working_copy = content?.working_copy;
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useDeepCompareEffect(() => {
    if (content && config.settings.hasWorkingCopySupport) {
      if (working_copy) {
        let toastMessage, toastTitle;
        if (content.working_copy_of) {
          // I'm a working copy
          toastMessage = messages.thisIsAWorkingCopyOf;
          toastTitle = (
            <Link to={flattenToAppURL(content.working_copy_of['@id'])}>
              {content.working_copy_of?.title}
            </Link>
          );
        } else {
          // I'm a baseline
          toastMessage = messages.workingCopyIs;
          toastTitle = (
            <Link to={flattenToAppURL(working_copy['@id'])}>
              {working_copy?.title}
            </Link>
          );
        }
        if (toast.isActive('workingcopyinfo')) {
          toast.update('workingcopyinfo', {
            render: (
              <Toast
                info
                title={intl.formatMessage(toastMessage, {
                  title: toastTitle,
                })}
                content={intl.formatMessage(messages.workingCopyCreatedBy, {
                  creator: working_copy?.creator_name,
                  date: (
                    <FormattedDate
                      date={working_copy?.created}
                      format={dateOptions}
                    />
                  ),
                })}
              />
            ),
          });
        } else {
          toast.info(
            <Toast
              info
              title={intl.formatMessage(toastMessage, {
                title: toastTitle,
              })}
              content={intl.formatMessage(messages.workingCopyCreatedBy, {
                creator: working_copy?.creator_name,
                date: (
                  <FormattedDate
                    date={working_copy?.created}
                    format={dateOptions}
                  />
                ),
              })}
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
      if (!working_copy) {
        if (toast.isActive('workingcopyinfo')) {
          toast.dismiss('workingcopyinfo');
        }
      }
    }
  }, [pathname, content, title, working_copy, intl, lang, dateOptions]);

  return null;
};

export default WorkingCopyToastsFactory;
