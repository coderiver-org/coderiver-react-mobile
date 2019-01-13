import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';

import styles from './index.module.less';

interface IGuideProps {}

class Guide extends Component<IGuideProps, any> {
  public render() {
    return (
      <div className={styles.loginWrapper}>
        <div className={styles.loginInner}>
          <div className={styles.loginBox}>
            <Link to="/login" className={styles.loginBtn}>
              登录
            </Link>
          </div>
          <h1 className={styles.logo} />
          <div className={styles.title}>欢迎来到CodeRiver</div>
          <div className={styles.gitHubBtn}>
            <span className={styles.gitHubText}>使用Github账号登录</span>
          </div>
          <Link to="/nickname" className={styles.gitHubBtn + ' ' + styles.createId}>
            创建账号
          </Link>
          <div className={styles.loginType}>更多登录方式</div>
          <div className={styles.loginTypeList}>
            <span className={styles.typeItem + ' ' + styles.sinaItem}>新浪微博</span>
            <span className={styles.typeItem + ' ' + styles.wechatItem}>微信</span>
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(Guide);
