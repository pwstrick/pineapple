const errorModel = require("../db/error");
const monitorModel = require("../db/monitor");

class indexController {
    collect(ctx) {
        let { error, data } = ctx.query;
        if(error) {     //处理错误
            errorModel.save(JSON.parse(error));
            // errorModel.query().then(rows => {
            //     console.log(rows);
            // });
            return;
        }
        if(data) {      //处理性能
            monitorModel.save(JSON.parse(data));
        }
    }
}

module.exports = indexController;