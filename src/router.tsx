import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';
import Login from '@pages/Login';
import Guide from '@pages/Guide';
import Welcome from '@pages/Welcome';
import NickName from '@pages/NickName';
import Home from '@pages/Home';

interface RoutersProps {
  history: any;
  app: object;
}
const Routers = function({ history, app }: RoutersProps) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/welcome" component={Welcome} />
        <Route path="/login" component={Login} />
        <Route path="/guide" component={Guide} />
        <Route path="/nickname" component={NickName} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routers;
