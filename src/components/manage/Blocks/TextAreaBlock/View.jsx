import React, { useState } from 'react';
import { TextArea, Grid, Divider, Message } from 'semantic-ui-react';

const View = (props) => {
  const [textarea, setTextarea] = useState('');
  const onChange = (e) => {
    props.onChange(props.data.textarea, e.target.value);
    setTextarea(e.target.value);
  };
  return (
    <Message>
      <Grid columns="two">
        <Grid.Row>
          <Grid.Column>
            <h4>{props.data.textarea}</h4>
          </Grid.Column>
          <Grid.Column>
            <TextArea onChange={onChange} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </Message>
  );
};

export default View;
