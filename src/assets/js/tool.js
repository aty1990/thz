import Vue from 'vue'
/**
 * 银行卡号格式化
 * @param  {[type]} obj  [description]
 * @return {[type]}      [description]
 */
export function formatCardNo(obj) {
    return obj.value.length < 24 ? obj.value.replace(/[^\d]/g, '').replace(/(\d{4})(?=\d)/g, "$1 ") : "";
}

/**
 * 获取url参数
 * @return {[type]} [description]
 */
export function getUrlParams() {
    var name, value;
    var str = location.href; //取得整个地址栏
    var num = str.indexOf("?")
    str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]

    var result = {};
    var arr = str.split("&"); //各个参数放到数组里
    arr.forEach(function(element, index) {
        var el = element.split('=');
        result[el[0]] = el[1];
    });
    return result;
}


/**
 * 解决数字计算的精度丢失 加法  
 * @param  {[type]} arg1 [数字]
 * @param  {[type]} arg2 [数字]
 */
export function accAdd(arg1, arg2) {
    var r1, r2, m;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}

/**
 * 解决数字计算的精度丢失 减法 
 * @param  {[type]} arg1 [数字]
 * @param  {[type]} arg2 [数字]
 */
export function subtr(arg1, arg2) {
    var r1, r2, m, n;
    try {
        r1 = arg1.toString().split(".")[1].length
    } catch (e) {
        r1 = 0
    }
    try {
        r2 = arg2.toString().split(".")[1].length
    } catch (e) {
        r2 = 0
    }
    m = Math.pow(10, Math.max(r1, r2));
    n = (r1 >= r2) ? r1 : r2;
    return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
/**
 * 解决数字计算的精度丢失 乘法
 * @param  {[type]} arg1 [数字]
 * @param  {[type]} arg2 [数字]
 */
export function accMul(arg1, arg2) {
    var m = 0,
        s1 = arg1.toString(),
        s2 = arg2.toString();
    try {
        m += s1.split(".")[1].length
    } catch (e) {}
    try {
        m += s2.split(".")[1].length
    } catch (e) {}
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
/**
 * 解决数字计算的精度丢失 除法 
 * @param  {[type]} arg1 [数字]
 * @param  {[type]} arg2 [数字]
 */
export function accDiv(arg1, arg2) {
    var t1 = 0,
        t2 = 0,
        r1, r2;
    try {
        t1 = arg1.toString().split(".")[1].length
    } catch (e) {}
    try {
        t2 = arg2.toString().split(".")[1].length
    } catch (e) {}

    while (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return accMul((r1 / r2), pow(10, t2 - t1));
    }
}

/**
 * 微信js-sdk配置
 * @param  {[type]} options [js-sdk对象]
 */
export function wxConfig(options) {
    wx.config({
        debug: false,
        appId: options.appid,
        timestamp: options.timestamp,
        nonceStr: options.noncestr,
        signature: options.signature,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage', 'onMenuShareQQ', 'onMenuShareQZone']
    });

}
/**
 * 去分享
 * @param  {[type]} list [description]
 * @return {[type]}      [description]
 */
export function toShare(list) {
    wx.ready(function() {
        for (var i = 0; i < list.length; i++) {
            var shreaTitle = list[i].shreaTitle;
            var content = list[i].content;
            var shareLink = list[i].shareLink;
            var imgUrl = list[i].imgUrl;
            if (list[i].shareTerminal == "100097") {
                // 发送给朋友
                wx.onMenuShareAppMessage({
                    title: shreaTitle,
                    desc: content,
                    link: shareLink,
                    imgUrl: imgUrl,
                    type: '',
                    dataUrl: "",
                    success: function() {
                        console.log('分享成功');
                    },
                    cancel: function() {
                        console.log('已取消');
                    }

                });
            }
            if (list[i].shareTerminal == "100098") {
                // 分享朋友圈
                wx.onMenuShareTimeline({
                    title: shreaTitle,
                    link: shareLink,
                    imgUrl: imgUrl,
                    success: function() {
                        console.log('分享成功');
                    },
                    cancel: function() {
                        console.log('已取消');
                    }
                });
            }
            if (list[i].shareTerminal == "100099") {
                // 发送给qq好友
                wx.onMenuShareQQ({
                    title: shreaTitle,
                    desc: content,
                    link: shareLink,
                    imgUrl: imgUrl,
                    success: function() {
                        console.log('分享成功');
                    },
                    cancel: function() {
                        console.log('已取消');
                    }
                });

            }
        }
    });

    wx.error(function(res) {
        console.log(res);
    });
}

export function formatDate(date, fmt) {
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
    };
    for (let k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
            let str = o[k] + '';
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
        }
    }
    return fmt;
};

