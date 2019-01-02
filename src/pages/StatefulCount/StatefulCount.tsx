import React, { Component } from 'react';
import { Link } from 'dva/router';
import { connect } from 'dva';
import './StatefulCount.css';
import icon from '@assets/images/react.png';

const initialState = { clicksCount: 0 };
type State = Readonly<typeof initialState>;

type Props = {
  count: number;
  children?: React.ReactNode;
  dispatch: (object: Object) => Object;
};

class World extends Component<Props, State> {
  readonly state: State = initialState;

  render() {
    const { clicksCount } = this.state;
    const { count, dispatch } = this.props;
    return (
      <div styleName="normal">
        <h1>Count:{count}</h1>
        <button onClick={this.handleIncrement.bind(this, dispatch)}>Add</button>
        <button onClick={this.handleDecrement.bind(this, dispatch)}>Minus</button>
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
