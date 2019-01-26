import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import './style.less';

const app = dva({
  history: createHistory(),
  onHmr: () => {
    if (module.hot) {
      module.hot.accept();
    }
  },
});

import router from './router';
import appModel from './models/app/app.model';
// 4. 注册程序路由
app.router(router);

app.model(appModel);

// 5. 启动项目
app.start('#root');
