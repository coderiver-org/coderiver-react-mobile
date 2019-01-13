import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import Goback from '@components/Goback';
import styles from './index.module.less';
import util from '@util/index';

interface ILoginProps {
  dispatch: (object: Object) => Object;
  history: any;
  password: string;
  mobile: number;
  passwordErr: boolean;
  mobileErr: boolean;
}

const initialState = { passwordStateHide: true };
type State = Readonly<typeof initialState>;

class Login extends Component<ILoginProps, State> {
  readonly state: State = initialState;
  public constructor(props) {
    super(props);
  }
  private sendSub = () => {
    // const { dispatch, isTrue } = this.props;
    // if (nickname === '' || isTrue === false) return;
    // dispatch({
    //   type: 'nickname/subNickName',
    //   payload: { nickName: nickname },
    // });
  };

  private mobileChange(e) {
    const { mobileErr } = this.props;
    let value = e.target.value,
      mobileStates = mobileErr;
    if (util.checkMobile(value)) {
      mobileStates = true;
    } else {
      mobileStates = false;
    }
    this.props.dispatch({
      type: 'loginModel/inputChange',
      payload: { mobile: value, mobileErr: mobileStates },
    });
  }

  private passwordChange(e) {
    const { passwordErr } = this.props;
    let password = e.target.value,
      passState = passwordErr,
      pwdLen = password.length,
      reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
    if (pwdLen >= 6 && pwdLen <= 18 && reg.test(password)) {
      passState = true;
    } else {
      passState = false;
    }
    this.props.dispatch({
      type: 'loginModel/inputChange',
      payload: { password: password, passwordErr: passState },
    });
  }
  private toggleHandle = () => {
    this.setState(changePasswordState);
  };

  public render() {
    const { dispatch, password, mobile, mobileErr, passwordErr } = this.props;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>登录</div>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>手机号码</span>
            </div>
            <div className={styles.inputItem}>
              <span className={styles.qh}>+49</span>
              <input
                onChange={e => {
                  this.mobileChange(e);
                }}
                value={mobile}
                className={styles.input + ' ' + styles.mobileInput}
                type="text"
                placeholder="请输入手机号"
              />
              {mobileErr ? <span className={styles.check} /> : null}
            </div>
          </div>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>输入密码</span>
              <span className={styles.toggle} onClick={this.toggleHandle}>
                {this.state.passwordStateHide ? '隐藏' : '显示'}
              </span>
            </div>
            <div className={styles.inputItem}>
              <input
                onChange={e => {
                  this.passwordChange(e);
                }}
                ref="pwdInput"
                value={password}
                type={this.state.passwordStateHide ? 'text' : 'password'}
                className={styles.input}
                placeholder="请输入密码"
              />
              {passwordErr ? <span className={styles.check} /> : null}
            </div>
          </div>
          <div className={styles.btnBox}>
            <Link className={styles.btnComm} to="/">
              使用邮箱
            </Link>
            <span className={styles.subBtn} onClick={this.sendSub} />
          </div>
        </div>
      </div>
    );
  }
}

const changePasswordState = (prevState: State) => ({
  passwordStateHide: !prevState.passwordStateHide,
});

function mapStateToProps(state) {
  return {
    mobile: state.loginModel.mobile,
    password: state.loginModel.password,
    mobileErr: state.loginModel.mobileErr,
    passwordErr: state.loginModel.passwordErr,
  };
}

export default connect(mapStateToProps)(Login);
