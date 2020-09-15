/**
 * @module components/theme/Error/Error
 */

import React from 'react';
import { views } from '~/config';
/**
 * unauthorized function.
 * @function Unauthorized
 * @returns {string} Markup of the unauthorized page.
 */
const Error = ({ error }) => {
  let FoundView;
  if (error.status === undefined) {
    // For some reason, while development and if CORS is in place and the
    // requested resource is 404, it returns undefined as status, then the
    // next statement will fail
    FoundView = views.errorViews.corsError;
  } else {
    FoundView = views.errorViews[error.status.toString()];
  }
  if (!FoundView) {
    FoundView = views.errorViews['404']; // default to 404
  }
  return (
    <div id="view">
      <FoundView />
    </div>
  );
};

export default Error;
