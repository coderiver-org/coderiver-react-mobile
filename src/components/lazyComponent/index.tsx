import * as React from 'react';
import { DvaInstance } from 'dva';

interface Props {
  component: () => Promise<any>;
  app?: DvaInstance;
  models?: () => Promise<any>[];
}

// 缓存以挂载的model的namespace
const cachedModels = [];

export default function lazyComponent({ component, app, models }: Props) {
  return class LazyComponent extends React.Component<{}, { AsyncComponent: any }> {
    state = {
      AsyncComponent: null,
    };

    public componentDidMount() {
      // 动态引入页面组件
      const importComponent = () => {
        component()
          .then(res => {
            const result = res.default || res;
            this.setState({
              AsyncComponent: result,
            });
          })
          .catch(e => {
            console.warn('lazyComponent failed', e);
          });
      };

      // 现将model挂载到app上
      if (app && models) {
        try {
          Promise.all(models()).then(modelArr => {
            modelArr.forEach(item => {
              const model = item.default || item;
              if (!cachedModels.some(cache => cache === model.namespace)) {
                app.model(model);
                cachedModels.push(model.namespace);
              }
              importComponent();
            });
          });
        } catch (e) {
          console.warn('lazyComponent failed', e);
        }
      } else {
        importComponent();
      }
    }

    // public async componentDidMount() {
    //   // 挂载model到app上
    //   if (app && models) {
    //     try {
    //       const modelArr = await Promise.all(models());
    //       modelArr.forEach(item => {
    //         const model = item.default || item;
    //         if (!cachedModels.some(cache => cache === model.namespace)) {
    //             app.model(model);
    //           cachedModels.push(model.namespace);
    //         }
    //       });
    //     } catch (e) {
    //       console.warn('lazyComponent failed', e);
    //     }
    //   }
    //   // 动态引入页面组件
    //   component().then(res => {
    //     this.setState({
    //       AsyncComponent: res.default || res,
    //     });
    //   }).catch(e => {
    //     console.warn('lazyComponent failed', e);
    //   });
    // }

    public render() {
      const { AsyncComponent } = this.state;
      if (AsyncComponent) {
        return <AsyncComponent {...this.props} />;
      }

      const styles = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
      };

      return (
        <div style={styles}>
          <span>加载中</span>
        </div>
      );
    }
  };
}
