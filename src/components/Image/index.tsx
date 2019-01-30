import React from 'react';
import style from './index.module.less';

type Props = {
  src: string;
  className?: string;
};

class Image extends React.Component<Props> {
  render() {
    const { src, className } = this.props;
    return <img className={style.image} src={src} {...this.props} />;
  }
}

export default Image;
