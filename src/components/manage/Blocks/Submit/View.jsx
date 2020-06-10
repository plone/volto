import React from 'react';
import { Message, Button } from 'semantic-ui-react';

const View = (props) => {
  return (
    <Message>
      <Button onClick={props.onSubmit}>Submit</Button>
    </Message>
  );
};

export default View;
