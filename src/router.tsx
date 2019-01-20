import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';
import Welcome from '@pages/Welcome';
import Login from '@pages/Login';

export default ({ history }: { history: any }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route exact path="/Login" component={Login} />
      </Switch>
    </Router>
  );
};
