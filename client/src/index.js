import React from 'react';
import ReactDOM from 'react-dom';
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
import Footer from './component/Footer/index';
import Nav from './component/Nav/index';
import Breadcrumb from './component/Breadcrumb/index';
import Sidebar from './component/Sidebar/index';
import App from './router/index';
import 'antd/dist/antd.css';
import './index.scss';

// 渲染侧边栏和面包屑
function structure() {
  ReactDOM.render(<Breadcrumb />, document.getElementById('breadcrumb'));
  ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
}
function init() {
  ReactDOM.render(<Footer />, document.getElementById('footer'));
  ReactDOM.render(<Nav />, document.getElementById('user-nav'));
  ReactDOM.render(
    <ConfigProvider locale={zhCN}>
      <App callback={structure} />
    </ConfigProvider>, document.getElementById('root'),
  );
}
init();
