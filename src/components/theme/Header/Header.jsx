/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';

import { Anontools, Logo, SearchWidget } from '../../../components';

/**
 * Component to display the header.
 * @function Field
 * @returns {string} Markup of the component.
 */
const Header = ({ pathname }) => (
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
          <SearchWidget pathname={pathname} />
        </Grid.Column>
      </Grid>
    </Container>
  </Segment>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Header.propTypes = {
  /**
   * Pathname of the current object
   */
  pathname: PropTypes.string.isRequired,
};

export default Header;