function padLeftZero(str) {
    return ('00' + str).substr(str.length);
}

export function initMap(options) {
    var lng, lat, 
        latitude = localStorage.getItem("latitude"),
        longitude = localStorage.getItem("longitude"),
        returnObj = {
            companyAddr: "",
            companyCity: "",
            companyCountry: "",
            companyProvince: "",
            formattedAddress: "",
            citycode: "",
            addrUp: ""
        };
    // ps latitude与longitude从缓存中取出来的是字符串类型不是undefined类型
    if (latitude=="undefined" || longitude=="undefined") {
        latitude = "31.230416";
        longitude = "121.473701";
    }
    // 安卓app里返回的是null 不是undefined
    if(!latitude || !longitude){
        latitude = "31.230416";
        longitude = "121.473701";
    }
    var map = new AMap.Map('container', {
        resizeEnable: true,
        zoom: 15,
        center: [longitude, latitude]
    });

    var marker = new AMap.Marker({
        map: map,
        bubble: true
    })
    var geocoder = new AMap.Geocoder({
        city: "010" //城市，默认：“全国”
    });

    var placeSearch = new AMap.PlaceSearch({
        map: map
    });
    //输入提示
	var autoOptions = {
		input: "tipinput"
	};
    var auto = new AMap.Autocomplete(autoOptions);
    AMap.event.addListener(auto, "select", select);
    function select(e) {
        placeSearch.setCity(e.poi.adcode);
		placeSearch.search(e.poi.name);
        $("#tipinput").val("");
		AMap.service('AMap.Geocoder', function() { //回调函数
			geocoder = new AMap.Geocoder({
				city: "021"
			});
			var marker = new AMap.Marker({
				map: map,
				bubble: true
			})
			if(e.poi.location == "") {
				placeSearch.search(e.poi.name, function(status, result) {
				    getAddress(result.poiList.pois[0].location, false);
				})
			}
		})
			
	}
    map.on('click', function(e) {
        getAddress(e.lnglat, true);
    });

    AMap.plugin('AMap.Autocomplete', function() { //回调函数
        var autoOptions = {
            city: "021", //城市，默认全国
            input: options.input //使用联想输入的input的id
        };
        var autocomplete = new AMap.Autocomplete(autoOptions);
        AMap.event.addListener(autocomplete, "select", function(data) {
            if (data.poi.location) {
            	console.log(data.poi.location)
                getAddress(data.poi.location, false);
                map.setCenter(data.poi.location);
            } else {
                placeSearch.setCity(data.poi.adcode);
                placeSearch.search(data.poi.name);
                returnObj.addrUp = data.poi.name;
                options.callback(returnObj);
            }

        });
    });

    function getAddress(lnglat, flag) {
        geocoder.getAddress(lnglat, function(status, result) {
            marker.setPosition(lnglat);
            if (status == 'complete' && result.info === 'OK') {
                var regeocode = result.regeocode;
                returnObj.companyProvince = regeocode.addressComponent.province; //省份
                returnObj.companyCountry = regeocode.addressComponent.district; //区
                if (!regeocode.addressComponent.city) {
                    returnObj.companyCity = regeocode.addressComponent.province;
                    returnObj.formattedAddress = regeocode.formattedAddress.substring((returnObj.companyProvince + returnObj.companyCountry).length);
                } else {
                    returnObj.companyCity = regeocode.addressComponent.city;
                    returnObj.formattedAddress = regeocode.formattedAddress.substring((returnObj.companyProvince + returnObj.companyCity + returnObj.companyCountry).length);
                }
                returnObj.citycode = regeocode.addressComponent.citycode + "-";
                if (!regeocode.addressComponent.street && !regeocode.addressComponent.streetNumber) {
                    returnObj.companyAddr = regeocode.addressComponent.township;
                } else {
                    returnObj.companyAddr = regeocode.addressComponent.street + regeocode.addressComponent.streetNumber;
                }
                localStorage.setItem("citycode", returnObj.citycode);
                localStorage.setItem("companyProvince", returnObj.companyProvince);
                localStorage.setItem("companyCity", returnObj.companyCity);
                localStorage.setItem("companyCountry", returnObj.companyCountry);
                localStorage.setItem("companyAddr", returnObj.companyAddr);
                returnObj.addrUp = returnObj.formattedAddress;
                $("#" + options.input).val(returnObj.formattedAddress);
                localStorage.setItem("detailAddr", returnObj.addrUp);
                options.callback(returnObj);
            }
        })
    }


}
/**
 * 获取cookie
 * @param  {[type]} c_name [description]
 * @return {[type]}        [description]
 */
