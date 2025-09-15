import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import ContentsBreadcrumbsRootItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsRootItem';
import ContentsBreadcrumbsHomeItem from '@plone/volto/components/manage/Contents/ContentsBreadcrumbsHomeItem';

const messages = defineMessages({
  home: {
    id: 'Home',
    defaultMessage: 'Home',
  },
  root: {
    id: 'Root',
    defaultMessage: 'Root',
  },
});

const ContentsBreadcrumbs = (props) => {
  const { items } = props;
  const intl = useIntl();
  const navroot = useSelector((state) => state.navroot.data.navroot);
  const navrootIsPortal = navroot?.['@type'] === 'Plone Site';

  return (
    <Breadcrumb>
      {navrootIsPortal ? (
        <Link
          to="/contents"
          className="section"
          title={intl.formatMessage(messages.home)}
        >
          <ContentsBreadcrumbsHomeItem />
        </Link>
      ) : (
        <>
          <Link
            to="/contents"
            className="section"
            title={intl.formatMessage(messages.root)}
          >
            <ContentsBreadcrumbsRootItem />
          </Link>
          <Breadcrumb.Divider />
          <Link
            to={`${navroot['@id']}/contents`}
            className="section"
            title={navroot.title}
          >
            {navroot.title}
          </Link>
        </>
      )}
      {items.map((breadcrumb, index, breadcrumbs) => [
        <Breadcrumb.Divider key={`divider-${breadcrumb.url}`} />,
        index < breadcrumbs.length - 1 ? (
          <Link
            key={breadcrumb.url}
            to={`${breadcrumb.url}/contents`}
            className="section"
          >
            {breadcrumb.nav_title || breadcrumb.title}
          </Link>
        ) : (
          <Breadcrumb.Section key={breadcrumb.url} active>
            {breadcrumb.nav_title || breadcrumb.title}
          </Breadcrumb.Section>
        ),
      ])}
    </Breadcrumb>
  );
};

export default ContentsBreadcrumbs;
