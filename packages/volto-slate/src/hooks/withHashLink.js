import React from 'react';
import { connect } from 'react-redux';
import { setHashLink, resetHashLink } from 'volto-slate/actions';

export function withHashLink(WrappedComponent) {
  return connect(
    (state) => {
      return {
        hashlink: state.hashlink,
      };
    },
    { setHashLink, resetHashLink },
  )((props) => {
    return (
      <WrappedComponent
        {...props}
        setHashLink={props.setHashLink}
        resetHashLink={props.resetHashLink}
      />
    );
  });
}
