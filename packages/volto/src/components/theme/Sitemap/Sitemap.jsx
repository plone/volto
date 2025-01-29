import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect, useSelector } from 'react-redux';
import { asyncConnect, expandToBackendURL } from '@plone/volto/helpers';
import { defineMessages, injectIntl } from 'react-intl';
import { Container as SemanticContainer } from 'semantic-ui-react';
import Helmet from '@plone/volto/helpers/Helmet/Helmet';
import { Link } from 'react-router-dom';
import config from '@plone/volto/registry';

import { getNavigation } from '@plone/volto/actions/navigation/navigation';

const messages = defineMessages({
  Sitemap: {
    id: 'Sitemap',
    defaultMessage: 'Sitemap',
  },
});

export function getSitemapPath(pathname = '', lang) {
  /* This function is deprecated
   * We keep it for backwards compatibility.
   */
  const prefix = pathname.replace(/\/sitemap$/gm, '').replace(/^\//, '');
  const path = prefix || lang || '';
  return path;
}

/**
 * Sitemap function component.
 * @function Sitemap
 * @param {Object} props - Component properties.
 * @returns {JSX.Element} - Rendered component.
 */
function Sitemap(props) {
  const { getNavigation, navroot } = props;
  useEffect(() => {
    const { settings } = config;
    getNavigation(
      `${expandToBackendURL(navroot?.navroot?.['@id'])}`,
      settings.siteMapDepth,
    );
  }, [navroot, getNavigation]);

  const renderItems = (items) => {
    return (
      <ul>
        {items.map((item) => (
          <li
            key={item.url}
            className={item.items?.length > 0 ? 'with-children' : ''}
          >
            <Link to={item.url}>{item.title}</Link>
            {item.items && renderItems(item.items)}
          </li>
        ))}
      </ul>
    );
  };

  const Container =
    config.getComponent({ name: 'Container' }).component || SemanticContainer;

  const items = useSelector((state) => state.navigation.items);
  return (
    <div id="page-sitemap">
      <Helmet title={props.intl.formatMessage(messages.Sitemap)} />
      <Container className="view-wrapper">
        <h1>{props.intl.formatMessage(messages.Sitemap)} </h1>
        {items && renderItems(props.items)}
      </Container>
    </div>
  );
}

Sitemap.propTypes = {
  getNavigation: PropTypes.func.isRequired,
  navroot: PropTypes.object.isRequired,
};

export const __test__ = compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.navigation.items,
      navroot: state.navroot.data,
    }),
    { getNavigation },
  ),
)(Sitemap);

export default compose(
  injectIntl,
  connect(
    (state) => ({
      items: state.navigation.items,
      navroot: state.navroot.data,
    }),
    { getNavigation },
  ),
  asyncConnect([
    {
      key: 'navigation',
      promise: ({ location, store: { dispatch, getState } }) => {
        if (!__SERVER__) return;
        const navroot = getState().navroot.data?.navroot?.['@id'];
        return dispatch(
          getNavigation(
            expandToBackendURL(navroot),
            config.settings.siteMapDepth,
          ),
        );
      },
    },
  ]),
)(Sitemap);
