import { CLEAR_ERRORS } from '@plone/volto/constants/ActionTypes';

export default function clearErrors() {
  return {
    type: CLEAR_ERRORS,
  };
}
