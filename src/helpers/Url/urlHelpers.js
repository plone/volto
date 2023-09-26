import {
  flattenHTMLToAppURL as classicFlattenHTMLToAppURL,
  flattenToAppURL as classicFlattenToAppURL,
} from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import hoistNonReactStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect, shallowEqual, useSelector } from 'react-redux';

export function useUrlHelpers() {
  const apiHeaders = useSelector(
    (store) => store.userSession?.apiHeaders,
    shallowEqual,
  );
  // TODO: Could memo this? Would need to see how often it is called and if apiHeaders works with shallowEqual
  const hasApiHeaders = !!apiHeaders && Object.keys(apiHeaders).length > 0;

  function getApiPath() {
    return calculateApiPath({
      protocol: apiHeaders.protocol,
      host: apiHeaders.host,
      internalApiPath: apiHeaders.internalApiPath,
      apiPath: apiHeaders.apiPath,
    });
  }

  function flattenToAppURL(url) {
    if (!hasApiHeaders) {
      return classicFlattenToAppURL(url);
    }
    return (
      url &&
      url
        .replace(apiHeaders.internalApiPath, '')
        .replace(apiHeaders.apiPath, '')
        .replace(apiHeaders.publicURL, '')
    );
  }

  function flattenHTMLToAppURL(html) {
    if (!hasApiHeaders) {
      return classicFlattenHTMLToAppURL(html);
    }
    return apiHeaders.internalApiPath
      ? html
          .replace(new RegExp(apiHeaders.internalApiPath, 'g'), '')
          .replace(new RegExp(apiHeaders.apiPath, 'g'), '')
      : html.replace(new RegExp(apiHeaders.apiPath, 'g'), '');
  }

  function stub() {
    return 'stub';
  }

  return {
    getApiPath: getApiPath,
    flattenToAppURL: flattenToAppURL,
    toPublicURL: stub,
    flattenHTMLToAppURL: flattenHTMLToAppURL,
    addAppURL: stub,
    expandToBackendURL: stub,
    isInternalURL: stub,
  };
}

export function injectUrlHelpers(WrappedComponent) {
  const decorator = (WrappedComponent) => {
    function WithURLHelpers(props) {
      WithURLHelpers.displayName = `WithURLHelpers(${getDisplayName(
        WrappedComponent,
      )})`;
      const helpers = useUrlHelpers();
      return <WrappedComponent {...props} urlHelpers={helpers} />;
    }

    return hoistNonReactStatics(WithURLHelpers, WrappedComponent);
  };

  return decorator(WrappedComponent);
}

/**
 * Return the correct apiPath based on appropriate settings/headers.
 * @function calculateApiPath
 * @param {Object} headers The headers needed to calculate the correct paths
 * @returns {string} The calculated apiPath.
 */
export function calculateApiPath(headers) {
  const { settings } = config;
  let apiPathValue = '';
  if (__SERVER__) {
    if (
      // We don't have a RAZZLE_INTERNAL_API_ATH but there is an X-Internal-Api-Path header
      (!settings.internalApiPath || settings.internalApiPath === undefined) &&
      headers.internalApiPath
    ) {
      apiPathValue = headers.internalApiPath;
    } else if (
      // We don't have a RAZZLE_API_PATH but there is an X-Api-Path header
      (!settings.apiPath || settings.apiPath === undefined) &&
      headers.apiPath
    ) {
      apiPathValue = headers.apiPath;
    } else if (
      (!settings.internalApiPath || settings.internalApiPath === undefined) &&
      settings.apiPath
    ) {
      // We don't have a RAZZLE_INTERNAL_API_PATH but we have a RAZZLE_API_PATH
      apiPathValue = settings.apiPath;
    } else if (
      (!settings.apiPath || settings.apiPath === undefined) &&
      headers.host
    ) {
      // We don't have a RAZZLE_API_PATH (or RAZZLE_INTERNAL_API_PATH) but there is a detectable host
      apiPathValue = `${headers.protocol}://${headers.host}`;
    } else {
      // Fallback to the default
      apiPathValue = 'http://localhost:8080/Plone';
    }
  } else {
    const windowApiPath = window.env?.apiPath;
    if (
      (!settings.apiPath || settings.apiPath === undefined) &&
      windowApiPath
    ) {
      apiPathValue = windowApiPath;
    } else {
      apiPathValue =
        settings.apiPath === undefined
          ? 'http://localhost:8080/Plone'
          : settings.apiPath;
    }
  }
  return apiPathValue;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}
