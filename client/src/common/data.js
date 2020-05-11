import localUtils from './utils';
import hosts from './host.json';

// const cookie = require('cookie');
// import {cookie} from 'cookie'

const mode = localUtils.getMode();
// const cookies = cookie.parse(document.cookie);
// const cookieParam = {
//   ac_token: cookies.chelun_acToken,
//   os: cookies.chelun_osType,
//   appVersion: cookies.chelun_appVersion,
//   app: cookies.chelun_appName,
//   appChannel: cookies.chelun_appChannel,
//   model: cookies.chelun_device,
//   openUDID: cookies.chelun_uuid,
//   systemVersion: cookies.chelun_osVersion,
//   cUDID: cookies.chelun_cuuid,
//   _request_from: 'h5',
// };

export default {
  ajax(host, url, param = {}, opt = {}) {
    url = `//${ host }${url}`;
    param = { ...param };
    const seg = [];
    if (opt.method === 'POST') {
      const form = new FormData();
      Object.keys(param).forEach((key) => {
        form.append(key, param[key]);
      });
      opt.body = form;
    } else {
      Object.keys(param).forEach((key) => {
        seg.push(`${encodeURIComponent(key)}=${encodeURIComponent(param[key])}`);
      });
      if (seg.length > 0) {
        url += `?${seg.join('&')}`;
      }
    }

    return Promise.race([fetch(url, {
      method: opt.method,
      // credentials: 'include',
      ...opt,
    }).then((str) => str.json()), new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              code: -1,
              msg: '网络请求超时，请检查你的网络是否正常',
            });
          }, 50000);
        })]);
      },
  post(host, url, param = {}, opt = {}) {
    const method = { method: 'POST' };
    return this.ajax(host, url, param, Object.assign(opt, method));
  },
  get(host, url, param = {}, opt = {}) {
    const method = { method: 'GET' };
    return this.ajax(host, url, param, Object.assign(opt, method));
  },
  // 创建项目
  createProject(param) {
    return this.get(hosts.server[mode], '/project/create', param);
  },
  // 读取所有项目
  getAllProjects() {
    return this.get(hosts.server[mode], '/project/all');
  },
  // 查询性能指标
  queryTime(param) {
    return this.get(hosts.server[mode], '/monitor/queryTime', param);
  },
  // 查询性能指标列表
  queryTimeList(param) {
    return this.get(hosts.server[mode], '/monitor/queryTimeList', param);
  },
};
