import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isAuthenticated) {
          if (user.isLocked && (props.match.path !== '/' && props.match.path !== '/support')) {
            return (
              <Redirect to="/" props={props} />
            );
          }
          return <Component {...props} />;
        }
        return (
          <Redirect to="/login" props={props} />
        );
      }}
    />
  );
};

export default GuardedRoute;
