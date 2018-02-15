/**
 * Header component.
 * @module components/theme/Header/Header
 */

import React, { Component } from 'react';
import { Container, Grid, Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Anontools, Logo, Navigation, SearchWidget } from '../../../components';

@connect(state => ({
  token: state.userSession.token,
}))
/**
 * Header component class.
 * @class Header
 * @extends Component
 */
export default class Header extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    token: PropTypes.string,
    pathname: PropTypes.string.isRequired,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    token: null,
  };

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <Segment basic>
        <Container>
          <Grid stackable>
            <Grid.Row className="header">
              <Grid.Column width={2} className="logo">
                <Logo />
              </Grid.Column>
              <Grid.Column
                width={this.props.token ? 7 : 5}
                className="navigation"
              >
                <Navigation pathname={this.props.pathname} />
              </Grid.Column>
              {!this.props.token && (
                <Grid.Column width={2} className="tools">
                  <Anontools />
                </Grid.Column>
              )}
              <Grid.Column width={3} className="search">
                <SearchWidget pathname={this.props.pathname} />
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}
