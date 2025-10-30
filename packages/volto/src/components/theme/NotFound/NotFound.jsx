import { useEffect } from 'react';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import {
  toBackendLang,
  withServerErrorCode,
} from '@plone/volto/helpers/Utils/Utils';
import { flattenToAppURL } from '@plone/volto/helpers/Url/Url';
import { useDispatch, useSelector } from 'react-redux';
import { getErrorContext } from '@plone/volto/actions/content/content';

/**
 * Not found function.
 * @function NotFound
 * @returns {string} Markup of the not found page.
 */
const NotFound = (props) => {
  const { error } = props;
  const dispatch = useDispatch();
  const lang = useSelector((state) => state.intl.locale);
  const isMultilingual = useSelector(
    (state) => state.site.data.features?.multilingual,
  );

  // load content that does exist, to make sure we have everything needed to render the header and footer
  const errorContext = error?.response?.body?.context;
  const contextPath = errorContext
    ? flattenToAppURL(errorContext)
    : isMultilingual
      ? `/${toBackendLang(lang)}`
      : '/';
  useEffect(() => {
    dispatch(getErrorContext(contextPath));
  }, [dispatch, contextPath]);

  return (
    <Container className="view-wrapper">
      <BodyClass className="page-not-found" />
      <h1>
        <FormattedMessage
          id="This page does not seem to exist…"
          defaultMessage="This page does not seem to exist…"
        />
      </h1>
      <p className="description">
        <FormattedMessage
          id="We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for."
          defaultMessage="We apologize for the inconvenience, but the page you were trying to access is not at this address. You can use the links below to help you find what you are looking for."
        />
      </p>
      <p>
        <FormattedMessage
          id="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          defaultMessage="If you are certain you have the correct web address but are encountering an error, please contact the {site_admin}."
          values={{
            site_admin: (
              <Link to="/contact-form">
                <FormattedMessage
                  id="Site Administration"
                  defaultMessage="Site Administration"
                />
              </Link>
            ),
          }}
        />
      </p>
      <p>
        <FormattedMessage id="Thank you." defaultMessage="Thank you." />
      </p>
    </Container>
  );
};

export default withServerErrorCode(404)(NotFound);
