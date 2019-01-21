import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Goback from '@components/Goback';
import { Toast } from 'antd-mobile';
import util from '@util/index';

interface IRPhoneProps {
  dispatch: (object: Object) => Object;
  history: any;
  mail: string;
  mobile: number;
  isMailTrue: boolean;
  isPhoneTrue: boolean;
}

const initialState = { isRegisterState: true };
type State = Readonly<typeof initialState>;

class RegisterPhone extends Component<IRPhoneProps, State> {
  readonly state: State = initialState;
  public constructor(props) {
    super(props);
  }
  public sendSub = () => {
    const { dispatch, isMailTrue, mobile, mail, isPhoneTrue } = this.props;
    const { isRegisterState } = this.state;
    const postParams: any = {};
    if (isRegisterState) {
      if (!isMailTrue) {
        Toast.fail('请正确填写邮箱', 2);
        return;
      }
      postParams.mail = mail;
    } else {
      if (!isPhoneTrue) {
        Toast.fail('请正确填写手机号', 2);
        return;
      }
      postParams.mobile = mobile;
    }

    dispatch({
      type: 'registerModel/registerStep2',
      payload: postParams,
    });
  };

  public mailChange(e) {
    let mail = e.target.value,
      mailStates = util.isMail(mail) ? true : false;
    this.props.dispatch({
      type: 'registerModel/inputChange',
      payload: { mail: mail, isMailTrue: mailStates },
    });
  }
  public changeStateHandle = () => {
    this.setState((prevState: State) => ({
      isRegisterState: !prevState.isRegisterState,
    }));
  };
  public mobileChange(e) {
    let value = e.target.value,
      mobileStates = util.isMobile(value) ? true : false;
    this.props.dispatch({
      type: 'registerModel/inputChange',
      payload: { mobile: value, isPhoneTrue: mobileStates },
    });
  }

  public changeRegisterState() {
    const { mail, mobile, isMailTrue, isPhoneTrue } = this.props;
    const { isRegisterState } = this.state;
    if (isRegisterState) {
      return (
        <div className={styles.inputBox}>
          <div className={styles.inputTop}>
            <span className={styles.inputTopText}>输入邮箱</span>
          </div>
          <div className={styles.inputItem}>
            <input
              onChange={e => {
                this.mailChange(e);
              }}
              value={mail}
              className={styles.input}
              type="text"
              placeholder="请输入邮箱"
            />
            {isMailTrue ? <span className={styles.check} /> : null}
          </div>
        </div>
      );
    } else {
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
            {isPhoneTrue ? <span className={styles.check} /> : null}
          </div>
        </div>
      );
    }
  }

  public render() {
    const { dispatch } = this.props;
    const { isRegisterState } = this.state;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>{isRegisterState ? '您的邮箱？' : '您的手机号'}</div>
          {this.changeRegisterState()}
          <div className={styles.btnBox}>
            <span className={styles.btnComm} onClick={this.changeStateHandle}>
              {isRegisterState ? '使用手机号码' : '使用邮箱'}
            </span>
            <span className={styles.subBtn} onClick={this.sendSub} />
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isMailTrue: state.registerModel.isMailTrue,
    mail: state.registerModel.mail,
    isPhoneTrue: state.registerModel.isPhoneTrue,
    phone: state.registerModel.phone,
  };
}

export default connect(mapStateToProps)(RegisterPhone);
