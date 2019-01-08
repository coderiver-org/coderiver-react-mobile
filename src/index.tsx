import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import 'lib-flexible';
import '@assets/css/common.css';
import router from './router';
import count from './models/count';

const app = dva({
  history: createHistory(),
});

app.use(createLoading());

// 4. 注册程序路由
app.router(router);

app.model(count);

// 5. 启动项目
app.start('#root');
