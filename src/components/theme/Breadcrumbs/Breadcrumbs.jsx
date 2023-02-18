/**
 * Breadcrumbs components.
 * @module components/theme/Breadcrumbs/Breadcrumbs
 */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';

import { Icon } from '@plone/volto/components';
import useBreadcrumbs from '@plone/volto/queries/useBreadcrumbs';

import homeSVG from '@plone/volto/icons/home.svg';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  breadcrumbs: {
    id: 'Breadcrumbs',
    defaultMessage: 'Breadcrumbs',
  },
});

const Breadcrumbs = () => {
  const intl = useIntl();
  const { items, root } = useBreadcrumbs();

  return (
    <Segment
      role="navigation"
      aria-label={intl.formatMessage(messages.breadcrumbs)}
      className="breadcrumbs"
      secondary
      vertical
    >
      <Container>
        <Breadcrumb>
          <Link
            to={root || '/'}
            className="section"
            title={intl.formatMessage(messages.home)}
          >
            <Icon name={homeSVG} size="18px" />
          </Link>
          {items.map((item, index, items) => [
            <Breadcrumb.Divider key={`divider-${item.url}`} />,
            index < items.length - 1 ? (
              <Link key={item.url} to={item.url} className="section">
                {item.title}
              </Link>
            ) : (
              <Breadcrumb.Section key={item.url} active>
                {item.title}
              </Breadcrumb.Section>
            ),
          ])}
        </Breadcrumb>
      </Container>
    </Segment>
  );
};

export default Breadcrumbs;

Breadcrumbs.propTypes = {
  pathname: PropTypes.string.isRequired,
  root: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
    }),
  ),
};
