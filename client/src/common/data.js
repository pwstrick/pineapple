import localUtils from './utils';
// import hosts from './host';

const cookie = require('cookie');
// import {cookie} from 'cookie'

// const mode = localUtils.getMode();
const cookies = cookie.parse(document.cookie);
const cookieParam = {
  ac_token: cookies.chelun_acToken,
  os: cookies.chelun_osType,
  appVersion: cookies.chelun_appVersion,
  app: cookies.chelun_appName,
  appChannel: cookies.chelun_appChannel,
  model: cookies.chelun_device,
  openUDID: cookies.chelun_uuid,
  systemVersion: cookies.chelun_osVersion,
  cUDID: cookies.chelun_cuuid,
  _request_from: 'h5',
};

export default {
  ajax(host, url, param = {}, opt = {}) {
    url = `//${ host }${url}`;
    param = { openid: localUtils.getOpenid(), ...cookieParam, ...param };
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
      method: 'GET',
      credentials: 'include',
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
  // 发送短信验证码
  // sendSms(param) {
  //   return this.ajax(hosts.finance[mode], '/MobilePoint/sendCode', param);
  // }
};
