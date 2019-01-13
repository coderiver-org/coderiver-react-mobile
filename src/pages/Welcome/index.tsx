import React from 'react';
import { Button } from 'antd-mobile';
import style from './index.module.less';
import Image from '@components/Image';
import logo from '@assets/images/welcome/logo.png';
import github from '@assets/images/welcome/github.png';
import wechat from '@assets/images/welcome/wechat.png';
import weibo from '@assets/images/welcome/weibo.png';

const Welcome = () => (
  <div className={style.container}>
    <div className={style.top}>登录</div>
    <div>
      <div className={style.logo}>
        <Image src={logo} />
      </div>
      <div className={style.welcomeWord}>欢迎来到CodeRiver</div>
      <Button className={style.loginBtn}>
        <div className={style.github}>
          <Image src={github} />
        </div>
        <span>使用Github账号登录</span>
      </Button>
      <Button className={style.loginBtn}>
        <div>创建账号</div>
      </Button>
      <div>
        <div className={style.moreWays}>更多登录方式</div>
        <div className={style.moreWaysIcon}>
          <div className={style.weiboContainer}>
            <Image className={style.weibo} src={weibo} />
            <span>新浪微博</span>
          </div>
          <div className={style.wechatContainer}>
            <Image className={style.wechat} src={wechat} />
            <span>微信</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Welcome;
