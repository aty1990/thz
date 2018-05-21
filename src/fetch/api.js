require("@/assets/js/loading")
import axios from 'axios'
import qs from 'qs'
import {getCookie,observer} from '@/assets/js/tool'
// 本地跨域配置
const baseUrl = process.env.NODE_ENV=="dev"?'/apis':"/"
//uat pro 配置
const loginTerm = "wx"
// 实现观察者模式
observer();
// 封装文件上传的头信息
const http = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {  
        'Content-Type': 'application/x-www-form-urlencoded',
        'loginTerm' : loginTerm
    },
    transformRequest: [function (data) {
        return qs.stringify(data)
    }],
    paramsSerializer: function (data) {
        return qs.stringify(data)
    }
});
//POST传参序列化
axios.defaults.baseURL = baseUrl;
axios.interceptors.request.use(function (config) {   
    config.headers.loginTerm = loginTerm;
    config.headers.quipNum = "000";
    config.headers.kaptcha = "";
    config.headers.long = "";
    config.headers.accessToken = getCookie("thz_H5");
    config.headers['Content-Type'] = "application/x-www-form-urlencoded;charset=utf-8";
    config.headers.lati = "";
    config.headers.rand =  Math.round(Math.random()*89999) + 10000;
    if(config.method  === 'post'){
        config.data = qs.stringify(config.data);
    }
    return config
}, function (err) {
    return Promise.reject(err);
});

// get
export function fetch(url, params) {
    $("body").Loading("show");
    return new Promise((resolve, reject) => {
        axios.get(url, params).then(response => {
            $("body").Loading("hide");
            resolve(response.data);
        }, err => {
            reject(err);
            $("body").Loading("hide");
        })
        .catch((error) => {
            reject(error)
            $("body").Loading("hide");
        })
    })
}

