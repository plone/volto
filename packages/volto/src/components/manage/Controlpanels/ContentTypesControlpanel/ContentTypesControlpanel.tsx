import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { defineMessages, useIntl } from 'react-intl';
import { Link, Redirect, useParams } from 'react-router-dom';
import {
  CONTENT_TYPES_BASE_PATH,
  ContentTypePage,
  ContentTypesList,
  contentTypeHref,
  type ContentTypeTab,
  type ContentTypesDriver,
} from '@plone/controlpanels';
import '@plone/controlpanels/dist/controlpanels.css';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import { useClient } from '@plone/volto/hooks';
import backSVG from '@plone/volto/icons/back.svg';
import ContentTypesProviders from './ContentTypesProviders';
import { loadRestApiDriver } from './restApiDriver';

const messages = defineMessages({
  back: {
    id: 'Back',
    defaultMessage: 'Back',
  },
  loading: {
    id: 'loading',
    defaultMessage: 'Loading',
  },
  loadError: {
    id: 'The content types could not be loaded.',
    defaultMessage: 'The content types could not be loaded.',
  },
});

const TABS: ContentTypeTab[] = [
  'settings',
  'workflow',
  'fields',
  'behaviors',
  'layout',
];

/**
 * The content types control panel: `/controlpanel/content-types` lists the
 * types, `/controlpanel/content-types/{type}/{tab}` shows one. The screens
 * come from `@plone/controlpanels`, which Plone Aurora uses too.
 */
export default function ContentTypesControlpanel() {
  const intl = useIntl();
  const isClient = useClient();
  const { type, tab } = useParams<{ type?: string; tab?: string }>();
  const [driver, setDriver] = useState<ContentTypesDriver>();
  const [error, setError] = useState(false);

  useEffect(() => {
    let current = true;
    loadRestApiDriver().then(
      (loaded) => current && setDriver(loaded),
      () => current && setError(true),
    );
    return () => {
      current = false;
    };
  }, []);

  if (type && !TABS.includes(tab as ContentTypeTab)) {
    return <Redirect to={contentTypeHref(CONTENT_TYPES_BASE_PATH, type)} />;
  }
  // Until the new Layout tab, Volto's layout editor stays where it was.
  if (type && tab === 'layout') {
    return (
      <Redirect
        to={`/controlpanel/dexterity-types/${encodeURIComponent(type)}/layout`}
      />
    );
  }

  return (
    <div id="page-content-types" className="ui container">
      {error && <p>{intl.formatMessage(messages.loadError)}</p>}
      {!error && !driver && <p>{intl.formatMessage(messages.loading)}</p>}
      {driver && (
        <ContentTypesProviders driver={driver}>
          {type ? (
            <ContentTypePage id={type} tab={tab as ContentTypeTab} />
          ) : (
            <ContentTypesList />
          )}
        </ContentTypesProviders>
      )}
      {isClient &&
        createPortal(
          <Toolbar
            pathname={
              type
                ? `${CONTENT_TYPES_BASE_PATH}/${type}`
                : CONTENT_TYPES_BASE_PATH
            }
            hideDefaultViewButtons
            inner={
              <Link
                to={type ? CONTENT_TYPES_BASE_PATH : '/controlpanel'}
                className="item"
              >
                <Icon
                  name={backSVG}
                  className="contents circled"
                  size="30px"
                  title={intl.formatMessage(messages.back)}
                />
              </Link>
            }
          />,
          document.getElementById('toolbar') as HTMLElement,
        )}
    </div>
  );
}
