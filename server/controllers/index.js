const errorModel = require("../db/error");
const monitorModel = require("../db/monitor");
const uaParser = require('ua-parser-js');

class indexController {
    collect(ctx) {
        let { error, data } = ctx.query;
        //分析代理
        const agent = uaParser(ctx.request.headers['user-agent']),
            url = ctx.request.headers['referer'];       //来源地址
        // console.log(agent)
        if(error) {     //处理错误
            error = Object.assign(JSON.parse(error), {agent, url});
            errorModel.save(error);
            // errorModel.query().then(rows => {
            //     console.log(rows);
            // });
            return;
        }
        if(data) {      //处理性能
            data = Object.assign(JSON.parse(data), {agent, url});
            monitorModel.save(data);
        }
    }
}

module.exports = indexController;