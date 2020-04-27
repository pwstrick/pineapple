(function(window) {
	'use strict';
	
	/**
	 * https://developer.mozilla.org/zh-CN/docs/Web/API/Window/performance
	 */
	var performance = window.performance || window.webkitPerformance || window.msPerformance || window.mozPerformance || {};
	performance.now = (function() {
        return performance.now    ||
        performance.webkitNow     ||
        performance.msNow         ||
        performance.oNow          ||
        performance.mozNow        ||
        function() { return new Date().getTime(); };
    })();
    
	/**
	 * 默认属性
	 */
	var defaults = {
		performance: performance,   // performance对象
		ajaxs: [],                  //ajax监控
		//可自定义的参数
		param: {
			rate: 0.5,              //随机采样率
			src: 'http://10.10.28.139:3000/pa.gif'                 //请求发送数据
		}
	};
	
	if(window.pineapple.param) {
		for(var key in window.pineapple.param) {
			defaults.param[key] = window.pineapple.param[key];
		}
	}
	var pineapple = defaults;
	var firstScreenHeight = window.innerHeight;         //第一屏高度
	var doc = window.document;
    
    // 定义的错误类型码
    var ERROR_RUNTIME = 1
    var ERROR_SCRIPT = 2
    var ERROR_STYLE = 3
    var ERROR_IMAGE = 4
    var ERROR_AUDIO = 5
    var ERROR_VIDEO = 6
    var ERROR_PROMISE = 7
    var LOAD_ERROR_TYPE = {
        SCRIPT: ERROR_SCRIPT,
        LINK: ERROR_STYLE,
        IMG: ERROR_IMAGE,
        AUDIO: ERROR_AUDIO,
        VIDEO: ERROR_VIDEO
    };
    /**
     * 上报错误
     * @param  {Object} errorLog    错误日志
     */
    function handleError (errorLog) {
        // console.log(errorLog);
        pineapple.sendError(errorLog);
    }
	/**
	 * 监控资源异常
     * https://github.com/BetterJS/badjs-report
	 */
    window.addEventListener("error", function(event) {
        var errorTarget = event.target
        // 过滤 target 为 window 的异常
        if (errorTarget !== window && errorTarget.nodeName && LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()]) {
            handleError(formatLoadError(errorTarget))
        } else {
            handleError(formatRuntimerError(event.message, event.filename, event.lineno, event.colno, event.error))
        }
    }, true);
    /**
	 * 监控未处理的Promise错误
     * 当 Promise 被 reject 且没有 reject 处理器时触发
	 */
    window.addEventListener("unhandledrejection", function(event) {
        // console.log('Unhandled Rejection at:', event.promise, 'reason:', event.reason);
        handleError({
            type: ERROR_PROMISE,
            desc: event.reason,
            stack: 'no stack'
        });
    }, true);
    /**
     * 生成 laod 错误日志
     * 需要加载资源的元素
     * @param  {Object} errorTarget
     */
    function formatLoadError (errorTarget) {
        return {
            type: LOAD_ERROR_TYPE[errorTarget.nodeName.toUpperCase()],
            desc: errorTarget.baseURI + '@' + (errorTarget.src || errorTarget.href),
            stack: 'no stack'
        };
    }
    /**
     * 生成 runtime 错误日志
     * @param {String}  message      错误信息
     * @param {String}  filename     出错文件的URL
     * @param {Long}    lineno       出错代码的行号
     * @param {Long}    colno        出错代码的列号
     * @param {Object}  error        错误信息Object
     * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Error
     */
    function formatRuntimerError (message, filename, lineno, colno, error) {
        return {
            type: ERROR_RUNTIME,
            desc: message + ' at ' + filename + ':' + lineno + ':' + colno,
            stack: error && error.stack ? error.stack.replace(/\n/gi, "") : 'no stack'      // IE <9, has no error stack
        };
    }
	
	/**
	 * ajax监控
	 * https://github.com/HubSpot/pace
	 */
	var _XMLHttpRequest = window.XMLHttpRequest;        //保存原生的XMLHttpRequest
	//覆盖XMLHttpRequest
	window.XMLHttpRequest = function(flags) {
	    var req;
	    req = new _XMLHttpRequest(flags);   //调用原生的XMLHttpRequest
	    monitorXHR(req);                    //埋入我们的“间谍”
	    return req;
	};
	var monitorXHR = function(req) {
		req.ajax = {};
		//var _change = req.onreadystatechange;
		req.addEventListener('readystatechange', function() {
			if(this.readyState == 4) {
				req.ajax.end = pineapple.now();     //埋点

				if ((req.status >= 200 && req.status < 300) || req.status == 304 ) {    //请求成功
					req.ajax.endBytes = _kb(req.responseText.length * 2);               //KB
					//console.log('响应数据：'+ req.ajax.endBytes);//响应数据大小
				}else {     //请求失败
					req.ajax.endBytes = 0;
				}
				req.ajax.interval = req.ajax.end - req.ajax.start;
				pineapple.ajaxs.push(req.ajax);
				//console.log('ajax响应时间：'+req.ajax.interval);
			}
		}, false);
		
		// “间谍”又对open方法埋入了间谍
		var _open = req.open;
		req.open = function(type, url, async) {
			req.ajax.type = type;       //埋点
			req.ajax.url = url;         //埋点
	    	return _open.apply(req, arguments);
		};
		
		var _send = req.send;
		req.send = function(data) {
			req.ajax.start = pineapple.now();   //埋点
			var bytes = 0;                      //发送数据大小
			if(data) {
				req.ajax.startBytes = _kb(JSON.stringify(data).length * 2 );
			}
	    	return _send.apply(req, arguments);
		};
	};
	
	/**
	 * 计算KB值
	 * http://stackoverflow.com/questions/1248302/javascript-object-size
	 */
	function _kb(bytes) {
		return (bytes / 1024).toFixed(2);       //四舍五入2位小数
	}
	
	/**
	 * 给所有在首屏的图片绑定load事件，计算载入时间
	 * TODO 忽略了异步加载
	 * CSS背景图 是显示的在param参数中设置backgroundImages图片路径数组加载
	 */
	var imgLoadTime = 0;
	function _setCurrent() {
		var current = Date.now();
	    current > imgLoadTime && (imgLoadTime = current);
	}
	doc.addEventListener('DOMContentLoaded', function() {
	    var imgs = doc.querySelectorAll('img');
	    imgs = [].slice.call(doc.querySelectorAll('img'));
	    if(imgs) {
	    	imgs.forEach(function(img) {
		    	if(img.getBoundingClientRect().top > firstScreenHeight) {
		    		return;
		    	}
	//	    	var image = new Image();
	//      	image.src = img.getAttribute('src');
		    	if(img.complete) {
		    		_setCurrent();
		    	}
		    	//绑定载入时间
		    	img.addEventListener('load', function() {
		    		_setCurrent();
		    	}, false);
		    });
	    }
	    
	    //在CSS中设置了BackgroundImage背景
	    if(pineapple.param.backgroundImages) {
	    	pineapple.param.backgroundImages.forEach(function(url) {
	    		var image = new Image();
	    		image.src = url;
	    		if(image.complete) {
		    		_setCurrent();
		    	}
	    		image.onload = function() {
	    			_setCurrent();
	    		};
	    	});
	    }
	}, false);
	
	window.addEventListener('load', function() {
		setTimeout(function() {
			var time = pineapple.getTimes();
            var data = { ajaxs:pineapple.ajaxs, dpi:pineapple.dpi(), time:time, network:pineapple.network() };
            console.log("data", data);
			pineapple.send(data);
		}, 500);
	});
	
	/**
	 * 打印特性 key:value格式
	 */
	pineapple.print = function(obj, left, right, filter) {
		var list = [], left = left || '', right = right || '';
		for(var key in obj) {
			if(filter) {
				if(filter(obj[key]))
					list.push(left + key + ':' + obj[key] + right);
			}else {
				list.push(left + key + ':' + obj[key] + right);
			}
		}
		return list;
	};
	
	/**
	 * 请求时间统计
	 * 需在window.onload中调用
	 * https://github.com/addyosmani/timing.js
	 */
	pineapple.getTimes = function() {
		var timing = performance.timing;
		if (timing === undefined) {
			return false;
		}
		var api = {};
		//存在timing对象
		if (timing) {
			// All times are relative times to the start time within the
			// 白屏时间，也就是开始解析DOM耗时
			var firstPaint = 0;

			// Chrome
			if (window.chrome && window.chrome.loadTimes) {
				// Convert to ms
				firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
				api.firstPaintTime = firstPaint - (window.chrome.loadTimes().startLoadTime * 1000);
			}
			// IE
			else if (typeof timing.msFirstPaint === 'number') {
				firstPaint = timing.msFirstPaint;
				api.firstPaintTime = firstPaint - timing.fetchStart;
			}
			else {
				api.firstPaintTime = currentTime - timing.fetchStart;
			}
			// Firefox
			// This will use the first times after MozAfterPaint fires
			//else if (window.performance.timing.fetchStart && typeof InstallTrigger !== 'undefined') {
			//    api.firstPaint = window.performance.timing.fetchStart;
			//    api.firstPaintTime = mozFirstPaintTime - window.performance.timing.fetchStart;
			//}

			/**
			 * http://javascript.ruanyifeng.com/bom/performance.html
			 * 加载总时间
			 * 这几乎代表了用户等待页面可用的时间
			 * loadEventEnd（加载结束）-navigationStart（导航开始）
			 */
			api.loadTime = timing.loadEventEnd - timing.navigationStart;
			
			/**
			 * Unload事件耗时
			 */
			api.unloadEventTime = timing.unloadEventEnd - timing.unloadEventStart;
			
			/**
			 * 执行 onload 回调函数的时间
			 * 是否太多不必要的操作都放到 onload 回调函数里执行了，考虑过延迟加载、按需加载的策略么？
			 */
			api.loadEventTime = timing.loadEventEnd - timing.loadEventStart;
			
			/**
			 * 用户可操作时间
			 */
			api.domReadyTime = timing.domContentLoadedEventEnd - timing.fetchStart;

			/**
			 * 首屏时间
			 * 用户在没有滚动时候看到的内容渲染完成并且可以交互的时间
			 * 记录载入时间最长的图片
			 */
			if(imgLoadTime == 0) {
				api.firstScreen = api.domReadyTime;
			}else {
				api.firstScreen = imgLoadTime - timing.fetchStart;
			}

			/**
			 * 解析 DOM 树结构的时间
			 * 期间要加载内嵌资源
			 * 反省下你的 DOM 树嵌套是不是太多了
			 */
			api.parseDomTime = timing.domComplete - timing.domInteractive;
			
			/**
			 * 请求完毕至DOM加载耗时
			 */
			api.initDomTreeTime = timing.domInteractive - timing.responseEnd;
			
			/**
			 * 准备新页面时间耗时
			 */
			api.readyStart = timing.fetchStart - timing.navigationStart;

			/**
			 * 重定向的时间
			 * 拒绝重定向！比如，http://example.com/ 就不该写成 http://example.com
			 */
			api.redirectTime = timing.redirectEnd - timing.redirectStart;

			/**
			 * DNS缓存耗时
			 */
			api.appcacheTime = timing.domainLookupStart - timing.fetchStart;

			/**
			 * DNS查询耗时
			 * DNS 预加载做了么？页面内是不是使用了太多不同的域名导致域名查询的时间太长？
			 * 可使用 HTML5 Prefetch 预查询 DNS ，见：[HTML5 prefetch](http://segmentfault.com/a/1190000000633364)
			 */
			api.lookupDomainTime = timing.domainLookupEnd - timing.domainLookupStart;

            /**
			 * SSL连接耗时
			 */
            api.connectSslTime = timing.connectEnd - timing.secureConnectionStart;
            
			/**
			 * TCP连接耗时
			 */
			api.connectTime = timing.connectEnd - timing.connectStart;

			/**
			 * 内容加载完成的时间
			 * 页面内容经过 gzip 压缩了么，静态资源 css/js 等压缩了么？
			 */
			api.requestTime = timing.responseEnd - timing.requestStart;
			
			/**
			 * 请求文档
			 * 开始请求文档到开始接收文档
			 */
			api.requestDocumentTime = timing.responseStart - timing.requestStart;
			
			/**
			 * 接收文档（内容传输耗时）
			 * 开始接收文档到文档接收完成
			 */
			api.responseDocumentTime = timing.responseEnd - timing.responseStart;

			/**
			 * 读取页面第一个字节的时间
			 * 这可以理解为用户拿到你的资源占用的时间，加异地机房了么，加CDN 处理了么？加带宽了么？加 CPU 运算速度了么？
			 * TTFB 即 Time To First Byte 的意思
			 * 维基百科：https://en.wikipedia.org/wiki/Time_To_First_Byte
			 */
			api.TTFB = timing.responseStart - timing.fetchStart;
		}

		return api;
	};
	
	/**
	 * 与performance中的不同，仅仅是做时间间隔记录
	 * https://github.com/nicjansma/usertiming.js
	 */
	var marks = {};
	pineapple.mark = function(markName) {
		var now = performance.now();
		marks[markName] = {
			startTime: Date.now(),
			start: now,
			duration: 0
		};
	};
	
	/**
	 * 计算两个时间段之间的时间间隔
	 */
	pineapple.measure = function(startName, endName) {
		var start = 0, end = 0;
		if(startName in marks) {
			start = marks[startName].start;
		}
		if(endName in marks) {
			end = marks[endName].start;
		}
		return {
			startTime: Date.now(),
			start: start,
			end: end,
			duration: (end - start)
		};
	};
	
	/**
	 * 标记时间
	 * Date.now() 会受系统程序执行阻塞的影响不同
	 * performance.now() 的时间是以恒定速率递增的，不受系统时间的影响（系统时间可被人为或软件调整）
	 */
	pineapple.now = function() {
		return performance.now();
	};
	
	/**
	 * 网络状态
	 * https://github.com/daniellmb/downlinkMax
	 * http://stackoverflow.com/questions/5529718/how-to-detect-internet-speed-in-javascript
	 */
	pineapple.network = function() {
		//2.2--4.3安卓机才可使用
        var connection = window.navigator.connection || window.navigator.mozConnection || window.navigator.webkitConnection,
            effectiveType = connection.effectiveType;
        if(effectiveType) {
            return {bandwidth: null, type: effectiveType.toUpperCase()};
        }
		var types = "Unknown Ethernet WIFI 2G 3G 4G".split(" ");
        var info = {bandwidth: null, type: null};
		if(connection && connection.type) {
			info.type = types[connection.type];
		}
		return info;
	};
	
	/**
	 * 分辨率
	 */
	pineapple.dpi = function() {
		return {width:window.screen.width, height:window.screen.height};
	};
	
	/**
	 * 组装变量
	 * https://github.com/appsignal/appsignal-frontend-monitoring
	 */
	function _paramify(obj) {
		return 'data=' + JSON.stringify(obj);
	}
	
	/**
	 * 推送统计信息
	 */
	pineapple.send = function(data) {
		var ts = new Date().getTime().toString();
		//采集率
		if(pineapple.param.rate > Math.random(0, 1)) {
			var img = new Image(0, 0);
    		img.src = pineapple.param.src +"?" + _paramify(data) + "&ts=" + ts;
		}
    };
    
    /**
	 * 推送错误信息
	 */
	pineapple.sendError = function(data) {
		var ts = new Date().getTime().toString();
		var img = new Image(0, 0);
    	img.src = pineapple.param.src +"?error=" + JSON.stringify(data) + "&ts=" + ts;
	};
	
	var currentTime = Date.now();       //这个脚本执行完后的时间 计算白屏时间
	window.pineapple = pineapple;
})(this);