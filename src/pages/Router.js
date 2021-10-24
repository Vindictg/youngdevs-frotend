import React from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import Game from './Game';
import Home from './Home';
import Login from './Login';
import Premium from './Premium';
import Ranking from './Ranking';
import Admin from './Admin';
import Support from './Support';
import Nav from '../shared/components/Nav';
import GuardedRoute from '../shared/auth/guardedRoute';
import GuardedLoginRoute from '../shared/auth/guardedLoginRoute';
import GuardedAdminRoute from '../shared/auth/guardedAdminRoute';
import useAuth from '../hooks/useAuth';
import Level from './Level';

const Router = () => {
  const { authLoading } = useAuth();

  return (
    <>
      { !authLoading && (
        <BrowserRouter>
          <Nav />
          <Switch>
            <GuardedLoginRoute exact path="/login" component={Login} />
            <GuardedRoute exact path="/game" component={Game} />
            <GuardedRoute exact path="/premium" component={Premium} />
            <GuardedRoute exact path="/ranking" component={Ranking} />
            <GuardedRoute exact path="/support" component={Support} />
            <GuardedAdminRoute exact path="/admin" component={Admin} />
            <GuardedRoute exact path="/" component={Home} />
            <GuardedRoute exact path="/levels" component={Level} />
          </Switch>
          <div className="App-rights">All Rights Reserved YoungDevs &copy;</div>
        </BrowserRouter>
      )}
    </>
  );
};

export default Router;
