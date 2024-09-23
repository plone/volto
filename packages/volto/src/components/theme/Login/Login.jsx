import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom';
import {
  Container,
  Button,
  Form,
  Input,
  Segment,
  Grid,
} from 'semantic-ui-react';
import { FormattedMessage, defineMessages, useIntl } from 'react-intl';
import qs from 'query-string';

import { Helmet, usePrevious } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import { Icon } from '@plone/volto/components';
import {
  login,
  logout,
  resetLoginRequest,
  purgeMessages,
} from '@plone/volto/actions';
import { toast } from 'react-toastify';
import { Toast } from '@plone/volto/components';
import aheadSVG from '@plone/volto/icons/ahead.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { useUser } from '@plone/volto/hooks';

const messages = defineMessages({
  login: {
    id: 'Log in',
    defaultMessage: 'Log in',
  },
  loginName: {
    id: 'Login Name',
    defaultMessage: 'Login Name',
  },
  Login: {
    id: 'Login',
    defaultMessage: 'Login',
  },
  password: {
    id: 'Password',
    defaultMessage: 'Password',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
  loginFailed: {
    id: 'Login Failed',
    defaultMessage: 'Login Failed',
  },
  loginFailedContent: {
    id: 'Both email address and password are case sensitive, check that caps lock is not enabled.',
    defaultMessage:
      'Both email address and password are case sensitive, check that caps lock is not enabled.',
  },
  register: {
    id: 'Register',
    defaultMessage: 'Register',
  },
  forgotPassword: {
    id: 'box_forgot_password_option',
    defaultMessage: 'Forgot your password?',
  },
});

const Login = (props) => {
  const intl = useIntl();
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.userSession.token, shallowEqual);
  const error = useSelector((state) => state.userSession.login.error);
  const loading = useSelector((state) => state.userSession.login.loading);
  const returnUrl =
    qs.parse(props.location?.search ?? location.search).return_url ||
    location.pathname.replace(/\/login\/?$/, '').replace(/\/logout\/?$/, '') ||
    '/';

  const previousToken = usePrevious(token);

  // Get user and place their data in the Redux store
  useUser();

  useEffect(() => {
    if (location?.state?.isLogout) {
      // Execute a true Logout action
      // This is needed to cover the use case of being logged in in
      // another backend (eg. in development), having a token for
      // localhost and try to use it, the login route has to know that
      // it's the same as it comes from a logout
      // See also Unauthorized.jsx
      dispatch(logout());
      dispatch(purgeMessages());
      // Reset the location state
      history.push(`${location.pathname}${location.search}`);
    } else if (token && token !== previousToken) {
      // We just did a true login action
      history.push(returnUrl || '/');
      if (toast.isActive('loggedOut')) {
        toast.dismiss('loggedOut');
      }
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
      }
    }
    if (error) {
      if (toast.isActive('loggedOut')) {
        toast.dismiss('loggedOut');
      }
      if (!toast.isActive('loginFailed')) {
        toast.error(
          <Toast
            error
            title={intl.formatMessage(messages.loginFailed)}
            content={intl.formatMessage(messages.loginFailedContent)}
          />,
          { autoClose: false, toastId: 'loginFailed' },
        );
      }
    }
    return () => {
      if (toast.isActive('loginFailed')) {
        toast.dismiss('loginFailed');
        dispatch(resetLoginRequest());
      }
    };
  }, [
    dispatch,
    token,
    error,
    intl,
    history,
    returnUrl,
    location.search,
    location.pathname,
    location?.state?.isLogout,
    previousToken,
  ]);

  const onLogin = (event) => {
    dispatch(
      login(
        document.getElementsByName('login')[0].value,
        document.getElementsByName('password')[0].value,
      ),
    );
    event.preventDefault();
  };

  return (
    <div id="page-login">
      <Helmet title={intl.formatMessage(messages.Login)} />
      <Container text>
        <Form method="post" onSubmit={onLogin}>
          <Segment.Group raised>
            <Segment className="primary">
              <FormattedMessage id="Log In" defaultMessage="Login" />
            </Segment>
            <Segment secondary>
              <FormattedMessage
                id="Sign in to start session"
                defaultMessage="Sign in to start session"
              />
            </Segment>
            <Segment className="form">
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column width="4">
                      <div className="wrapper">
                        <label htmlFor="login">
                          <FormattedMessage
                            id="Login Name"
                            defaultMessage="Login Name"
                          />
                        </label>
                      </div>
                    </Grid.Column>
                    <Grid.Column width="8">
                      {/* eslint-disable jsx-a11y/no-autofocus */}
                      <Input
                        id="login"
                        name="login"
                        placeholder={intl.formatMessage(messages.loginName)}
                        autoFocus
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    <Grid.Column stretched width="4">
                      <div className="wrapper">
                        <label htmlFor="password">
                          <FormattedMessage
                            id="Password"
                            defaultMessage="Password"
                          />
                        </label>
                      </div>
                    </Grid.Column>
                    <Grid.Column stretched width="8">
                      <Input
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        name="password"
                        placeholder={intl.formatMessage(messages.password)}
                        tabIndex={0}
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
              <Form.Field inline className="help">
                <Grid>
                  <Grid.Row stretched>
                    {config.settings.showSelfRegistration && (
                      <Grid.Column stretched width="12">
                        <p className="help">
                          <Link to="/register">
                            {intl.formatMessage(messages.register)}
                          </Link>
                        </p>
                      </Grid.Column>
                    )}
                    <Grid.Column stretched width="12">
                      <p className="help">
                        <Link to="/passwordreset">
                          {intl.formatMessage(messages.forgotPassword)}
                        </Link>
                      </p>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Form.Field>
            </Segment>
            <Segment className="actions" clearing>
              <Button
                basic
                primary
                icon
                floated="right"
                type="submit"
                id="login-form-submit"
                aria-label={intl.formatMessage(messages.login)}
                title={intl.formatMessage(messages.login)}
                loading={loading}
              >
                <Icon className="circled" name={aheadSVG} size="30px" />
              </Button>

              <Button
                basic
                secondary
                icon
                floated="right"
                id="login-form-cancel"
                as={Link}
                to="/"
                aria-label={intl.formatMessage(messages.cancel)}
                title={intl.formatMessage(messages.cancel)}
              >
                <Icon className="circled" name={clearSVG} size="30px" />
              </Button>
            </Segment>
          </Segment.Group>
        </Form>
      </Container>
    </div>
  );
};

export default Login;
