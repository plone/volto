import { FormattedMessage } from 'react-intl';
import { Link, Redirect } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { withServerErrorCode } from '@plone/volto/helpers/Utils/Utils';
import BodyClass from '@plone/volto/helpers/BodyClass/BodyClass';

const Unauthorized = () => {
  const token = useSelector((state) => state.userSession.token);
  const error_message = useSelector((state) => state.apierror?.message);
  let location = useLocation();

  if (!token) {
    return (
      <Redirect
        to={{
          pathname: `${location.pathname.replace(/\/$/, '')}/login`,
          search: `?return_url=${encodeURIComponent(location.pathname)}`,
          state: {
            // This is needed to cover the use case of being logged in in
            // another backend (eg. in development), having a token for
            // localhost and try to use it, the login route has to know that
            // it's the same as it comes from a logout
            isLogout: true,
          },
        }}
      />
    );
  }

  return (
    <Container className="view-wrapper">
      <BodyClass className="view-unauthorized" />
      <h1>
        <FormattedMessage id="Unauthorized" defaultMessage="Unauthorized" />
      </h1>
      <h3>{error_message}</h3>
      <p className="description">
        <FormattedMessage
          id="You are trying to access a protected resource."
          defaultMessage="You are trying to access a protected resource."
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
const UnauthorizedWithCode = withServerErrorCode(401)(Unauthorized);
UnauthorizedWithCode.displayName = 'unauthorized';
export default UnauthorizedWithCode;
