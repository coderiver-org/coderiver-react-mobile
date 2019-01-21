import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Goback from '@components/Goback';

interface INickNameProps {
  dispatch: (object: Object) => Object;
  history: any;
  nickname: string;
  isNickTrue: boolean;
}

class NickName extends Component<INickNameProps, any> {
  public constructor(props) {
    super(props);
  }
  public sendSub = () => {
    const { dispatch, nickname, isNickTrue } = this.props;
    if (nickname === '' || isNickTrue === false) return;
    dispatch({
      type: 'registerModel/subNickName',
      payload: { nickName: nickname },
    });
  };

  public nickNameChange(e) {
    let value = e.target.value;
    this.props.dispatch({
      type: 'registerModel/nicknameChange',
      payload: { name: value },
    });
  }
  public render() {
    const { dispatch, nickname, isNickTrue } = this.props;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>您的昵称？</div>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>昵称</span>
            </div>
            <div className={styles.inputItem}>
              <input
                onChange={e => {
                  this.nickNameChange(e);
                }}
                value={nickname}
                className={styles.input}
                type="text"
                placeholder="请输入昵称"
              />
              {isNickTrue ? <span className={styles.check} /> : null}
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
    nickname: state.registerModel.name,
    isNickTrue: state.registerModel.isNickTrue,
  };
}

export default connect(mapStateToProps)(NickName);
