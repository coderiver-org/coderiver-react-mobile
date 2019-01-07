import React, { Component } from 'react';

import styles from './index.module.less';

export interface IAppProps {}

export default class Login extends Component<IAppProps, any> {
  public render() {
    return <div className={styles.loginWrapper}>login</div>;
  }
}
