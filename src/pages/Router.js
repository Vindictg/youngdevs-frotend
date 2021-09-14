import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './Game';
import Login from './Login';

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/game" component={Game} />
    </Switch>
  </BrowserRouter>
);

export default Router;
