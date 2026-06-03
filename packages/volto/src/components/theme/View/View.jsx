/**
 * View container.
 * @module components/theme/View/View
 */

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useLocation } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { useIntl } from 'react-intl';
import qs from 'query-string';

import ContentMetadataTags from '@plone/volto/components/theme/ContentMetadataTags/ContentMetadataTags';
import Comments from '@plone/volto/components/theme/Comments/Comments';
import Toolbar from '@plone/volto/components/manage/Toolbar/Toolbar';
import { listActions } from '@plone/volto/actions/actions/actions';
import { getContent } from '@plone/volto/actions/content/content';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { getBaseUrl, flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { getLayoutFieldname } from '@plone/volto/helpers/Content/Content';
import { hasApiExpander } from '@plone/volto/helpers/Utils/Utils';
import { AlternateHrefLangs } from '@plone/volto/components/theme/AlternateHrefLangs/AlternateHrefLangs';

import config from '@plone/volto/registry';
import SlotRenderer from '../SlotRenderer/SlotRenderer';

/**
 * View container class.
 * @function View
 * @returns {JSX.Element}
 */
const View = (props) => {
  const { history } = props;
  const location = useLocation();
  const dispatch = useDispatch();
  const intl = useIntl();
  const [isClient, setIsClient] = useState(false);

  const pathname = location.pathname;
  const search = location.search;
  const versionId = qs.parse(search)?.version;

  const token = useSelector((state) => state.userSession.token);
  const content = useSelector((state) => state.content.data);
  const error = useSelector((state) => state.content.get.error);
  const connectionRefused = useSelector(
    (state) => state.apierror.connectionRefused,
  );

  useEffect(() => {
    if (!hasApiExpander('actions', getBaseUrl(pathname))) {
      dispatch(listActions(getBaseUrl(pathname)));
    }
    dispatch(getContent(getBaseUrl(pathname), versionId));
  }, [dispatch, pathname, versionId]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getViewDefault = () => config.views.defaultView;

  const getViewByType = () =>
    config.views.contentTypesViews[content?.['@type']] || null;

  const getViewByLayout = () =>
    config.views.layoutViews[content?.[getLayoutFieldname(content)]] || null;

  const cleanViewName = (dirtyDisplayName) =>
    dirtyDisplayName
      .replace('Connect(', '')
      .replace('injectIntl(', '')
      .replace(')', '')
      .replace('connect(', '')
      .toLowerCase();

  const { views } = config;

  if (error?.code && [301, 302].includes(error.code)) {
    const redirect = flattenToAppURL(error.url)
      .split('?')[0]
      .replace('/++api++', '');
    return <Redirect to={`${redirect}${search}`} />;
  }

  if (error && !connectionRefused) {
    let FoundView;
    if (error.status === undefined) {
      FoundView = views.errorViews.corsError;
    } else {
      FoundView = views.errorViews[error.status.toString()];
    }
    if (!FoundView) {
      FoundView = views.errorViews['404'];
    }
    return (
      <div id="view">
        <BodyClass
          className={
            FoundView.displayName
              ? `view-${cleanViewName(FoundView.displayName)}`
              : null
          }
        />
        <FoundView {...props} intl={intl} error={error} />
      </div>
    );
  }

  if (!content) {
    return <span />;
  }

  const RenderedView = getViewByLayout() || getViewByType() || getViewDefault();

  return (
    <div id="view" tabIndex="-1">
      <ContentMetadataTags content={content} />
      <AlternateHrefLangs content={content} />
      <BodyClass
        className={
          RenderedView.displayName
            ? `view-${cleanViewName(RenderedView.displayName)}`
            : null
        }
      />
      <SlotRenderer name="aboveContent" content={content} />
      <RenderedView
        key={flattenToAppURL(content['@id'])}
        content={content}
        location={location}
        token={token}
        history={history}
        intl={intl}
      />
      <SlotRenderer name="belowContent" content={content} />
      {content.allow_discussion && <Comments pathname={pathname} />}
      {isClient &&
        createPortal(
          <Toolbar pathname={pathname} inner={<span />} />,
          document.getElementById('toolbar'),
        )}
    </div>
  );
};

View.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default View;
