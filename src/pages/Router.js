import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './Game';
import Login from './Login';
import GuardRoute from '../shared/auth/guardRoute';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Login} />
      <GuardRoute exact path="/game" component={Game} />
    </Switch>
  </BrowserRouter>
);

export default Router;
