import * as React from 'react';
import { DvaInstance } from 'dva';
import { Route, Router, Switch } from 'dva/router';
import lazyComponent from './components/lazyComponent';

interface IRoute {
  key: string;
  path: string;
  isAuth?: boolean;
  component: React.ComponentType;
}

export default ({ history, app }: { history: any; app: DvaInstance }) => {
  const routes: IRoute[] = [
    {
      key: 'welcome',
      path: '/',
      // isAuth: false,
      component: lazyComponent({
        app,
        // models: () => [],
        component: () => import('@pages/Welcome'),
      }),
    },
    {
      key: 'home',
      path: '/home',
      isAuth: true,
      component: lazyComponent({
        app,
        component: () => import('@pages/home'),
        models: () => [import('@pages/home/model')],
      }),
    },
  ];

  return (
    <Router history={history}>
      <Switch>
        {routes.map(route => {
          // todo 授权路由
          // if (route.isAuth) {
          //   return <AuthRoute />;
          // }
          return <Route key={route.key} path={route.path} component={route.component} />;
        })}
      </Switch>
    </Router>
  );
};
