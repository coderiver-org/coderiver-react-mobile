import React, { SFC } from 'react';
import styles from './index.module.less';

type Props = {
  dispatch: (object: Object) => any;
  history: any;
};

const goBack = history => {
  history.back();
};

const Goback: SFC<Props> = ({ dispatch, history }) => (
  <div className={styles.goBackWrapper}>
    <span onClick={() => goBack(history)} className={styles.arrowRight} />
  </div>
);

export default Goback;
