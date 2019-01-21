import React, { Component } from 'react';
import { connect } from 'dva';
import { PickerView } from 'antd-mobile';
import styles from './index.module.less';
import './index.css';
import Goback from '@components/Goback';

interface INickNameProps {
  dispatch: (object: Object) => Object;
  history: any;
  role: any;
  roleData: [];
}

const initialState = { isShowPick: false };
type State = Readonly<typeof initialState>;
class RegisterRole extends Component<INickNameProps, State> {
  readonly state: State = initialState;
  public constructor(props) {
    super(props);
  }
  public sendSub = () => {
    // const { dispatch, nickname, isNickTrue } = this.props;
    // if (nickname === '' || isNickTrue === false) return;
    // dispatch({
    //   type: 'registerModel/subNickName',
    //   payload: { nickName: nickname },
    // });
  };

  public roleChangeItem = value => {
    console.log(value);
    // dispatch({
    //   type: 'registerModel/subNickName',
    //   payload: { nickName: nickname },
    // });
  };
  public roleChangeHandle = () => {
    this.setState((prevState: State) => ({
      isShowPick: !prevState.isShowPick,
    }));
  };

  public render() {
    const { dispatch, role, roleData } = this.props;
    const { isShowPick } = this.state;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>您的角色？</div>
          <p className={styles.tip}>Coderiver会基于您的角色向您推荐相关项目和团队</p>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>选择角色</span>
            </div>
            <div className={styles.inputItem} onClick={this.roleChangeHandle}>
              <div className={styles.roleText}>{role}</div>
              <span className={styles.check} />
            </div>
          </div>
          {isShowPick ? (
            <PickerView
              data={roleData}
              value={role}
              cascade={false}
              onChange={this.roleChangeItem}
            />
          ) : null}

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
    role: state.registerModel.role,
    roleData: state.registerModel.roleData,
  };
}

export default connect(mapStateToProps)(RegisterRole);
