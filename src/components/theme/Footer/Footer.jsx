/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, Divider, List, Segment } from 'semantic-ui-react';
import {
  FormattedMessage,
  defineMessages,
  injectIntl,
  intlShape,
} from 'react-intl';

const messages = defineMessages({
  copyright: {
    id: 'Copyright',
    defaultMessage: 'Copyright',
  },
});

/**
 * Component to display the footer.
 * @function Footer
 * @param {Object} intl Intl object
 * @returns {string} Markup of the component
 */
const Footer = ({ intl }) => (
  <Segment vertical padded inverted color="grey" textAlign="center">
    <Container>
      <Segment basic inverted color="grey" className="discreet">
        <FormattedMessage
          id="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
          defaultMessage="The {plonecms} is {copyright} 2000-{current_year} by the {plonefoundation} and friends."
          values={{
            plonecms: (
              <FormattedMessage
                id="Plone{reg} Open Source CMS/WCM"
                defaultMessage="Plone{reg} Open Source CMS/WCM"
                values={{ reg: <sup>®</sup> }}
              />
            ),
            copyright: (
              <abbr title={intl.formatMessage(messages.copyright)}>©</abbr>
            ),
            current_year: new Date().getFullYear(),
            plonefoundation: (
              <a className="item" href="http://plone.org/foundation">
                <FormattedMessage
                  id="Plone Foundation"
                  defaultMessage="Plone Foundation"
                />
              </a>
            ),
          }}
        />{' '}
        <FormattedMessage
          id="Distributed under the {license}."
          defaultMessage="Distributed under the {license}."
          values={{
            license: (
              <a
                className="item"
                href="http://creativecommons.org/licenses/GPL/2.0/"
              >
                <FormattedMessage
                  id="GNU GPL license"
                  defaultMessage="GNU GPL license"
                />
              </a>
            ),
          }}
        />
      </Segment>
      <List horizontal inverted>
        <List.Item href="/sitemap">
          <FormattedMessage id="Site Map" defaultMessage="Site Map" />
        </List.Item>
        <List.Item href="/accessibility-info">
          <FormattedMessage id="Accessibility" defaultMessage="Accessibility" />
        </List.Item>
        <List.Item href="/contact">
          <FormattedMessage id="Contact" defaultMessage="Contact" />
        </List.Item>
        <List.Item href="http://plone.com">
          <FormattedMessage
            id="Powered by Plone & Python"
            defaultMessage="Powered by Plone & Python"
          />
        </List.Item>
      </List>
    </Container>
  </Segment>
);

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
  intl: intlShape.isRequired,
};

export default injectIntl(Footer);
