import React, { SFC } from 'react';
import { connect } from 'dva';
import './index.module.css';

type Props = {
  count: number;
  dispatch: (object: Object) => any;
};

const Count: SFC<Props> = ({ count, dispatch }) => (
  <div styleName="normal">
    <h1 styleName="title">Dva boilerplate with typescript</h1>
    <div>Count:{count}</div>
    <hr />
    <button
      onClick={() => {
        dispatch({ type: 'count/add' });
      }}
    >
      Add
    </button>
    <button
      onClick={() => {
        dispatch({ type: 'count/minus' });
      }}
    >
      Minus
    </button>
  </div>
);

export default connect(({ count }: { count: number }) => ({
  count,
}))(Count);
