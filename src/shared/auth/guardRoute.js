import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const GuardRoute = ({ component: C, ...props }) => {
  const isAuthenticated = false;
  return (
    <Route
      {...props}
      render={isAuthenticated ? <C {...props} /> : <Redirect to="/login" />}
    />
  );
};

export default { GuardRoute };
