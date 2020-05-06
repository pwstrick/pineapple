export const PERFORMANCE = {
    TTFB: 'TTFB',
    appcacheTime: 'DNS缓存耗时',
    connectSslTime: 'SSL连接耗时',
    connectTime: 'TCP连接耗时',
    domReadyTime: '用户可操作时间',
    firstPaintTime: '白屏时间',
    firstScreen: '首屏时间',
    initDomTreeTime: 'DOM加载耗时',
    loadEventTime: 'Onload事件耗时',
    loadTime: '加载总时间',
    lookupDomainTime: 'DNS查询耗时',
    parseDomTime: '解析DOM树时间',
    readyStart: '准备新页面耗时',
    redirectTime: '重定向时间',
    requestDocumentTime: '请求文档时间',
    requestTime: '内容加载完成时间',
    responseDocumentTime: '接收文档时间',
    unloadEventTime: 'Unload事件耗时',
};

export const ERROR_TYPE = {
    1: 'runtime',
    2: 'script',
    3: 'style',
    4: 'image',
    5: 'audio',
    6: 'video',
    7: 'promise',
};

export const FILTER_TIME = {
    1: '按分',
    2: '按时',
    3: '按日',
};
