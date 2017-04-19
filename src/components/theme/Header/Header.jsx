/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';

import { Anontools, Logo, SearchWidget } from '../../../components';

/**
 * Header component class.
 * @function Field
 * @returns {string} Markup of the component.
 */
const Header = () => (
  <Segment basic>
    <Container>
      <Grid stackable>
        <Grid.Column width={8}>
          <Logo />
        </Grid.Column>
        <Grid.Column width={3}>
          <Anontools />
        </Grid.Column>
        <Grid.Column width={5}>
          <SearchWidget />
        </Grid.Column>
      </Grid>
    </Container>
  </Segment>
);

export default Header;
