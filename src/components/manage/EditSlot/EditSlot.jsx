import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';

function EditSlot(props) {
  const slotId = props.match.params.id;
  return <div>Edit slot</div>;
}

export default compose(withRouter)(EditSlot);
