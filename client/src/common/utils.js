import querystring from 'querystring';
import host from './host.json';
// import { history } from '../router/index';

export default {
  // "test": "http://10.10.28.139:3000/#/exchange"
  // 判断当前环境
  getMode() {
    let env = 'test';
    if (host.h5.production === window.location.host) {
      env = 'production';
    }
    return env;
  },
  // 加载script标签
  loadScript(url) {
    return new Promise((resolve) => {
      const { body } = document;
      const script = document.createElement('script');
      script.src = url;
      body.appendChild(script);
      script.onload = () => {
        setTimeout(() => {
          resolve(script);
        }, 0);
      };
    });
  },
  // 获取URL参数值
  getParam(name) {
    let maps = {};
    const searchArr = [
      window.location.search,
      window.location.hash.split('?')[1] || '',
    ];
    searchArr.forEach((search) => {
      if (search.replace(/^\?*/, '')) {
        const param = querystring.parse(search.replace(/^\?*/, ''));
        maps = {
          ...maps,
          ...param,
        };
      }
    });
    return decodeURIComponent(maps[name] || '');
  },
  // getPathname() {
  //   return history.location.pathname;
  // },
  dateToTimestamp(date) {
    return +new Date(date);
  },
};
