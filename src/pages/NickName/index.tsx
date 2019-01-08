import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import Goback from '@components/Goback';

interface INickNameProps {
  dispatch: (object: Object) => Object;
  history: any;
}

class NickName extends Component<INickNameProps, any> {
  public constructor(props) {
    super(props);
  }

  public render() {
    const { dispatch } = this.props;
    return (
      <div className={styles.nickNameWrapper}>
        <Goback history={history} dispatch={dispatch} />
        <div className={styles.nickNameInner} />
      </div>
    );
  }
}

export default connect()(NickName);