export function getCookie(c_name) {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) c_end = document.cookie.length
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

/**
 * 删除cookie
 * @param  {[type]} c_name [description]
 * @return {[type]}        [description]
 */
export function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null)
    document.cookie= name + "="+cval+";expires="+exp.toGMTString();
}
/**
 * 验证手机号
 * @param  {[type]} phone [description]
 * @return {[type]}       [description]
 */
export function checkPhone(phone) {
    return /^1[34578]\d{9}$/.test(phone);
}
/**
 * 验证电话
 * @param  {[type]} tel [description]
 * @return {[type]}     [description]
 */
export function checkTel(tel) {
    return /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(tel);
}
/**
 * 验证身份证
 * @param  {[type]} cardno [description]
 * @return {[type]}     [description]
 */
export function checkIdCard(cardno) {
    return /^(\d{18,18}|\d{15,15}|\d{17,17}(x|X))$/.test(cardno);
}

export function checkPassword(password) {
    return /^.*(?=.{6,12})(?=.*\d)(?=.*[a-zA-Z!@#$%^&*?]).*$/.test(password);
}

// 验证必选字段{value:"",type:""} type : text为文本，tel为电话，phone为手机 idCard身份证 code验证码 password密码
export function listenField(arr) {
    var flag = true;
    for (var i in arr) {
        if (!arr[i].value) {
            flag = false;
            break;
        }
        if (arr[i].type == "phone") {
            flag = checkPhone(arr[i].value);
            if(!flag) break;
        }
        if (arr[i].type == "tel") {
            flag = checkTel(arr[i].value)
            if(!flag) break;
        }
        if (arr[i].type == "idCard") {
            flag = checkIdCard(arr[i].value)
            if(!flag) break;
        }
        if (arr[i].type == "code") {
            if(arr[i].value.length<6){
                flag = false;
                break;
            }
        }
        if (arr[i].type == "password") {
            flag = checkPassword(arr[i].value);
            if(!flag) break;
        }
    }
    return !flag;
}

export function iosOrAndroid(method, options,isShow) {
    var flag = false;
    function setupWebViewJavascriptBridge(callback) {
        if(window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
        if(window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
        window.WVJBCallbacks = [callback];
        var WVJBIframe = document.createElement('iframe');
        WVJBIframe.style.display = 'none';
        WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
        document.documentElement.appendChild(WVJBIframe);
        setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
    setupWebViewJavascriptBridge(function(bridge) {
        bridge.callHandler(method,options,function(res) {
                flag = true;
            }
        );
    })
}
/**
 * 实现观察者模式
 * @return {[type]} [description]
 */
export function observer(){
    (function($) {
        var o = $({});//自定义事件对象
        $.each({
            trigger: 'publish',
            on: 'subscribe',
            off: 'unsubscribe'
        }, function(key, val) {
            jQuery[val] = function() {
                o[key].apply(o, arguments);
            };
        });
    })(jQuery);
}


