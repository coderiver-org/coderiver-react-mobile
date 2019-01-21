import { routerRedux } from 'dva/router';

export default {
  namespace: 'loginModel',
  state: {
    isMobileLogin: true,
    mobileErr: false,
    passwordErr: false,
    mailErr: false,
    password: '',
    mobile: '',
    mail: '',
  },
  reducers: {
    inputChange(state, payload) {
      return {
        ...state,
        ...payload.payload,
      };
    },
    loginStateChange(state, payload) {
      return {
        ...state,
        ...payload.payload,
      };
    },
  },
  effects: {
    *subLogin({ payload }: any, { call, put }) {
      //coding
      yield put(routerRedux.push('/'));
    },
  },
};
