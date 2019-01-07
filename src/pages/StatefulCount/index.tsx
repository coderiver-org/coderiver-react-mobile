import React from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import { Button, WhiteSpace } from 'antd-mobile';
import icon from '@assets/images/react.png';
import style from './index.module.less';
import { hotCom } from 'utility/hotCom';

const initialState = { clicksCount: 0 };
type State = Readonly<typeof initialState>;

type Props = {
  count: number;
  dispatch: (object: Object) => Object;
};

@hotCom
class World extends React.Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { clicksCount } = this.state;
    const { count, dispatch } = this.props;
    return (
      <div className={style.normal}>
        <h1 className={style.title}>Count:{count}</h1>
        <div>
          <Button type="primary" onClick={this.handleIncrement.bind(this, dispatch)}>
            Add
          </Button>
          <WhiteSpace />
          <Button type="primary" onClick={this.handleDecrement.bind(this, dispatch)}>
            Minus123
          </Button>
        </div>
        <Link to="/count">Count</Link>
        <div>{`You've clicked me ${clicksCount} times!`}</div>
        <img src={icon} />
      </div>
    );
  }

  private handleIncrement = dispatch => {
    this.setState(incrementClicksCount);
    dispatch({ type: 'count/add' });
  };

  private handleDecrement = dispatch => {
    this.setState(incrementClicksCount);
    dispatch({ type: 'count/minus' });
  };
}

const incrementClicksCount = (prevState: State) => ({
  clicksCount: prevState.clicksCount + 1,
});

export default connect(({ count }: { count: number }) => ({
  count,
}))(World);
