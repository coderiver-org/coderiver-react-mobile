import * as React from 'react';

interface IAvater {
  url: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Avater = (props: IAvater) => {
  return (
    <div style={props.style} className={props.className}>
      <img src={props.url} alt="" />
    </div>
  );
};
