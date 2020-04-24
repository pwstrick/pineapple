import React from 'react';
import ReactDOM from 'react-dom';
import App from './component/app/app';
import './index.scss';

function init() {
  ReactDOM.render(<App />, document.getElementById('root'));
}
init();
