import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Goback from '@components/Goback';

interface INickNameProps {
  dispatch: (object: Object) => Object;
  history: any;
  nickname: string;
  isTrue: boolean;
}

class NickName extends Component<INickNameProps, any> {
  public constructor(props) {
    super(props);
  }
  public sendSub = () => {
    const { dispatch, nickname, isTrue } = this.props;
    if (nickname === '' || isTrue === false) return;
    dispatch({
      type: 'nickname/subNickName',
      payload: { nickName: nickname },
    });
  };

  public nickNameChange(e) {
    let value = e.target.value;
    this.props.dispatch({
      type: 'nickname/nicknameChange',
      payload: { name: value },
    });
  }
  public render() {
    const { dispatch, nickname, isTrue } = this.props;
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
              {isTrue ? <span className={styles.check} /> : null}
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
    nickname: state.nickname.name,
    isTrue: state.nickname.isTrue,
  };
}

export default connect(mapStateToProps)(NickName);
