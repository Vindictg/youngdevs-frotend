import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useAuth();
  console.log(isAuthenticated());

  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticated()) {
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
