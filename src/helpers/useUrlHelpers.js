import { Component } from 'react';
import { useSelector } from 'react-redux';
import { _getBaseUrl } from './Url/Url';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import config from '@plone/volto/registry';

export function useUrlHelpers() {
  const apiHeaders = useSelector((store) => store.userSession.apiHeaders);

  function getApiPath() {
    return calculateApiPath(
      apiHeaders.host,
      apiHeaders.internalApiPath,
      apiHeaders.protocol,
    );
  }
  return {
    getApiPath: getApiPath,
  };
}


export function injectUrlHelpers(WrappedComponent){
  class urlHelpers extends Component {

  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    apiPath: PropTypes.string,
  };

  /**
   * Default properties.
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    apiPath: null,
  };

    flattenToAppUrl() {
      return  'flat url';
    };

    getApiPath() {
      return calculateApiPath(
        this.props.apiHeaders.host,
        this.props.apiHeaders.internalApiPath,
        this.props.apiHeaders.protocol,
      );
    }

    render() {
      return (
        <WrappedComponent
          getApiPath={() => this.getApiPath()}
          flattenToAppURL={this.flattenToAppUrl}
        />
      );
    }
  }

  return connect((store)=> ({
    apiHeaders: store.userSession.apiHeaders
  }))(urlHelpers);
}


/**
 * Return the correct apiPath based on appropriate settings/headers.
 * @function calculateApiPath
 * @param {string} path Path (or URL) to be formatted.
 * @param {Object} req The request object for server side calls.
 * @returns {string} Detected apiPath.
 */
export function calculateApiPath(host, internalApiPath, protocol, apiPath) {
  const { settings } = config;
  let apiPathValue = '';
  if (__SERVER__) {
    if (
      // We don't have a RAZZLE_INTERNAL_API_ATH but there is an X-Internal-Api-Path header
      (!settings.internalApiPath || settings.internalApiPath === undefined) &&
      internalApiPath
    ) {
      apiPathValue = internalApiPath;
    } else if (
      // We don't have a RAZZLE_API_PATH but there is an X-Api-Path header
      (!settings.apiPath || settings.apiPath === undefined) &&
      apiPath
    ) {
      apiPathValue = apiPath;
    } else if (
      (!settings.internalApiPath || settings.internalApiPath === undefined) &&
      settings.apiPath
    ) {
      // We don't have a RAZZLE_INTERNAL_API_PATH but we have a RAZZLE_API_PATH
      apiPathValue = settings.apiPath;
    } else if ((!settings.apiPath || settings.apiPath === undefined) && host) {
      // We don't have a RAZZLE_API_PATH (or RAZZLE_INTERNAL_API_PATH) but there is a detectable host
      apiPathValue = `${protocol}://${host}`;
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