//post
export function postData(url, params) {
    if(url.indexOf("verUser")==-1 && url.indexOf("getmyinfo")==-1 && url.indexOf("newMsgs")==-1 && url.indexOf("canWithdraws")==-1 && url.indexOf("indexPage")==-1 && url.indexOf("paymentList")==-1){
         $("body").Loading("show");
    }
    return new Promise((resolve, reject) => {
        axios.post(url, params).then(response => {
            $("body").Loading("hide");
            resolve(response.data);
        }, err => {
            reject(err);
            $("body").Loading("hide");
        })
        .catch((error) => {
            $("body").Loading("hide");
            reject(error)
        })
    })
}
export default {
    /**
     * 是否可以转卖
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    canWithdraws(params){
        return postData('/thz/loans/canWithdraws', params)
    },

    /**
     * 生成合同
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    contracts(params){
        return postData('/thz/contracts/params', params)
    },

    /**
     * 获取用户信息
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    verUser(params){
        return postData('/thz/support/verUser', params)
    },
    /**
     * 首页 / 进度页
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    auditstat(params){
        return postData('/thz/user/auditstat', params)
    },
    /**
     * 首页 / 历史消息条数
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    countMsgNew(params){
        return postData('/thz/countMsgNew', params)
    },
    /**
     * 首页 / 历史消息总条数
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    newMsgs(params){
        return postData('/thz/newMsgs', params)
    },
    /**
     * 首页 / 历史消息
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    showMsgNew(params){
        return postData('/thz/showMsgNew', params)
    },
    /**
     * 首页 / 历史消息详情
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    H5toRtf(params){
        return postData('/thz/H5toRtf', params)
    },
    /**
     * 首页 / 读取历史消息
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    readMsgNew(params){
        return postData('/thz/readMsgNew', params)
    },
    /**
     * 首页 / 首页商品
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    indexPage(params){
        return postData('/thz/page/indexPage', params)
    },
    /**
     * 我的 /我的页面渲染
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    getmyinfo(params){
        return postData('/thz/user/getmyinfo', params)
    },
    /**
     * 我的 / 转卖订单
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    pawnList(params){
        return postData('/thz/order/pawnList', params)
    },

    /**
     * 首页 /  换钱订单列表
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    paymentList(params){
        return postData('/thz/order/paymentList', params)
    },
    /**
     * 我的 / 转卖订单详情
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    pawnOrderDetail(params){
        return postData('/thz/order/detail', params)
    },
    /**
     * 典当 / 申请典当
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    wxaskwithdraw(params){
        return postData('/thz/trans/wxaskwithdraw', params)
    },
     /**
     * 典当 / 典当前页面渲染
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    withdraws(params){
        return postData('/thz/loans/withdraws', params)
    },
     /**
     * 典当 / 典当中页面渲染
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    withdrawing(params){
        return postData('/thz/loans/withdrawing', params)
    },
    /**
     * 首页 / 首页商品详情
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    goodsDetail(params){
        return postData('/thz/page/goodsDetail', params)
    },
    /**
     * 首页 / 商品提交订单前展示页
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    showOrder(params){
        return postData('/thz/shop/showOrder', params)
    },
    /**
     * 我的 / 分期记录
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    loanrecord(params){
        return postData('/thz/trans/loanrecord', params)
    },
    /**
     * 我的 / 分期详情
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    loandetail(params){
        return postData('/thz/trans/loandetail', params)
    },
    /**
     * 我的 / 交易记录
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    records(params){
        return postData('/thz/trans/records', params)
    },
    /**
     * 我的 / 交易详情
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    detail(params){
        return postData('/thz/trans/detail', params)
    },

     /**
     * 我的 / 退款申请
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    refundapply(params){
        return postData('/thz/refund/apply', params)
    },
     /**
     * 我的 / 确认收货
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    confirmationreceipt(params){
        return postData('/thz/confirmation/receipt', params)
    },
     /**
     * 我的 / 取消订单
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    applyCancel(params){
        return postData('/thz/refund/applyCancel', params)
    },
    /**
     * 我的 / 获取默认地址
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    getdefaultaddress(params){
        return postData('/thz/user/getdefaultaddress', params)
    },
    /**
     * 我的 / 编辑地址渲染
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    getDeliveryAddressInfo(params){
        return postData('/thz/user/getDeliveryAddressInfo', params)
    },
     /**
     * 首页 / 展示物流信息（退款）
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    express(params){
        return postData('/thz/fill/express', params)
    },
    /**
     * 首页 / 提交物流信息（退款）
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    submitExpress(params){
        return postData('/thz/fill/submitExpress', params)
    },
	 /**
     * 登录
     * @param  {[type]} params [参数对象]
     */
    login(params) {
        // term 不为空则为安卓端访问
        return postData(params.term?'/thz/user/login':'/thz/signIn', params)
    },
    /**
     * 首页 / 我的收货地址
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    getDeliveryAddress(params){
        return postData('/thz/user/getDeliveryAddress', params)
    },
    /**
     * 首页 / 新增收货地址
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    addDeliveryAddress(params){
        return postData('/thz/user/addDeliveryAddress', params)
    },
    /**
     * 首页 / 设置默认地址
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    setdefaultaddress(params){
        return postData('/thz/user/setdefaultaddress', params)
    },
    /**
     * 首页 / 编辑地址
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    updateDeliveryAddress(params){
        return postData('/thz/user/updateDeliveryAddress', params)
    },
    /**
     * 首页 / 删除收货地址
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    deleteDeliveryAddress(params){
        return postData('/thz/user/deleteDeliveryAddress', params)
    },
     /**
     * 发送验证码
     * @param  {[type]} params [参数对象]
     */
    sendcode(params) {
        return postData('/thz/support/sendcode', params)
    },
     /**
     * 提前还款页面渲染
     * @param  {[type]} params [参数对象]
     */
    aheadrepaymentpre(params) {
        return postData('/thz/trans/aheadrepaymentpre', params)
    },
    /**
     * 提前还款提交
     * @param  {[type]} params [参数对象]
     */
    askaheadrepay(params) {
        return postData('/thz/trans/askaheadrepay', params)
    },
     /**
     * 当前还款页面渲染
     * @param  {[type]} params [参数对象]
     */
    repaymentpre(params){
        return postData('/thz/trans/repaymentpre', params)
    },
    /**
     * 当前还款提交
     * @param  {[type]} params [参数对象]
     */
    askrepay(params){
        return postData('/thz/trans/askrepay', params)
    },
     /**
     * 账号 / 手机号码验证
     * @param  {[type]} params [参数对象]
     */
    verifications(params){
        return postData('/thz/support/verifications', params)
    },
    /**
     * 账号 / 用户注册
     * @param  {[type]} params [参数对象]
     */
    register(params){
        return postData('/thz/user/register', params)
    },
    /**
     * 账号 / 重置密码
     * @param  {[type]} params [参数对象]
     */
    resetpwd(params){
        return postData('/thz/user/resetpwd', params)
    },
    
    /**
     * 账号 / 修改密码
     * @param  {[type]} params [参数对象]
     */
    modpwd(params){
        return postData('/thz/user/modpwd', params)
    },
    
    /**
     * 判断手机号是否注册
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    mobver(params){
        return postData('/thz/user/mobver', params)
    },
   
    /**
     * 提交身份证信息
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    submitidcard(params){
        return postData('/thz/credit/submitidcard', params)
    },

    
    /**
     * 提交个人信息
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    submitperson(params){
        return postData('/thz/credit/submitperson', params)
    },

    /**
     * 获取学历，教育信息
     * @param  type  100000:学历   100001:教育  100004:联系人
     * @return {[type]}        [description]
     */
    selectinfo(params){
        return postData('/thz/support/selectinfo', params)
    },
    /**
     * 获取个人信息详情
     * @param  userId
     * @return {[type]}        [description]
     */
    detailUserInfo(params){
        return postData('/thz/credit/detailUserInfo', params)
    },
    /**
     * 获取我的资料信息
     * @param  
     * @return {[type]}        [description]
     */
    userInfoList(params){
        return postData('/thz/user/userInfoList', params)
    },
    /**
     * 获取工作信息
     * @param  
     * @return {[type]}        [description]
     */
    detailCareer(params){
        return postData('/thz/credit/detailCareer', params)
    },
    /**
     * 提交工作信息
     * @param  
     * @return {[type]}        [description]
     */
    submitcareer(params){
        return postData('/thz/credit/submitcareer', params)
    },
    /**
     * 获取联系人信息
     * @param  userId
     * @return {[type]}        [description]
     */
    detailContact(params){
        return postData('/thz/credit/detailContact', params)
    },
    /**
     * 保存联系人信息
     * @param  
     * @return {[type]}        [description]
     */
    insertUserContactList(params){
        return postData('/thz/credit/insertUserContactList', params)
    },
    /**
     * 手机认证服务密码
     * @param  
     * @return {[type]}        [description]
     */
    servicePwd(params){
        return postData('/thz/tel/servicePwd/authentications', params)
    },
    /**
     * 手机认证短信验证
     * @param  
     * @return {[type]}        [description]
     */
    captcha(params){
        return postData('/thz/tel/captcha/authentications', params)
    },
    /**
     * 手机认证短信认证
     * @param  
     * @return {[type]}        [description]
     */
    queryPwd(params){
        return postData('/thz/tel/queryPwd/authentications', params)
    },
    /**
     * 手机认证服务密码修改
     * @param  
     * @return {[type]}        [description]
     */
    telpwds(params){
        return postData('/thz/tel/pwds', params)
    },
    /**
     * 手机认证服务密码获取验证码
     * @param  
     * @return {[type]}        [description]
     */
    telcaptchas(params){
        return postData('/thz/tel/captchas', params)
    },
    /**
     * 手机认证服务密码确认提交
     * @param  
     * @return {[type]}        [description]
     */
    telpwdscaptchas(params){
        return postData('/thz/tel/pwds/captchas', params)
    },
    
    /**
     * 首页 / 订单提交
     * @param  
     * @return {[type]}        [description]
     */
    submitapp(params){
        return postData('/thz/user/submitapp', params)
    },
    /**
     * 我的 / 购买订单
     * @param  
     * @return {[type]}        [description]
     */
    list(params){
        return postData('/thz/order/list', params)
    },
     /**
     * 我的 / 订单详情
     * @param  
     * @return {[type]}        [description]
     */
    orderdetail(params){
        return postData('/thz/order/detail', params)
    },
    /**
     * 我的 / 银行卡列表
     * @param  
     * @return {[type]}        [description]
     */
    bankInfoList(params){
        return postData('/thz/user/bankInfoList', params)
    },
    /**
     * 我的 资料/ 银行卡信息显示
     * @param  
     * @return {[type]}        [description]
     */
    bankSelecter1(params){
        return postData('/thz/bankSelecter', params)
    },
    /**
     * 添加银行卡
     * @param  {[type]} params [参数对象]
     */
    bindcard(params) {
        return postData('/thz/credit/bindbankpaid', params)
    },
    
    /**
     * 查看支持的银行
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    bankSelecter(params){
        return postData('/thz/credit/bankSelecter', params)
    },
     /**
     * 提交反欺诈1
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    antiFraud1(params){
        return postData('/thz/riskManagements/antiFraud1', params)
    },
    /**
     * 提交反欺诈2
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
    antiFraud2(params){
        return postData('/thz/riskManagements/antiFraud2', params)
    },
    /**
     * 安全退出
     */
    sigOut(params) {
        return postData('/thz/sigOut', params)
    },
    /**
     * 获取微信签名
     */
    getWxSign(params) {
        return postData('/thz/wx/getWxSign', params)
    },
    /**
     * 人脸识别提交
     */
    submitlivingwxsdk(params) {
        return postData('/thz/credit/submitlivingwxsdk', params)
    },
    /**
     * 检测活体状态
     */
    submitlivingstat(params){
        return postData('/thz/credit/submitlivingstat', params)
    },
    /**
     * 将axios文件上传的函数返回
     * @type {[type]}
     */
    http : http
}