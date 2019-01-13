import { routerRedux } from 'dva/router';

export default {
  namespace: 'loginModel',
  state: {
    mobileErr: false,
    passwordErr: false,
    password: '',
    mobile: '',
  },
  reducers: {
    inputChange(state, payload) {
      console.log(payload.payload);
      return {
        ...state,
        ...payload.payload,
      };
    },
  },
  effects: {
    *subNickName({ payload: { nickName } }: any, { call, put }) {
      //coding
      yield put(routerRedux.push('/'));
    },
  },
};
