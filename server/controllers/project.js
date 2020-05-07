const projectModel = require("../db/project");
const baseController = require('./base');
const crypto = require("crypto");

class projectController extends baseController {
    async create(ctx) {
        let { name } = ctx.query;
        const token = crypto.createHash('md5').update(name).digest('hex');
        await projectModel.save({token, name}).then(row => {
            // console.log(row)
            ctx.body = this.setJson({data:row});
        }).catch(err => {
            // console.log(err)
            ctx.body = this.setJson({code:1, msg:err.errmsg});
        });
    }
    async all(ctx) {
        await projectModel.query().then(rows => {
            ctx.body = this.setJson({data: rows});
        })
    }
}

module.exports = projectController;