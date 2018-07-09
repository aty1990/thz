<template>
    <transition name="move">
    	<div class="page-animate page-refund">
            <v-header>
                <mt-header title="退款申请">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <section class="pd-all-10 flex">
                    <div class="img-wrap flex" style="width: 30%;">
                        <img v-bind:src="refund.goodsUrl">
                    </div>
                    <div class="flex grow vertical pdl-10 text-left">
                        <p class="text-deal font-size-12">{{refund.goodsName}}</p>
                        <div class="mgt-16 flex full-w">
                            <h3 class="grow text-left">￥{{refund.orderAmount}}</h3>
                        </div>
                    </div>
                </section>
                <ul>
                    <li class="flex li-item white-bg" v-model="paramsObj.item1Text">
                        <span class="grow pdl-10">退款类型：<span class="fr wordrefund mgr-28">{{refund.refundType=="1"?"仅退款":"退货退款"}}</span></span>
                    </li>
                    <li class="flex li-item white-bg" v-model="paramsObj.item1Text" @click="chooseState">
                        <span class="grow is-link">货物状态：
                            <span class="fr mgr-28" v-if="">{{state}}</span>
                        </span>
                    </li>
                    <li class="flex li-item white-bg">
                        <span class="grow mar">可退款金额：<span class="fr mgr-28">￥{{refund.refundAmount}}</span></span>
                    </li>
                    <li class="fl_r pd-all-12 pdr-28 gray-font">
                        需支付快递费￥{{refund.expressAmount}}
                    </li>
                </ul>
                <div class="flex text-left refund-desc li-item">
                    <span class="mgr-1 mgl-8">退款说明：</span>
                    <input type="text" class="grow refundcon mgt-3" placeholder="选填" v-model="refundDescription" maxlength="30" :disabled="disabled"/>
                </div>
                <div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btnState" @click="commit">提交申请</mt-button>
                </div>
                <div class="flex line-refund">申请退款前，请先与客服沟通确认退款事宜！</div>
                <router-view />
                <div class="mask" v-show="isGoodsState" @click="closeState"></div>
                <div class="fixed-bottom-wrap" ref="isState"> 
                    <div>
                        <p class="flex pd-all-16">货物状态</p>
                        <p class="flex bottom-border-1 fixed-li" @click="playStyle(0)">
                            <span class="grow">未收到货</span>
                            <span><img :src="selectedIdx==0?uncheckedIcon[0]:uncheckedIcon[1]" class="scale-6"></span>
                        </p>
                        <p class="flex bottom-border-1 fixed-li"  @click="playStyle(1)">
                           <span class="grow">已收到货</span>
                           <span><img :src="selectedIdx==1?uncheckedIcon[0]:uncheckedIcon[1]" class="scale-6"></span>
                       </p>
                       <p class="flex pd-all-16">
                       <mt-button type="primary" size="large" @click="commitState">确定</mt-button>
                       </p>
                    </div>
                </div> 
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import Vue from 'vue'
    import api from '@/fetch/api.js'
    export default {
    	name: 'page-refund',
        components: { VHeader},
        data() {
			return {
                selectedIdx : 0,
				isGoodsState : false,
                btnState : false,
                saleFlag : false,
                disabled : false,
                refundDescription : "",
                uncheckedIcon : ["/thz/static/icon_morenduihao@2x.png","/thz/static/icon_sex2@2x.png"],
                refund:{},
				paramsObj : {
                    item1Text : "", 
                },
                state : "请选择"
			}
		},
		mounted() {  
            let _self = this;        
            this.initData();
            $.publish('app.removeItem');  
		},
		methods : {
			initData(){
				var _this = this;
				let orderId=this.$route.query.orderId;
				api.rendering({orderId:orderId}).then(res=>{
					if(res.code == 500){
            			layer.open({
		                    content: res.msg
		                    ,skin: 'msg'
		                    ,time: 2 
	                    });
            		}
            		if(res.code == 200){
		                _this.refund = res.body; 
		            }
				})
			},
            toBack(){
                this.$router.back();
            },
            playStyle(idx){
                this.selectedIdx = idx;
            },
            chooseState(){
                this.isGoodsState = true;
                setTimeout(()=>{
                     $(this.$refs.isState).toggleClass("bottom0");
                },100);
            },
            closeState(){
                this.isGoodsState = false;
                $(this.$refs.isState).toggleClass("bottom0");
            },
            commitState(){
                this.state = this.selectedIdx==0?"未收到货":"已收到货";
                this.closeState();
            },
            commit(){
            	let _self = this;	
                let orderId=this.$route.query.orderId; 
                let state = this.selectedIdx +1;
                if(this.state=="请选择"){
                    layer.open({
                        content: "请选择货物状态"
                        ,skin: 'msg'
                        ,time: 2                                
                    });
                    return;
                }
                this.btnState = true;

                let params = {
                    orderId : orderId,
                    refundType : _self.refund.refundType,
                    refundDescription : _self.refundDescription,
                    refundAmount : _self.refund.refundAmount,
                    goodsStatus : state,
                    refundAddress : _self.refund.deliveryAddress,
                    name : _self.refund.deliveryName,
                    mobile : _self.refund.deliveryMobile
                }
				api.refundapply(params).then(res=>{
                    $.publish('app.refreshOrderDetail');
                    $.publish('app.list');
					layer.open({
		                content: res.msg
		                ,skin: 'msg'
		                ,time: 2,
		                end:function(){
                            if(res.code=="200"){
                                _self.saleFlag = true;
                                _self.disabled = true;
                                $.publish('app.refreshOrderDetail');
			                    _self.$router.replace({					
    								path:location.href.indexOf("onlineorder")>0?"/onlineorder/refund/success":"/success",
    								query : {
    						            orderId  : orderId,
    						            refundId : res.body.refundId
    						        }							
    							});
                            }
		                }
		            });	
				})
            },
            updateData(){
                this.refund = {};
                this.initData();   
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/mixin';
    .page-refund{
        .img-wrap{
            width: px2rem(150);
            img{
                width: 100%;
            }
        }
        .white-bg{
            background: #fff;
            padding: px2rem(5) px2rem(10);
            font-size: px2rem(12);
            line-height: px2rem(22);
        }
        .full-w{
            width: 100%;
        }
        .float{
        	width: 70%;
        }
        .fr{
            float: right;
        }
        .mar{
        	margin-left: px2rem(10);
        }
        .refund-desc{
            padding: px2rem(8) px2rem(10);
            background: #fff;
            input{
                outline: none;
                border:none;
            }
            .mgt-3{
                margin-top: px2rem(3);
            }
        }
        .line-refund{
        	line-height: px2rem(40);
        	color: #888;
        }

        input:disabled, input[disabled]{ 
            color: #000; 
            -webkit-text-fill-color:#000; 
            -webkit-opacity:1; 
            opacity: 1; 
            background: #fff;
        }
        .fixed-bottom-wrap{
            transition: transform 0.2s ease;
            position: fixed;
            bottom: 0;
            left:0;
            width: 100%;
            background-color: #fff;
            z-index: 1000;
            transform:translateY(220px);
        }
        .bottom-border-1{
            border-bottom: px2rem(1) solid #F2F2F2;
        }
        .top-border-1{
            border-top: px2rem(1) solid #F2F2F2;
        }
        .fixed-li{
            height: px2rem(52);
            padding: 0 px2rem(10); 
        }
        .bottom0{
            transform:translateY(0);
        }
        .fl_r{
            text-align : right;
        }
        .li-item{
            padding: 14px 0;
            font-size:14px;
        }
    }
</style>