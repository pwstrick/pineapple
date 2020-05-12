const { model } = require('./libs/model');
const constants = require("../utils/constants");
const myModel = new model('error', {
    type: Number,
    desc: String,
    stack: String,
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

class Mongodb {
    //保存
    save (obj) {
        return myModel.save(obj);
    }
    queryError ({time, date, token, type}) {
        const conditions = {
          token,
          created: { $gte: date[0], $lte: date[1] },
          type
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
        return myModel.sum({name: "sum", sum: 1}, group, conditions, {_id: 1});
        // const fields = { [`time.${field}`]: 1, created: 1 };
        // return myModel.query(conditions, fields, {created: 1});
      }
      queryErrorList ({date, token, type, number, offset}) {
        const conditions = {
          token,
          type,
          created: { $gte: date[0], $lte: date[1] }
        };
        return myModel.query(conditions, {}, {created: 1}, number, offset);
      }
      queryErrorListCount ({date, token, type}) {
        const conditions = {
          token,
          created: { $gte: date[0], $lte: date[1] },
          type
        };
        return myModel.count(conditions);
      }
      queryErrorBrowser({date, token, type}) {
        const conditions = {
          token,
          created: { $gte: date[0], $lte: date[1] },
          type
        };
        const group = '$agent.browser.name';
        return myModel.sum({name: "sum", sum: 1}, group, conditions);
      }
      queryErrorBrowserVersion({date, token, type, name}) {
        const conditions = {
          token,
          created: { $gte: date[0], $lte: date[1] },
          type,
          'agent.browser.name': name
        };
        return myModel.distinct('agent.browser.version', conditions);
      }
}
module.exports = new Mongodb();

