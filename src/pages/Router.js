import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Game from './Game';
import Home from './Home';
import Login from './Login';
import Premium from './Premium';
import Ranking from './Ranking';
import Nav from '../shared/components/Nav';
import GuardedRoute from '../shared/auth/guardedRoute';
import { AuthProvider } from '../context/AuthContext';

const Router = () => (
  <BrowserRouter>
    <AuthProvider>
      <Nav />
      <Switch>
        <Route exact path="/login" component={Login} />
        <GuardedRoute exact path="/game" component={Game} />
        <GuardedRoute exact path="/premium" component={Premium} />
        <GuardedRoute exact path="/ranking" component={Ranking} />
        <GuardedRoute exact path="/" component={Home} />
      </Switch>
    </AuthProvider>
    <div className="App-rights">All Rights Reserved YoungDevs &copy;</div>
  </BrowserRouter>
);

export default Router;
