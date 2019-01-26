import * as React from 'react';

interface IRegisterItem {
  title: string;
  className?: string;
}

export class SignItem extends React.Component<IRegisterItem, {}> {
  render() {
    const { title } = this.props;
    return (
      <>
        <h1 className={this.props.className}>{title}</h1>
        {this.props.children}
      </>
    );
  }
}
