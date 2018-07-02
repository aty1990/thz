import api from '@/fetch/api.js'
const state = {
    orderList : [],
    paymentList : [],
    unCollectList : [],  
    completeList : [],
    refundList: [],
    page : 1,
    size : 200
}
const actions = {
    initData({ state, commit, rootState },_self){
        // isLoan 1:分期订单 0：在线支付订单
        api.list({page:state.page,size:state.size,isLoan:"0"}).then((res)=>{
            if(res.code=="200"){
               commit("online/updateOrderList",res.body.data,{root:true});
            }else if(res.code=="111"){
                // 判断安卓和微信
                if(!sessionStorage.getItem("term")){
                    window.location.href='${project.domain}/index';
                }else{
                    _self.$router.push("/login")
                }
            }else{
                layer.open({
                    content: res.msg
                    ,skin: 'msg'
                    ,time: 2
                });
            }
        });  
    },
    confirm({ state, commit, rootState },{ orderId,_self }){
        layer.open({
            content: '请确认已收到货，确认后将不能对订单进行退货操作！'
            ,btn: ['确认', '取消']
            ,yes: function(index){
                api.confirmationreceipt({
                    orderId: orderId
                }).then(res => {
                    if(res.code == 500) {
                        layer.close(index); 
                        layer.open({
                            content: res.msg,
                            skin: 'msg',
                            time: 2
                        });
                    }
                    if(res.code == 200) {
                        layer.close(index); 
                        layer.open({
                            content: "收货成功"
                            ,skin: 'msg'
                            ,time: 2,
                            end : function(){
                                _self.initData();
                                _self.$router.push("/order/comfirmgoods");
                            } 
                        });
                    }
                }) 
            }
        });
    },
    pay({ state, commit, rootState },{ orderId,_self }){
        api.pay({orderId:orderId,payType:"WXPAY"}).then((data)=>{ 
            if(data.code=="200"){
                wx.chooseWXPay({
                    timestamp : data.body.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr : data.body.nonceStr, // 支付签名随机串，不长于 32 位
                    package : data.body.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType : data.body.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign : data.body.paySign, // 支付签名
                    success : function () {
                        // 支付成功后的回调函数
                        layer.open({
                             content: "支付成功"
                            ,skin: 'msg'
                            ,time: 2
                            ,end : function(){
                                _self.initData(_self);
                            }                               
                        });
                    },
                    cancel: function () {  
                        // 取消支付后的回调函数  
                        api.payCancle({payType:"WXPAY",orderId:orderId}).then((result)=>{
                            if(result.code=="200"){
                                layer.open({
                                    content: "支付取消"
                                    ,skin: 'msg'
                                    ,time: 2
                                    ,end : function(){
                                        _self.$router.replace("/wxpay/error");
                                    }
                                });
                            }else{
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                            }
                        })
                    }  
                });
            }else{
                layer.open({
                    content: data.msg
                    ,skin: 'msg'
                    ,time: 3
                });
            }
        }); 
    }
}
const getters = {}
const mutations = {
    updateOrderList(state,result){
        state.orderList = result;
        state.paymentList = result.filter(t => (t.orderPage=="0"))      //待付款
        state.unCollectList = result.filter(t => (t.orderPage=="D" || t.orderPage=="C"))    //待收货
        state.completeList = result.filter(t => (t.orderPage=="E"))     // 交易成功
        state.refundList = result.filter(t => (t.refundId!=""))      // 退款id不为空
    }
}
export default {
    state,
    actions,
    getters,
    mutations,
    namespaced : true
}