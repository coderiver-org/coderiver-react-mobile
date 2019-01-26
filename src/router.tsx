import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';
import Welcome from '@pages/Welcome';
import { History } from 'history';
import { Register } from '@pages/Register';
import { Login } from '@pages/Login';

export default ({ history }: { history: History }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};
