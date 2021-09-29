import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Game from './Game';
import Home from './Home';
import Login from './Login';
import GuardedRoute from '../shared/auth/guardedRoute';
import GuardedLoginRoute from '../shared/auth/guardedLoginRoute';
import useAuth from '../hooks/useAuth';

const Router = () => {
  const { authLoading } = useAuth();

  return (
    <>
      { !authLoading && (
        <BrowserRouter>
          <Switch>
            <GuardedLoginRoute exact path="/login" component={Login} />
            <GuardedRoute exact path="/game" component={Game} />
            <GuardedRoute exact path="/" component={Home} />
          </Switch>
        </BrowserRouter>
      )}
    </>
  );
};

export default Router;
