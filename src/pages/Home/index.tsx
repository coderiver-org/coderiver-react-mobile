import React, { Component } from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './index.module.less';
import face from '@assets/images/face.png';

interface IHomeProps {}

class Home extends Component<IHomeProps, any> {
  public render() {
    return (
      <div className={styles.homeWrapper}>
        <div className={styles.welcomeTip}>Hi,Nicoooole</div>
        <div className={styles.faceBox}>
          <div className={styles.recommentText}>为您推荐</div>
          <Link to="/" className={styles.faceImgBox}>
            <img className={styles.face} src={face} alt="" />
          </Link>
        </div>
      </div>
    );
  }
}
export default connect()(Home);
