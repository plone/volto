import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { clearErrors } from '@plone/volto/actions';
import { Toast } from '@plone/volto/components';
import { toast } from 'react-toastify';
import { groupBy } from 'lodash';

const GenericErrorsToast = props => {
  const { clearErrors, errors } = props;
  const hasErrors = errors.length === 0;
  useEffect(() => {
    clearErrors();
  }, [hasErrors, clearErrors]);

  return props.errors.length
    ? toast.info(
        <>
          {Object.keys(
            groupBy(props.errors, action => action.error?.message),
          ).map((msg, i) => {
            return <Toast key={i} error title="Error" content={msg} />;
          })}
        </>,
      )
    : '';
};

export default connect(
  (state, props) => ({
    errors: state.errors,
  }),
  { clearErrors },
)(GenericErrorsToast);
