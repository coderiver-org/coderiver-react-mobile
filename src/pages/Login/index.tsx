import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Toast } from 'antd-mobile';
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
  mailErr: boolean;
  mail: string;
  isMobileLogin: boolean;
}

const initialState = { passwordStateHide: true };
type State = Readonly<typeof initialState>;

class Login extends Component<ILoginProps, State> {
  readonly state: State = initialState;
  public constructor(props) {
    super(props);
  }

  private sendSub = () => {
    const {
      dispatch,
      isMobileLogin,
      password,
      mobile,
      mail,
      mailErr,
      mobileErr,
      passwordErr,
    } = this.props;
    const postParams: any = { password };
    if (isMobileLogin) {
      if (!mobileErr) {
        Toast.fail('请正确填写手机号', 2);
        return;
      }
      postParams.mobile = mobile;
    } else {
      if (!mailErr) {
        Toast.fail('请正确填写邮箱', 2);
        return;
      }
      postParams.mail = mail;
    }
    if (!passwordErr) {
      Toast.fail('密码格式错误', 2);
      return;
    }
    dispatch({
      type: 'loginModel/subLogin',
      payload: postParams,
    });
  };

  private mobileChange(e) {
    const { mobileErr } = this.props;
    let value = e.target.value,
      mobileStates = mobileErr;
    mobileStates = util.isMobile(value) ? true : false;
    this.props.dispatch({
      type: 'loginModel/inputChange',
      payload: { mobile: value, mobileErr: mobileStates },
    });
  }

  private mailChangeHandle(e) {
    const { mailErr } = this.props;
    let mail = e.target.value,
      mailStates = mailErr;
    mailStates = util.isMail(mail) ? true : false;
    this.props.dispatch({
      type: 'loginModel/inputChange',
      payload: { mail: mail, mailErr: mailStates },
    });
  }

  private passwordChange(e) {
    let password = e.target.value,
      passState = util.checkPwd(password) ? true : false;
    this.props.dispatch({
      type: 'loginModel/inputChange',
      payload: { password: password, passwordErr: passState },
    });
  }
  private toggleHandle = () => {
    this.setState(changePasswordState);
  };
  private changeLoginState = () => {
    let loginState = this.props.isMobileLogin;
    this.props.dispatch({
      type: 'loginModel/loginStateChange',
      payload: { isMobileLogin: !loginState },
    });
  };
  private loginChangeTemplage(isMobileLogin) {
    const { mobile, mail, mobileErr, mailErr } = this.props;
    if (isMobileLogin) {
      return (
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
      );
    } else {
      return (
        <div className={styles.inputBox}>
          <div className={styles.inputTop}>
            <span className={styles.inputTopText}>输入邮箱</span>
          </div>
          <div className={styles.inputItem}>
            <input
              onChange={e => {
                this.mailChangeHandle(e);
              }}
              value={mail}
              className={styles.input + ' ' + styles.mobileInput}
              type="text"
              placeholder="请输入邮箱"
            />
            {mailErr ? <span className={styles.check} /> : null}
          </div>
        </div>
      );
    }
  }

  public render() {
    const { dispatch, password, passwordErr, isMobileLogin } = this.props;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>登录</div>
          {this.loginChangeTemplage(isMobileLogin)}
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
            <span className={styles.btnComm} onClick={this.changeLoginState}>
              {isMobileLogin ? '使用邮箱' : '使用手机号码'}
            </span>
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
    mailErr: state.loginModel.mailErr,
    mail: state.loginModel.mail,
    isMobileLogin: state.loginModel.isMobileLogin,
  };
}

export default connect(mapStateToProps)(Login);
