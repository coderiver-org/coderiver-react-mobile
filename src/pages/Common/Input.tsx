import * as React from 'react';
import { Icon } from 'antd-mobile';
import styles from './index.module.less';

interface IInputProps {
  type?: 'text' | 'password';
  onchange?: (e) => void;
  rule: RegExp | RegExp[];
}

export const Input = (props: IInputProps) => {
  const [isOk, setOk] = React.useState(false);
  const [isShowInfo, setShowInfo] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regs = [];
    if (Array.isArray(props.rule)) regs.push(...props.rule);
    else regs.push(props.rule);
    setOk(regs.some(r => r.test(e.target.value)));
  };

  return (
    <div className={styles.commonInput}>
      <input
        type={props.type}
        onChange={handleChange}
        onFocus={() => setShowInfo(true)}
        onBlur={() => setShowInfo(false)}
      />
      {isShowInfo && (
        <>
          {isOk ? (
            <span>
              <Icon type="check" />
            </span>
          ) : (
            <div className="am-input-error-extra" />
          )}
        </>
      )}
    </div>
  );
};
