import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Goback from '@components/Goback';
import util from '@util/index';

interface INickNameProps {
  dispatch: (object: Object) => Object;
  history: any;
  notarizePwd: string;
  pwd: string;
  isPwdTrue: boolean;
  isNotarizeTrue: boolean;
}

const initialState: any = {
  passwordStateHide: true,
  notariPwdStateHIde: true,
};
type State = Readonly<typeof initialState>;

class NickName extends Component<INickNameProps, State> {
  readonly state: State = initialState;
  public constructor(props) {
    super(props);
  }
  public sendSub = () => {
    const { dispatch, pwd, isPwdTrue, isNotarizeTrue, notarizePwd } = this.props;
    if (!isNotarizeTrue || !isPwdTrue) return;
    dispatch({
      type: 'registerModel/pwdSub',
      payload: { pwd: notarizePwd },
    });
  };

  public pwdChange(e) {
    let pwdValue = e.target.value,
      passState = util.checkPwd(pwdValue) ? true : false;
    this.props.dispatch({
      type: 'registerModel/inputChange',
      payload: { pwd: pwdValue, isPwdTrue: passState },
    });
  }
  public notarizeChange(e) {
    const { pwd } = this.props;
    let pwdValue = e.target.value,
      nState = util.checkPwd(pwdValue) && pwd === pwdValue ? true : false;
    this.props.dispatch({
      type: 'registerModel/inputChange',
      payload: { notarizePwd: pwdValue, isNotarizeTrue: nState },
    });
  }
  public toggleHandle(typeState: any) {
    this.setState((prevState: State) => ({
      [typeState]: !prevState[typeState],
    }));
  }
  public render() {
    const { dispatch, pwd, isPwdTrue, isNotarizeTrue, notarizePwd } = this.props;
    const { notariPwdStateHIde, passwordStateHide } = this.state;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>创建密码</div>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>密码</span>
              <span
                className={styles.toggle}
                onClick={() => this.toggleHandle('passwordStateHide')}
              >
                {passwordStateHide ? '隐藏' : '显示'}
              </span>
            </div>
            <div className={styles.inputItem}>
              <input
                onChange={e => {
                  this.pwdChange(e);
                }}
                value={pwd}
                className={styles.input}
                type={passwordStateHide ? 'text' : 'password'}
                placeholder="请输入密码"
              />
              {isPwdTrue ? <span className={styles.check} /> : null}
            </div>
          </div>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>确认密码</span>
              <span
                className={styles.toggle}
                onClick={() => this.toggleHandle('notariPwdStateHIde')}
              >
                {notariPwdStateHIde ? '隐藏' : '显示'}
              </span>
            </div>
            <div className={styles.inputItem}>
              <input
                onChange={e => {
                  this.notarizeChange(e);
                }}
                value={notarizePwd}
                className={styles.input}
                type={notariPwdStateHIde ? 'text' : 'password'}
                placeholder="请确认密码"
              />
              {isNotarizeTrue ? <span className={styles.check} /> : null}
            </div>
          </div>
          <div className={styles.btnBox} onClick={this.sendSub}>
            <span className={styles.subBtn} />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    pwd: state.registerModel.pwd,
    notarizePwd: state.registerModel.notarizePwd,
    isPwdTrue: state.registerModel.isPwdTrue,
    isNotarizeTrue: state.registerModel.isNotarizeTrue,
  };
}

export default connect(mapStateToProps)(NickName);
