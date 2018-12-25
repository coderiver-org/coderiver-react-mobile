import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';
import Count from './pages/Count/Count';
import StatefulCount from './pages/StatefulCount/StatefulCount';

export default ({ history }: { history: any }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/count" component={Count} />
        <Route path="/" component={StatefulCount} />
      </Switch>
    </Router>
  );
};
