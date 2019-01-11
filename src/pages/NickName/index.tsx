import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Goback from '@components/Goback';

interface INickNameProps {
  dispatch: (object: Object) => Object;
  history: any;
  nickname: any;
}

class NickName extends Component<INickNameProps, any> {
  public constructor(props) {
    super(props);
  }
  public sendSub() {
    console.log('ok');
  }
  public render() {
    const { dispatch, nickname } = this.props;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner}>
          <div className={styles.nickTip}>您的昵称？{nickname.isTrue}</div>
          <div className={styles.inputBox}>
            <div className={styles.inputTop}>
              <span className={styles.inputTopText}>昵称</span>
            </div>
            <div className={styles.inputItem}>
              <input className={styles.input} type="text" />{' '}
              {nickname.isTrue ? <span className={styles.check} /> : null}
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
    nickname: state.nickname,
  };
}

export default connect(mapStateToProps)(NickName);
