const errorDB = require("../db/error");

class indexController {
    collect(ctx) {
        let {error, data} = ctx.query;
        if(error) {     //处理错误
            error = Object.assign(JSON.parse(error), {created: Date.now()});
            errorDB.save(error);
            errorDB.query().then(rows => {
                console.log(rows)
            });
        }
        if(data) {
            //处理性能
        }
    }
}

module.exports = indexController;