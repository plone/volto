/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, Divider, List, Segment } from 'semantic-ui-react';

/**
 * Footer component class.
 * @function Field
 * @returns {string} Markup of the component.
 */
const Footer = () => (
  <Segment inverted color="darkgrey" vertical textAlign="center">
    <Container>
      The <a href="http://plone.com">Plone<sup>®</sup> Open Source
      CMS/WCM</a> is <abbr title="Copyright">©</abbr> 2000-2017 by
      the <a href="http://plone.org/foundation">Plone Foundation</a> and friends. Distributed
      under the <a href="http://creativecommons.org/licenses/GPL/2.0/">GNU GPL license</a>.
      <Divider />
      <List horizontal>
        <List.Item href="/sitemap">Site Map</List.Item>
        <List.Item href="/accessibility-info">Accessibility</List.Item>
        <List.Item href="/contact">Contact</List.Item>
        <List.Item href="http://plone.com">Powered by Plone &amp; Python</List.Item>
      </List>
    </Container>
  </Segment>
);

export default Footer;
