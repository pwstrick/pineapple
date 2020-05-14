const errorModel = require("../db/error");
const monitorModel = require("../db/monitor");
const uaParser = require('ua-parser-js');
const baseController = require('base');

class indexController extends baseController {
    collect(ctx) {
        let { error, data } = ctx.query;
        //分析代理
        const agent = uaParser(ctx.request.headers['user-agent']),
            url = ctx.request.headers['referer'],      //来源地址
            ip = ctx.request.ip;
        const obj = {agent, url, ip};
        // console.log(agent)
        if(error) {     //处理错误
            error = Object.assign(JSON.parse(error), obj);
            errorModel.save(error);
            // errorModel.query().then(rows => {
            //     console.log(rows);
            // });
            return;
        }
        if(data) {      //处理性能
            data = Object.assign(JSON.parse(data), obj);
            monitorModel.save(data);
        }
    }
}

module.exports = indexController;