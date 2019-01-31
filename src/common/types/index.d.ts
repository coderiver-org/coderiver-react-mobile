import { Model as DvaModel } from 'dva';

interface Action<P> {
  type: string;
  payload?: P;
}

interface Dispatch {
  <P>(action: Action<P>): void;
}

interface Reducer<S, P = Partial<S>> {
  (state: S, action: Action<P>): S;
}

interface Reducers<S> {
  [key: string]: Reducer<S>;
}

interface Model<S, R> extends DvaModel {
  state: S;

  reducers: Reducers<S>;
}
