export default {
  namespace: 'auth',

  state: {
    isLogin: false,
    username: '',
    userid: '',
  },

  effect: {
    *login() {},

    *logout() {},
  },

  reducers: {
    setUser(state, { payload: { userid, username } }) {
      return {
        username,
        userid,
        isLogin: true,
      };
    },
  },
};
