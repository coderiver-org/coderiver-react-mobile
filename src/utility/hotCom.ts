import { hot } from 'react-hot-loader/root';

export function hotCom<T extends { new (...args: any[]): {} }>(constructor: T) {
  return hot(class extends constructor {});
}
