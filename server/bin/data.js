/**
* demo数据
*/
const errorModel = require("../db/error");
const monitorModel = require("../db/monitor");
const projectModel = require("../db/project");
const crypto = require("crypto");
const moment = require('moment');
// const uaParser = require('ua-parser-js');

function getRandom(base) {
    return Math.floor(Math.random() * base);
}

function setMonitor(token) {
    for(let i=0; i < 10; i++) {
        let created = moment().add(i * 30, 's').format('YYYY-MM-DD HH:mm:ss');
        const time = {
            firstPaintTime: getRandom(100),
            loadTime: getRandom(800),
            unloadEventTime: getRandom(10),
            loadEventTime: getRandom(10),
            domReadyTime: getRandom(200),
            firstScreen: getRandom(200),
            parseDomTime: getRandom(700),
            initDomTreeTime: getRandom(100),
            readyStart: getRandom(10),
            redirectTime: getRandom(10),
            appcacheTime: getRandom(10),
            lookupDomainTime: getRandom(10),
            connectSslTime: getRandom(10),
            connectTime: getRandom(10),
            requestTime: getRandom(50),
            requestDocumentTime: getRandom(50),
            responseDocumentTime: getRandom(10),
            TTFB: getRandom(50)
        };
        monitorModel.save({time, token, created});
    }
}

const name = "测试项目";
const token = crypto.createHash('md5').update(name).digest('hex');
projectModel.getRowByName(name).then(row => {
    if(row) {
        console.log("测试数据已存在");
        return;
    }
    projectModel.save({token, name}).then(row => {
        setMonitor(row.token);
    });
});

setTimeout(() => {
    console.log("数据初始化成功");
    process.exit();
}, 3000);
