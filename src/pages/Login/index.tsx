import React from 'react';
import style from './index.module.less';
import Icon from '@components/Icon';
import next from '@assets/images/login/next.png';
import { LOGIN_TYPE } from '@utils/constant';

const initialState = {
  loginMethod: LOGIN_TYPE.phone,
  showPassword: false,
};
type State = Readonly<typeof initialState>;

class Login extends React.Component<null, State> {
  readonly state: State = initialState;

  private togglePassword = () => {
    this.setState((prevState: State) => ({ showPassword: !prevState.showPassword }));
  };

  private toggleLoginMethod = () => {
    const { email, phone } = LOGIN_TYPE;
    this.setState((prevState: State) => ({
      loginMethod: prevState.loginMethod === email ? phone : email,
    }));
  };

  private passText = () => {
    const { showPassword } = this.state;
    return showPassword ? '隐藏' : '显示';
  };

  private passInputType = () => {
    const { showPassword } = this.state;
    return showPassword ? 'text' : 'password';
  };

  private showLoginMethodText = () => {
    const { loginMethod } = this.state;
    return loginMethod === LOGIN_TYPE.email ? '使用手机号' : '使用邮箱';
  };

  render() {
    const { loginMethod } = this.state;
    return (
      <div className={style.container}>
        <div className={style.back}>
          <Icon cla="back" style={style.backIcon} />
        </div>
        <h2 className={style.login}>登录</h2>
        {loginMethod === LOGIN_TYPE.email && (
          <div className={style.formItem}>
            <label className={style.label} htmlFor="email">
              邮箱
            </label>
            <div className={style.inputContainer}>
              <input className={style.input} type="email" name="email" />
            </div>
          </div>
        )}
        {loginMethod === LOGIN_TYPE.phone && (
          <div className={style.formItem}>
            <label className={style.label} htmlFor="phone">
              手机号码
            </label>
            <div className={style.inputContainer}>
              <input className={style.input} type="number" name="phone" />
            </div>
          </div>
        )}
        <div className={style.formItem}>
          <label className={style.label} htmlFor="password">
            <span>输入密码</span>
            <span onClick={this.togglePassword}>{this.passText()}</span>
          </label>
          <div className={style.inputContainer}>
            <input className={style.input} type={this.passInputType()} name="password" />
          </div>
        </div>
        <div className={style.cta}>
          <button onClick={this.toggleLoginMethod} className={style.btn}>
            {this.showLoginMethodText()}
          </button>
          <div className={style.nextStep}>
            <img src={next} />
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
