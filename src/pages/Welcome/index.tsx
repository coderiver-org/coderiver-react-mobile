import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import logo from '@assets/images/logoWelcome.png';

interface IWelcomeProps {
  dispatch: (object: Object) => Object;
  history: any;
}

class Welcome extends Component<IWelcomeProps, any> {
  public constructor(props) {
    super(props);
  }
  public componentDidMount() {
    const { history } = this.props;
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }
  public render() {
    return (
      <div className={styles.welcomeWrapper}>
        <img src={logo} className={styles.logo} alt="" />
        <div className={styles.copyRight}>CodrRiver©2018</div>
      </div>
    );
  }
}

export default connect()(Welcome);
