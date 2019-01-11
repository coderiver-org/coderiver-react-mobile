import { routerRedux } from 'dva/router';

export default {
  namespace: 'nickname',
  state: {
    isTrue: false,
    name: '',
  },
  reducers: {
    nicknameChange(state, { payload: { name } }: any) {
      let nameLen = name.length;
      let nowState = state.isTrue;
      if (nameLen <= 2) {
        nowState = false;
      } else {
        nowState = true;
      }
      return {
        ...state,
        name: name,
        isTrue: nowState,
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
