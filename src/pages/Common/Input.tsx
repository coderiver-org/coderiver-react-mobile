import * as React from 'react';
import { Icon } from 'antd-mobile';
import styles from './index.module.less';

export type InputType = 'text' | 'password' | 'phone' | 'file';
type RuleType = RegExp | boolean | (RegExp | boolean)[];
interface IInputProps {
  type?: InputType;
  onchange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rule: RuleType;
  isALlMatch?: boolean; // 是否需要完全匹配规则
  value?: string | number;
  refValue?: string; // 与value值比较是否相等
}

export const Input = (props: IInputProps) => {
  const [isOk, setOk] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const isOk = props.refValue ? val === props.refValue : true;
    const regs: (RegExp | boolean)[] = [];
    //校验规则
    if (Array.isArray(props.rule)) regs.push(...props.rule);
    else regs.push(props.rule);
    if (props.isALlMatch)
      setOk(isOk && regs.every(r => (typeof r === 'boolean' ? r : r.test(e.target.value))));
    else setOk(isOk && regs.some(r => (typeof r === 'boolean' ? r : r.test(e.target.value))));

    if (props.onchange) props.onchange(e);
  };

  return (
    <div className={styles.commonInput}>
      <input type={props.type} value={props.value} onChange={handleChange} />
      {isOk ? (
        <span>
          <Icon type="check" />
        </span>
      ) : (
        <div className="am-input-error-extra" />
      )}
    </div>
  );
};
