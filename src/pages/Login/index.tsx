import { Button, Icon } from 'antd-mobile';
import { Link, Redirect, Route, Switch } from 'dva/router';
import { History } from 'history';
import * as React from 'react';
import { ESignMethod } from 'Util/enum';
import styles from '../Register/index.module.less';
import { SignItem } from '@pages/Common/SignItem';

export interface ILoginProps {
  history: History;
}

export class Login extends React.Component<ILoginProps, { method: ESignMethod }> {
  constructor(props) {
    super(props);
    this.state = {
      method: ESignMethod.Phone,
    };
  }
  private handleMethod = () => {
    let nextUrl = this.state.method === ESignMethod.Email ? 'phone' : 'email';
    this.setState({ method: nextUrl as ESignMethod });
    this.props.history.replace('/login/' + nextUrl);
  };
  public render() {
    return (
      <div className={styles.login + ' bg'}>
        <div>
          <Icon type="left" size="lg" onClick={() => this.props.history.goBack()} />
        </div>
        <SignItem title="登陆">
          <Switch>
            <Redirect exact from="/login" to="/login/phone" />
            <Route exact path="/login/email" component={InputEmail} />
            <Route exact path="/login/phone" component={InputPhone} />
          </Switch>
          <h6>输入密码</h6>
          <input type="password" />
        </SignItem>
        <div>
          <Link to="/main" className={styles.right}>
            <Icon type="right" />
          </Link>
        </div>
      </div>
    );
  }
}

const InputEmail = () => (
  <>
    <h6>输入邮箱</h6>
    <input />
  </>
);

const InputPhone = () => (
  <>
    <h6>手机号码</h6>
    <input />
  </>
);
