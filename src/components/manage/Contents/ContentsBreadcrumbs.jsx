import React from 'react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link, useLocation } from 'react-router-dom';
import { defineMessages, useIntl } from 'react-intl';
import config from '@plone/volto/registry';

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
  const { settings } = config;
  const { items } = props;
  const intl = useIntl();
  const pathname = useLocation().pathname;
  const lang = pathname.split('/')[1];

  return (
    <Breadcrumb>
      {settings.isMultilingual && (
        <>
          <Link
            to="/contents"
            className="section"
            title={intl.formatMessage(messages.root)}
          >
            {intl.formatMessage(messages.root)}
          </Link>
          <Breadcrumb.Divider />
        </>
      )}
      {settings.isMultilingual && pathname?.split('/')?.length > 2 && (
        <Link
          to={`/${lang}/contents`}
          className="section"
          title={intl.formatMessage(messages.home)}
        >
          {lang}
        </Link>
      )}
      {!settings.isMultilingual && (
        <Link
          to="/contents"
          className="section"
          title={intl.formatMessage(messages.home)}
        >
          {intl.formatMessage(messages.home)}
        </Link>
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
