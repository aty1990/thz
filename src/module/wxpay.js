import api from '@/fetch/api.js'
const state = {
    uncheckedIcon : ["/thz/static/icon_morenduihao@2x.png","/thz/static/icon_sex2@2x.png"],
    selectedIdx : 0,
    goodsData : {}
}
const actions = {
    initData({ state, commit, rootState }){
        api.showOrder({goodId:sessionStorage.goodsId}).then((res)=>{
            if(res.code=="200"){
               commit("wxpay/showOrder",res.body,{root:true}); 
           }else{
                layer.open({
                     content: res.msg
                    ,skin: 'msg'
                    ,time: 3
                });
           }
        });  
    },
    playStyle({ state, commit, rootState },idx){
        commit("wxpay/playStyle",idx,{root:true});
    },
    commitData({ state, commit, rootState },_this){
        api.pay({orderId:state.goodsData.orderId,payType:"WXPAY"}).then((data)=>{ 
            if(data.code=="200"){
                wx.chooseWXPay({
                    timestamp: data.body.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                    nonceStr: data.body.nonceStr, // 支付签名随机串，不长于 32 位
                    package: data.body.prepay_id, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                    signType: data.body.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                    paySign: data.body.paySign, // 支付签名
                    success: function () {
                        // 支付成功后的回调函数
                        layer.open({
                             content: "支付成功"
                            ,skin: 'msg'
                            ,time: 2
                            ,end : function(){
                                sessionStorage.orderId = state.goodsData.orderId;
                                _this.$router.replace("/wxpay/success");
                            }                               
                        });
                    },
                    cancel: function () { 
                        // 取消支付后的回调函数  
                         api.payCancle({payType:"WXPAY",orderId:state.goodsData.orderId}).then((result)=>{
                            if(result.code=="200"){
                                sessionStorage.orderId = state.goodsData.orderId;
                                _this.$router.replace("/wxpay/error");
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
const getters = {

}
const mutations = {
    showOrder(state,result){
        state.goodsData = result;
    },
    playStyle(state,result){
        state.selectedIdx = result;
    }
}
export default {
    state,
    actions,
    getters,
    mutations,
    namespaced : true
}