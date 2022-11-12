import React from 'react';
import { Container, Grid } from 'semantic-ui-react';
import Input from '../Input/Input';

const DesignSystem = () => {
  return (
    <Container>
      <Grid columns={4}>
        <Grid.Column>
          <span>default</span>
        </Grid.Column>
        <Grid.Column>
          <span>hover</span>
        </Grid.Column>
        <Grid.Column>
          <span>focus</span>
        </Grid.Column>
        <Grid.Column>
          <span>disabled</span>
        </Grid.Column>
      </Grid>

      <Grid columns={4}>
        <Grid.Column>
          <Input
            id="field1"
            title="field 1 title"
            placeholder="Type something…"
            description="Optional help text"
            required
          />
        </Grid.Column>

        <Grid.Column>
          <Input
            id="field2"
            title="field 2 title"
            variant="styles.input.hovered"
          />
        </Grid.Column>

        <Grid.Column>
          <Input
            id="field3"
            title="field 3 title"
            variant="styles.input.focused"
          />
        </Grid.Column>

        <Grid.Column>
          <Input
            id="field4"
            title="field 4 title"
            disabled
            description="Optional help text"
          />
        </Grid.Column>
      </Grid>
      <Grid columns={4}>
        <Grid.Column>
          <Input
            id="field1"
            title="field 1 title"
            placeholder="Type something…"
            description="Optional help text"
            required
            value="Filled with value A"
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            id="field2"
            title="field 2 title"
            variant="styles.input.hovered"
            required
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            id="field3"
            title="field 3 title"
            variant="styles.input.focused"
            required
          />
        </Grid.Column>
      </Grid>
      <Grid columns={4}>
        <Grid.Column>
          <Input
            id="field1"
            title="field 1 title"
            placeholder="Type something…"
            description="Optional help text"
            required
            value="Filled with value A"
            error={['This is the error']}
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            id="field2"
            title="field 2 title"
            error={['This is the error']}
            variant="styles.input.hovered"
          />
        </Grid.Column>
        <Grid.Column>
          <Input
            id="field3"
            title="field 3 title"
            error={['This is the error']}
            variant="styles.input.focused"
          />
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default DesignSystem;
