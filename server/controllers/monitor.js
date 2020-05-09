const monitorModel = require("../db/monitor");
const baseController = require('./base');
const constants = require("../utils/constants");

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
    formatTimeToString(digit) {
        if (digit < 10) 
            return '0' + digit;
        return digit;
    }
    cacaulate(rows, type, field) {
        // const computeds = rows.map( value => {
        //     const currentDate = new Date(value.created);
        //     return Object.assign(value.toJSON(), {
        //         year: currentDate.getFullYear(),
        //         month: currentDate.getMonth() + 1,
        //         day: currentDate.getDate(),
        //         hour: currentDate.getHours(),
        //         minute: currentDate.getMinutes()
        //     });
        // });
        const x = [],
            y = [];
        rows.map( value => {
            const id = Object.values(value._id).map( digit => this.formatTimeToString(digit)),
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
}

module.exports = monitorController;