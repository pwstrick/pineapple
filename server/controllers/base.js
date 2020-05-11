const constants = require("../utils/constants");
const localUtils = require("../utils/utils");

class baseController {
    //响应的JSON数据格式
    setJson({code=0, msg="success", data=null} = {}) {
        return JSON.stringify({code, msg, data});
    }
    //处理代理信息
    handleAgent(agent) {
        const browser = agent.browser.name ? `${agent.browser.name} ${agent.browser.version}` : '';
        const engine = agent.engine.name ? `${agent.engine.name} ${agent.engine.version}` : '';
        const os = agent.os.name ? `${agent.os.name}${agent.os.version}` : '';
        const cpu = agent.cpu.architecture || '';
        return `${browser}--${engine}--${os}--${cpu}`;
    }
    //计算X和Y轴
    cacaulateXY(rows, type, field) {
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
}

module.exports = baseController;