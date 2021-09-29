import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const GuardedLoginRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isAuthenticated) {
          return <Redirect to="/" props={props} />;
        }
        return (
          <Component {...props} />
        );
      }}
    />
  );
};

export default GuardedLoginRoute;
