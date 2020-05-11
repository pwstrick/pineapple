const { model,mongoose } = require('./libs/model');
const myModel = new model('monitor', {
    ajaxs: [
      new mongoose.Schema({
        end: Number,
        endBytes: Number,
        interval: Number,
        start: Number,
        startBytes: Number,
        type: {type: String},
        url: String
      })
    ],
    dpi: {
      width: Number,
      height: Number
    },
    network: {
      bandwidth: Number,
      type: {type: String},
    },
    time: {
      TTFB: Number,
      appcacheTime: Number,
      connectSslTime: Number,
      connectTime: Number,
      domReadyTime: Number,
      firstPaintTime: Number,
      firstScreen: Number,
      initDomTreeTime: Number,
      loadEventTime: Number,
      loadTime: Number,
      lookupDomainTime: Number,
      parseDomTime: Number,
      readyStart: Number,
      redirectTime: Number,
      requestDocumentTime: Number,
      requestTime: Number,
      responseDocumentTime: Number,
      unloadEventTime: Number
    },
    created: String,
    token: String,
    agent: {
      ua: String,
      browser: {
          name: String,
          version: String,
          major: String
      },
      engine: {
          name: String,
          version: String
      },
      os: {
          name: String,
          version: String
      },
      device: {
          vendor: { type: String, default: undefined },
          model: { type: String, default: undefined },
          type: { type: String, default: undefined }
      },
      cpu: {
          architecture: { type: String, default: undefined }
      }
    },
    url: String
});

const constants = require("../utils/constants");

class Mongodb {
  save (obj) {
    return myModel.save(obj);
  }
  queryTime (time, date, token, field) {
    const conditions = {
      token,
      created: { $gte: date[0], $lte: date[1] }
    };
    // const group = { month: { $month: "$created" } };
    // const group = { month: { $month: {$dateFromString:{dateString: "$created"}} } };
    // 聚合条件
    const format = {$dateFromString:{dateString: "$created"}};
    let group = { 
      year: { $year: format }, 
      month: { $month: format }, 
      day: { $dayOfMonth: format }
    };
    let hour = {
      hour: { $hour: format }
    };
    let minute = {
      minute: { $minute: format }
    }
    switch(time) {
      case constants.FILTER_TIME_DAY:
          break;
      case constants.FILTER_TIME_HOUR:
          group = Object.assign(group, hour);
          break;
      case constants.FILTER_TIME_MINUTE:
          group = Object.assign(group, hour, minute);
          break;
    }
    // const group = '$token';, day: { $dayOfMonth: "$created" }, year: { $year: "$created" }
    return myModel.avg(field, group, conditions, {_id: 1});
    // const fields = { [`time.${field}`]: 1, created: 1 };
    // return myModel.query(conditions, fields, {created: 1});
  }
  queryTimeList (date, token, number, offset) {
    const conditions = {
      token,
      created: { $gte: date[0], $lte: date[1] }
    };
    return myModel.query(conditions, {}, {created: 1}, number, offset);
  }
  queryTimeListCount (date, token) {
    const conditions = {
      token,
      created: { $gte: date[0], $lte: date[1] }
    };
    return myModel.count(conditions);
  }
}

module.exports = new Mongodb();
