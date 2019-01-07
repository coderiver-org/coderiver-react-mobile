// import { Reducer } from '../../common/types';

export default {
  namespace: 'count',
  state: 0,
  reducers: {
    add(count: number) {
      return count + 2;
    },
    minus(count: number) {
      return count - 1;
    },
  },
};
