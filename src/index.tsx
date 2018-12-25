import dva from 'dva';
import createHistory from 'history/createBrowserHistory';

const app = dva({
  history: createHistory(),
});

import router from './router';
import count from './models/count';
// 4. 注册程序路由
app.router(router);

app.model(count);

// 5. 启动项目
app.start('#root');
