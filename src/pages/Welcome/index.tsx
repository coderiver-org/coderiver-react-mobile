import * as React from 'react';
import logoUrl from '../../assets/images/logo图案.png';
import styles from './index.module.less';
import { Button } from 'antd-mobile';
import { History } from 'history';
import { Link } from 'dva/router';

export interface IWelcomeProps {
  history: History;
}

export default class Welcome extends React.Component<IWelcomeProps, any> {
  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <div className={styles.sign + ' bg'}>
        <div>
          <Link to="/login">登录</Link>
        </div>
        <div>{/* <img src={logoUrl} alt="" /> */}</div>
        <h1>欢迎来到CodeRiver</h1>
        <div className={styles.btns}>
          <Link to="/login">使用Github账号登录</Link>
          <Link to="/register">创建账号</Link>
        </div>
        <h4>更多登陆方式</h4>
        <div>
          <a>新浪微博</a>
          <a>微信</a>
        </div>
      </div>
    );
  }
}
