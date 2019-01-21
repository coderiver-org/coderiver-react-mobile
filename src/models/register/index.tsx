import { routerRedux } from 'dva/router';

export default {
  namespace: 'registerModel',
  state: {
    isNickTrue: false,
    isMailTrue: false,
    isPhoneTrue: false,
    isPwdTrue: false,
    isNotarizeTrue: false,
    name: '',
    mail: '',
    phone: '',
    pwd: '',
    notarizePwd: '',
    role: ['设计师'],
    roleData: [
      {
        label: 'java工程师',
        value: 'java1',
      },
      {
        label: '前端工程师',
        value: '111',
      },
      {
        label: '牛逼工程师',
        value: '112',
      },
      {
        label: '斗牛工程师',
        value: '113',
      },
      {
        label: '需求工程师',
        value: '114',
      },
      {
        label: '死亡工程师',
        value: '115',
      },
    ],
  },
  reducers: {
    nicknameChange(state, { payload: { name } }: any) {
      let nameLen = name.length;
      let nowState = state.isNickTrue;
      if (nameLen <= 2) {
        nowState = false;
      } else {
        nowState = true;
      }
      return {
        ...state,
        name: name,
        isNickTrue: nowState,
      };
    },
    inputChange(state, payload) {
      return {
        ...state,
        ...payload.payload,
      };
    },
  },
  effects: {
    *registerStep2({ payload }: any, { call, put }) {
      //coding
      yield put(routerRedux.push('/registerPwd'));
    },
    *pwdSub({ payload }: any, { call, put }) {
      //coding
      yield put(routerRedux.push('/choicerole'));
    },
  },
};
