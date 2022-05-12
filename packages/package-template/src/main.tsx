import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';
import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom';

import { ErrorBoundary } from '@web/components';

import { RouterComponent } from './routes';

moment.locale('zh-cn');

const render = () => {
  const root = (
    <StrictMode>
      <ErrorBoundary>
        <ConfigProvider locale={zhCN}>
          <RouterComponent />
        </ConfigProvider>
      </ErrorBoundary>
    </StrictMode>
  );
  ReactDOM.render(root, document.getElementById('container'));
};

render();
