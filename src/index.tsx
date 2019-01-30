import dva from 'dva';
import createHistory from 'history/createBrowserHistory';
import createLoading from 'dva-loading';
import '@assets/css/common.css';
import router from './router';
import registerModel from './models/register';
import loginModel from './models/login';

const app = dva({
  history: createHistory(),
  onHmr: () => {
    if (module.hot) {
      module.hot.accept();
    }
  },
});

app.use(createLoading());

// 4. 注册程序路由
app.router(router);

let models = [loginModel, registerModel];

models.forEach(m => {
  app.model(m);
});

// 5. 启动项目
app.start('#root');
