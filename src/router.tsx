import * as React from 'react';
import { Route, Router, Switch } from 'dva/router';
import Welcome from '@pages/Welcome';

export default ({ history }: { history: any }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Welcome} />
      </Switch>
    </Router>
  );
};
