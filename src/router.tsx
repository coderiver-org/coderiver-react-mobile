import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';

import Count from '@pages/Count';
import StatefulCount from '@pages/StatefulCount';
import Login from '@pages/Login';
import Welcome from '@pages/Welcome';
import NickName from '@pages/NickName';

interface RoutersProps {
  history: any;
  app: object;
}

const Routers = function({ history, app }: RoutersProps) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/count" component={Count} />
        <Route path="/login" component={Login} />
        <Route path="/nickname" component={NickName} />
        <Route path="/" component={StatefulCount} />
      </Switch>
    </Router>
  );
};

export default Routers;
