import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoutes = ({ component: Component, ...rest }) => {
  const token = useSelector((state) => state.userSession.token);

  return (
    <Route
      {...rest}
      render={(props) =>
        token ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )
      }
    />
  );
};
