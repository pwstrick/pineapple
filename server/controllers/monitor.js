const monitorModel = require("../db/monitor");
const baseController = require('./base');
const crypto = require("crypto");

class monitorController extends baseController {
    async query(ctx) {
        let { date, field, time, token } = ctx.query;

        await projectModel.query().then(rows => {
            ctx.body = this.setJson({data: rows});
        })
    }
}

module.exports = monitorController;