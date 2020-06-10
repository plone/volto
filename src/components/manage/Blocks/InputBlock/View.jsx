import React, { useState } from 'react';
import { Grid, Input, Divider, Message } from 'semantic-ui-react';

const View = (props) => {
  const [input, setInput] = useState('First Name');
  const onChange = (e) => {
    setInput(e.target.value);
    props.onChange(props.data.input, e.target.value);
  };
  return (
    <Message>
      <Grid columns="two">
        <Grid.Row>
          <Grid.Column>
            <h4>{props.data.input}</h4>
          </Grid.Column>
          <Grid.Column>
            <Input
              transparent
              placeholder="Write Your First Name"
              onChange={onChange}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </Message>
  );
};

export default View;
