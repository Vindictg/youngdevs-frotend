import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const GuardedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticaded } = useAuth();
  console.log(isAuthenticaded);
  return (
    <Route
      {...rest}
      render={(props) => {
        if (isAuthenticaded) {
          return <Component {...props} />;
        }
        return (
          <Redirect to="/" props={props} />
        );
      }}
    />
  );
};

export default GuardedRoute;
