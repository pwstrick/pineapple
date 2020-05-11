const monitorModel = require("../db/monitor");
const baseController = require('./base');

class monitorController extends baseController {
    async queryTime(ctx) {
        let { date, field, time, token } = ctx.query;
        date = date.split(",");
        time = +time;
        await monitorModel.queryTime({time, date, token, field}).then(rows => {
            // this.cacaulate(time, rows, field);
            // console.log(rows)
            ctx.body = this.setJson({data: this.cacaulateXY(rows, time, field)});
        });
    }
    async queryTimeList(ctx) {
        let { date, field, token, number, offset } = ctx.query;
        date = date.split(",");
        const count = await monitorModel.queryTimeListCount({date, token});
        number = +number;
        offset = +offset;
        await monitorModel.queryTimeList({date, token, number, offset}).then(rows => {
            // 过滤字段
            const list = rows.map(row => {
                // let testAjaxs = [].concat(row.ajaxs, [{
                //     _id: '5eb660ff2b5abab82c925db2'+Math.random(),
                //     type:"POST",
                //     url:"http://127.0.0.1:3001",
                //     start: 82,
                //     startBytes: 0.02,
                //     end: 169,
                //     endBytes:0,
                //     interval:86
                // }]);
                return {
                    field: row.time[field],
                    ajax: this.handleAjax(row.ajaxs),
                    ajaxs: row.ajaxs,
                    dpi: (row.dpi.width ? `${row.dpi.width} X ${row.dpi.height}` : ''),
                    network: row.network.type,
                    agent: this.handleAgent(row.agent),
                    created: row.created,
                    key: row._id
                };
            });
            ctx.body = this.setJson({data: {list, count} });
        });
        // console.log(list)
    }
    handleAjax(ajaxs) {
        return ajaxs.map(value => {
            return `${value.type}--${value.interval}ms`
        });
    }
    
}

module.exports = monitorController;