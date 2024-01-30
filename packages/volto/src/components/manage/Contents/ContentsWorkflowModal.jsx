import React, { useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { concat, filter, last, map, uniqBy } from 'lodash';
import { defineMessages, useIntl } from 'react-intl';

import { usePrevious } from '@plone/volto/helpers';
import { getWorkflow, transitionWorkflow } from '@plone/volto/actions';
import { ModalForm } from '@plone/volto/components/manage/Form';

const messages = defineMessages({
  default: {
    id: 'Default',
    defaultMessage: 'Default',
  },
  stateTitle: {
    id: 'Change State',
    defaultMessage: 'Change State',
  },
  includeChildrenTitle: {
    id: 'Change workflow state recursively',
    defaultMessage: 'Change workflow state recursively',
  },
  stateDescription: {
    id: 'Select the transition to be used for modifying the items state.',
    defaultMessage:
      'Select the transition to be used for modifying the items state.',
  },
  loadingMessage: {
    id: 'Workflow Change Loading Message',
    defaultMessage: 'Updating workflow states...',
  },
});

const ContentsWorkflowModal = (props) => {
  const { onOk, items, open, onCancel } = props;
  const intl = useIntl();
  const dispatch = useDispatch();
  const request = useSelector((state) => state.workflow.transition);
  const workflows = useSelector(
    (state) => state.workflow.multiple,
    shallowEqual,
  );
  const prevrequestloading = usePrevious(request.loading);

  useEffect(() => {
    dispatch(getWorkflow(items));
  }, [dispatch, items]);

  useEffect(() => {
    if (prevrequestloading && request.loaded) {
      onOk();
    }
  }, [onOk, prevrequestloading, request.loaded]);

  const onSubmit = useCallback(
    ({ state, include_children }) => {
      if (!state) {
        return;
      }
      dispatch(
        transitionWorkflow(
          filter(
            map(
              concat(...map(workflows, (workflow) => workflow.transitions)),
              (item) => item['@id'],
            ),
            (x) => last(x.split('/')) === state,
          ),
          include_children,
        ),
      );
    },
    [dispatch, workflows],
  );

  return (
    open &&
    workflows.length > 0 && (
      <ModalForm
        open={open}
        loading={request.loading}
        loadingMessage={intl.formatMessage(messages.loadingMessage)}
        onSubmit={onSubmit}
        onCancel={onCancel}
        title={intl.formatMessage(messages.stateTitle)}
        schema={{
          fieldsets: [
            {
              id: 'default',
              title: intl.formatMessage(messages.default),
              fields: ['state', 'include_children'],
            },
          ],
          properties: {
            state: {
              description: intl.formatMessage(messages.stateDescription),
              title: intl.formatMessage(messages.stateTitle),
              type: 'string',
              choices: map(
                uniqBy(
                  concat(...map(workflows, (workflow) => workflow.transitions)),
                  (x) => x.title,
                ),
                (y) => [last(y['@id'].split('/')), y.title],
              ),
            },
            include_children: {
              title: intl.formatMessage(messages.includeChildrenTitle),
              type: 'boolean',
            },
          },
          required: [],
        }}
      />
    )
  );
};

ContentsWorkflowModal.propTypes = {
  items: PropTypes.arrayOf(PropTypes.string).isRequired,
  open: PropTypes.bool.isRequired,
  onOk: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ContentsWorkflowModal;
