import { PickerComponent } from '@pages/Common';
import { Button, Icon } from 'antd-mobile';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';
import { Route, Switch } from 'dva/router';
import { History } from 'history';
import * as React from 'react';
import { arrayLast } from 'Util/utils';
import styles from './index.module.less';
import { ESignMethod } from 'Util/enum';
import { SignItem } from '@pages/Common/SignItem';
import { Input } from '@pages/Common/Input';
import { USER_NAME_REGEXP, PHONE_REGEXP, EMAIL_REGEXP } from 'Util/regExps';

export interface IRegisterProps {
  history: History;
}
interface IRegisterState {
  currentIndex: number;
  method: ESignMethod;
}

export class Register extends React.Component<IRegisterProps, IRegisterState> {
  private routeUrls = ['acount', 'pwd', 'role', 'exp'];
  constructor(props) {
    super(props);

    //当前进入的路由url
    let currentRoute = arrayLast(this.props.history.location.pathname.split('/'));
    let currentIndex = this.routeUrls.indexOf(currentRoute);

    this.state = {
      currentIndex: currentIndex + 1,
      method: ESignMethod.Email,
    };
  }
  private go = () => {
    let currentUrl: string;
    if (this.state.currentIndex === this.routeUrls.length) {
      currentUrl = '/login';
    } else {
      currentUrl = '/register/' + this.routeUrls[this.state.currentIndex];
      this.setState({ currentIndex: this.state.currentIndex + 1 });
    }
    this.props.history.push(currentUrl);
  };
  private goBack = () => {
    this.props.history.go(-1);
    this.setState({ currentIndex: this.state.currentIndex - 1 });
  };
  public render() {
    return (
      <div className={styles.register + ' bg'}>
        <div>
          <Icon type="left" size="lg" onClick={this.goBack} />
        </div>
        <Switch>
          <Route exact path="/register" component={InputName} />
          <Route exact path="/register/acount" component={InputAccount} />
          <Route exact path="/register/pwd" component={InputPassWord} />
          <Route exact path="/register/role" component={InputRole} />
          <Route exact path="/register/exp" component={InputExperience} />
        </Switch>
        <div>
          <Button className={styles.right} icon="right" onClick={this.go} />
        </div>
      </div>
    );
  }
}

const InputName = () => (
  <SignItem title="您的昵称?">
    <h6>昵称</h6>
    <Input rule={USER_NAME_REGEXP} />
  </SignItem>
);

const InputAccount = () => (
  <SignItem title="您的手机或邮箱">
    <h6>手机号码/邮箱</h6>
    <Input rule={[PHONE_REGEXP, EMAIL_REGEXP]} />
  </SignItem>
);

const InputPassWord = () => (
  <SignItem title="创建密码">
    <h6>密码</h6>
    <input type="password" />
    <h6>确认密码</h6>
    <input type="password" />
  </SignItem>
);

const InputRole = () => {
  const data: PickerData[] = [
    {
      label: '产品经理',
      value: 0,
    },
    {
      label: '前端工程师',
      value: 1,
    },
    {
      label: 'Java工程师',
      value: 2,
    },
    {
      label: '运营',
      value: 3,
    },
    {
      label: '设计师',
      value: 4,
    },
    {
      label: '移动开发',
      value: 5,
    },
  ];

  return <PickerComponent title="您的角色?" head="选择角色" data={data} />;
};

const InputExperience = () => {
  const data: PickerData[] = [
    {
      label: '无经验',
      value: 0,
    },
    {
      label: '0-3年',
      value: 1,
    },
    {
      label: '3-5年',
      value: 2,
    },
    {
      label: '5-10年',
      value: 3,
    },
    {
      label: '10年以上',
      value: 4,
    },
  ];
  return <PickerComponent title="您的工作经验?" head="工作经验" data={data} />;
};
