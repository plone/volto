import React from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Toast } from '@plone/volto/components';
import { flattenToAppURL } from '@plone/volto/helpers';
import { parse } from 'date-fns';
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
  const dateOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  useDeepCompareEffect(() => {
    if (content && config.settings.hasWorkingCopySupport) {
      if (content.working_copy) {
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
            <Link to={flattenToAppURL(content.working_copy['@id'])}>
              {content.working_copy?.title}
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
                  creator: content.working_copy?.creator_name,
                  date: new Intl.DateTimeFormat(lang, dateOptions).format(
                    parse(content.working_copy?.created),
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
                creator: content.working_copy?.creator_name,
                date: new Intl.DateTimeFormat(lang, dateOptions).format(
                  parse(content.working_copy?.created),
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
      if (!content.working_copy) {
        if (toast.isActive('workingcopyinfo')) {
          toast.dismiss('workingcopyinfo');
        }
      }
    }
  }, [
    pathname,
    content,
    content?.title,
    content?.working_copy,
    intl,
    lang,
    dateOptions,
  ]);

  return null;
};

export default WorkingCopyToastsFactory;
