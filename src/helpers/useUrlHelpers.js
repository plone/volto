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
 export function calculateApiPath(apiPath, internalApiPath, protocol) {
  const { settings } = config;
  let apiPathValue = '';
  if (__SERVER__) {
    if (
      (!settings.internalApiPath || settings.internalApiPath === undefined) &&
      internalApiPath
    ) {
      apiPathValue = internalApiPath;
    } else if (
      (!settings.apiPath || settings.apiPath === undefined) &&
      apiPath
    ) {
      apiPathValue = `${protocol}://${apiPath}`;
    } else {
      apiPathValue =
        settings.internalApiPath === undefined
          ? 'http://localhost:8080/Plone'
          : settings.internalApiPath;
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
