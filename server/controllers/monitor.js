const monitorModel = require("../db/monitor");
const baseController = require('./base');
const constants = require("../utils/constants");
const localUtils = require("../utils/utils");

class monitorController extends baseController {
    async queryTime(ctx) {
        let { date, field, time, token } = ctx.query;
        date = date.split(",");
        time = +time;
        await monitorModel.queryTime(time, date, token, field).then(rows => {
            // this.cacaulate(time, rows, field);
            // console.log(rows)
            ctx.body = this.setJson({data: this.cacaulate(rows, time, field)});
        });
    }
    cacaulate(rows, type, field) {
        const x = [],
            y = [];
        rows.map( value => {
            const id = Object.values(value._id).map( digit => localUtils.formatTimeToString(digit)),
                date = id.slice(0, 3),
                time = id.slice(3);
            switch(type) {
                case constants.FILTER_TIME_MINUTE:
                    x.push(`${date.join("-")} ${time.join(":")}`);
                    break;
                case constants.FILTER_TIME_HOUR:
                    x.push(`${date.join("-")} ${time[0]}`);
                    break;
                case constants.FILTER_TIME_DAY:
                    x.push(`${date.join("-")}`);
                    break;   
            }
            y.push(value[field]);
        });
        return {x, y};
    }
    async queryTimeList(ctx) {
        let { date, field, token, number, offset } = ctx.query;
        date = date.split(",");
        const count = await monitorModel.queryTimeListCount(date, token);
        await monitorModel.queryTimeList(date, token, +number, +offset).then(rows => {
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
    handleAgent(agent) {
        const browser = agent.browser.name ? `${agent.browser.name} ${agent.browser.version}` : '';
        const engine = agent.engine.name ? `${agent.engine.name} ${agent.engine.version}` : '';
        const os = agent.os.name ? `${agent.os.name}${agent.os.version}` : '';
        const cpu = agent.cpu.architecture || '';
        return `${browser}--${engine}--${os}--${cpu}`;
    }
}

module.exports = monitorController;