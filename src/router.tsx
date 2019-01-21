import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';
import Login from '@pages/Login';
import Guide from '@pages/Guide';
import NickName from '@pages/NickName';
import Home from '@pages/Home';
import RegisterPhone from '@pages/RegisterPhone';
import RegisterPwd from '@pages/RegisterPwd';
import RegisterRole from '@pages/RegisterRole';

interface RoutersProps {
  history: any;
  app: object;
}
const Routers = function({ history, app }: RoutersProps) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/guide" component={Guide} />
        <Route path="/nickname" component={NickName} />
        <Route path="/registerPhone" component={RegisterPhone} />
        <Route path="/registerPwd" component={RegisterPwd} />
        <Route path="/choicerole" component={RegisterRole} />
        <Route path="/" component={Home} />
      </Switch>
    </Router>
  );
};

export default Routers;
