## 信息搜集代码库
```
├── sdk --------------------------------- 信息搜集代码库
│   ├── test ---------------------------- 测试目录
│   ├── pineapple ----------------------- 参数搜集代码
```

## 参数说明
| 参数     | 描述   |
| -------- | ----  |
| rate | 随机采样率 |
| src | 数据要发送的地址，例如“本机IP:3000/pa.gif” |
| token | 唯一标识符，区分项目 |
| backgroundImages | CSS背景数组，用于计算最长图像载入时间 |

## 初始化
由于要计算白屏时间，dom时间等，所以位置不能随便放，得要放在head的最后面。
```html
<head>
  <script>
    window.pineapple || (pineapple = {});
    pineapple.param = {
      "token": "dsadasd2323dsad23dsada"
    };
  </script>
  <script src="js/pineapple.js"></script>
</head>
```

## 测试
执行命令，就能开始测试， 地址为“http://本机IP地址:4000/test/”。
```
npm start
```

## 性能指标说明
下图是[performance.timing](https://developer.mozilla.org/zh-CN/docs/Web/API/Performance/timing)监测到的特定于用户的计时器。
<p align="center">
    <img src="https://github.com/pwstrick/pineapple/blob/master/sdk/assets/img/performance.png"/>
</p>

| 指标     | 计算   |  描述  |
| -------- | ----  | ----  |
| firstPaint | 当前时间 - fetchStart | 白屏时间，也就是开始解析DOM耗时，用户在没有滚动时候看到的内容渲染完成并且可以交互的时间 |
| loadTime | loadEventEnd-navigationStart | 加载总时间，这几乎代表了用户等待页面可用的时间 |
| unloadEventTime | unloadEventEnd - unloadEventStart | Unload事件耗时 |
| loadEventTime | loadEventEnd - loadEventStart | 执行 onload 回调函数的时间 |
| domReadyTime | domContentLoadedEventEnd - fetchStart | 用户可操作时间 |
| firstScreen | domReadyTime或载入图像最长的耗时 | 首屏时间，用户在没有滚动时候看到的内容 |
| parseDomTime | domComplete - domInteractive | 解析DOM树结构的时间，期间要加载内嵌资源 |
| initDomTreeTime |  domInteractive - responseEnd |请求完毕至DOM加载耗时 |
| readyStart | fetchStart - navigationStart | 准备新页面时间耗时 |
| redirectTime | redirectEnd - redirectStart | 重定向的时间 |
| appcacheTime | domainLookupStart - fetchStart | DNS缓存耗时 |
| lookupDomainTime | domainLookupEnd - domainLookupStart | DNS查询耗时 |
| connectSslTime | connectEnd - secureConnectionStart | SSL连接耗时 |
| connectTime | connectEnd - connectStart | TCP连接耗时 |
| requestTime | responseEnd - requestStart | 内容加载完成的时间 |
| requestDocumentTime | responseStart - requestStart | 请求文档时间，开始请求文档到开始接收文档 |
| responseDocumentTime | responseEnd - responseStart | 接收文档时间，开始接收文档到文档接收完成 |
| TTFB | responseStart - fetchStart | （Time To First Byte），读取页面第一个字节的时间 |

## Ajax指标说明
| 指标     | 描述   |
| -------- | ----  |
| type | 请求方法，GET、POST等 |
| url | 请求地址 |
| start | 请求开始时的毫秒数 |
| end | 响应结束时的毫秒数 |
| startBytes | POST请求时的数据大小（KB） |
| endBytes | 响应数据的大小（KB） |
| interval | 通信时长 |


## 分辨率指标说明
| 指标     | 描述   |
| -------- | ----  |
| width | 屏幕宽度 |
| height | 屏幕高度 |

## 网络指标说明
网络指标中还应该包括带宽，本来是通过下载大文件计算得到，实用性太差，已废弃。

| 指标     | 描述   |
| -------- | ----  |
| type | 网络类型，WIFI、4G等 |
| bandwidth | 带宽，目前都为0 |

## 错误指标说明
| 指标     | 描述   |
| -------- | ----  |
| type | 错误类别，有7种 |
| desc | 错误描述 |
| [stack](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error/Stack) | 错误栈，一种函数追踪方式 |

