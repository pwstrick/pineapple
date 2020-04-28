import React from 'react';
import ReactDOM from 'react-dom';
import Breadcrumb from './component/Breadcrumb/index';
import Footer from './component/Footer/index';
import Nav from './component/Nav/index';
import Sidebar from './component/Sidebar/index';
import App from './router/index';
import './index.scss';

function init() {
  ReactDOM.render(<Footer />, document.getElementById('footer'));
  ReactDOM.render(<Breadcrumb />, document.getElementById('breadcrumb'));
  ReactDOM.render(<Nav />, document.getElementById('user-nav'));
  ReactDOM.render(<Sidebar />, document.getElementById('sidebar'));
  ReactDOM.render(<App />, document.getElementById('root'));
}
init();
