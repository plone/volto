import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Breadcrumb, Container, Segment } from 'semantic-ui-react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { getBreadcrumbs } from '@plone/volto/actions';
import ploneClient from '@root/plone-client';

import { getBaseUrl, hasApiExpander } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import homeSVG from '@plone/volto/icons/home.svg';

const { getBreadcrumbsQuery } = ploneClient;

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

const BreadcrumbsComponent = ({ pathname }) => {
  const intl = useIntl();

  const { data } = useQuery(getBreadcrumbsQuery({ path: pathname }));

  const items = data?.items || [];
  const root = data?.root || '/';

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

BreadcrumbsComponent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default BreadcrumbsComponent;
