import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { user } = useAuth();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (user.isAuthenticated) {
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
