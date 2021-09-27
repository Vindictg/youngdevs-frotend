import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './Game';
import Home from './Home';
import Login from './Login';
import GuardedRoute from '../shared/auth/guardedRoute';
import { AuthProvider } from '../context/AuthContext';

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Switch>
        <Route exact path="/login" component={Login} />
        <GuardedRoute exact path="/game" component={Game} />
        <GuardedRoute exact path="/" component={Home} />
      </Switch>
    </AuthProvider>
  </BrowserRouter>
);

export default Router;
