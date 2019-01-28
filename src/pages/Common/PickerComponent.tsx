import { Picker } from 'antd-mobile';
import { PickerData } from 'antd-mobile/lib/picker/PropsType';
import * as React from 'react';
import { useState } from 'react';
import styles from '../Register/index.module.less';
import { SignItem } from './SignItem';

interface IPickerProps {
  data: PickerData[];
  title: string;
  head: string;
}

export const PickerComponent = (props: IPickerProps) => {
  const [val, setVal] = useState(props.data[0].label);

  return (
    <SignItem title={props.title} className={styles.roleTitle}>
      <h3 className={styles.info}>Coderiver会基于您的角色向您推荐相关项目和团队</h3>
      <h6>{props.head}</h6>
      <Picker data={props.data} cols={1} onOk={val => setVal(props.data[val].label as string)}>
        <span className="val">{val}</span>
      </Picker>
    </SignItem>
  );
};
