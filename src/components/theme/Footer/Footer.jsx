/**
 * Footer component.
 * @module components/theme/Footer/Footer
 */

import React from 'react';
import { Container, List, Segment } from 'semantic-ui-react';
import { map } from 'lodash';
import { FormattedMessage, defineMessages, injectIntl } from 'react-intl';
import { useSelector, shallowEqual } from 'react-redux';
import { UniversalLink } from '@plone/volto/components';
import config from '@plone/volto/registry';
import { flattenToAppURL, addAppURL } from '@plone/volto/helpers';

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
const Footer = ({ intl }) => {
  const { settings } = config;
  const { lang, siteActions = [] } = useSelector(
    (state) => ({
      lang: state.intl.locale,
      siteActions: state.actions?.actions?.site_actions,
    }),
    shallowEqual,
  );

  return (
    <Segment
      role="contentinfo"
      vertical
      padded
      inverted
      color="grey"
      textAlign="center"
      id="footer"
    >
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
          {siteActions?.length
            ? map(siteActions, (item) => (
                <div role="listitem" className="item" key={item.id}>
                  <UniversalLink
                    className="item"
                    href={
                      settings.isMultilingual
                        ? `/${lang}/${
                            item.url
                              ? flattenToAppURL(item.url)
                              : addAppURL(item.id)
                          }`
                        : item.url
                        ? flattenToAppURL(item.url)
                        : addAppURL(item.id)
                    }
                  >
                    {item?.title}
                  </UniversalLink>
                </div>
              ))
            : null}
          <div role="listitem" className="item">
            <a className="item" href="https://plone.org">
              <FormattedMessage
                id="Powered by Plone & Python"
                defaultMessage="Powered by Plone & Python"
              />
            </a>
          </div>
        </List>
      </Container>
    </Segment>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Footer.propTypes = {
  /**
   * i18n object
   */
};

export default injectIntl(Footer);
