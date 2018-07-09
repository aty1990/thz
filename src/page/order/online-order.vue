<template>
    <transition name="move">
    	<div class="page-animate page-online-order">
            <v-header>
                <mt-header title="在线支付订单">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <mt-navbar class="page-part" v-model="selected">  
                  <mt-tab-item id="1">全部</mt-tab-item>  
                  <mt-tab-item id="2">待付款</mt-tab-item>  
                  <mt-tab-item id="3">待收货</mt-tab-item>  
                  <mt-tab-item id="4">已完成</mt-tab-item>  
                  <mt-tab-item id="5">退款/售后</mt-tab-item>  
                </mt-navbar> 
                <mt-tab-container v-model="selected">  
                  <mt-tab-container-item id="1">  
                   	<div class="card mgb-10" v-for="(item,index) in orderList">
	                    <p class="card-title flex">
	                        <span class="grow">下单时间：{{item.orderTime}}</span>
	                        <span class="theme-font-color">{{item.orderStatus=="待付款"?"等待买家付款":item.orderStatus}}</span>
	                    </p>
	                    <div class="right-content all-top gray-bg flex" @click="lookdetail(item.orderId,item.goodsId)">
	                    	<div class="mgl-6">
	                    		<img v-bind:src="item.goodsUrl" height="60" width="60">
	                    	</div>
	                        <div class="wrap grow">
	                            <h5 class="text-deal">{{item.goodsName}}</h5>
	                        </div>
	                    </div>
	                    <p class="card-footer flex">
	                        <span class="grow">实付款:￥{{item.orderAmount}}</span>
	                        <span class="link-btn-gray changemoney1" v-if="item.orderPage == 'D'" @click="logistics(item.expressId,item.expressCompany)">查看物流</span>
	                         <span class="link-btn-gray suremoney1"  v-if="item.orderPage == 'D'" @click="confirmationreceipt(item.orderId,item.taskId)">确认收货</span>
	                        <span class="link-btn-gray lookdetail" v-if="item.orderPage == 'C' || item.orderPage == 'B' || item.orderPage == 'E'|| item.orderPage == 'G'|| item.orderPage == 'H'" @click="lookdetail(item.orderId,item.goodsId)">查看详情</span>
	                        <span class="link-btn-gray theme-font-color theme-font-border" v-if="item.orderPage == '0'"  @click="topay(item.orderId,item.goodsId)">立即付款</span>
	                    </p>
	                </div>
	                <div class="flex vertical mgt-40" v-show="orderList.length==0">
		                <img src="/thz/static/pic_kong@2x.png" width="120" class="mgt-40">
		                <p class="mgt-20 gray-font">您还没有在线支付的订单记录~</p>
		            </div>
                  </mt-tab-container-item>  
                  <mt-tab-container-item id="2">  
                   	<div class="card mgb-10" v-for="(item,index) in paymentList">
	                   	<p class="card-title flex">
	                        <span class="grow">下单时间：{{item.orderTime}}</span>
	                        <span class="theme-font-color">{{item.orderStatus=="待付款"?"等待买家付款":item.orderStatus}}</span>
	                    </p>
	                    <div class="right-content all-top gray-bg flex" @click="lookdetail(item.orderId,item.goodsId)">
	                    	<div class="mgl-6">
	                    		<img v-bind:src="item.goodsUrl" height="60" width="60">
	                    	</div>
	                        <div class="wrap grow">
	                            <h5 class="text-deal">{{item.goodsName}}</h5>
	                        </div>
	                    </div>
	                    <p class="card-footer flex">
	                    	<span class="grow">实付款:￥{{item.orderAmount}}</span>
	                        <span class="link-btn-gray theme-font-color theme-font-border"  @click="topay(item.orderId,item.goodsId)">立即付款</span>
	                    </p>
                   	</div>
                   	<div class="flex vertical mgt-40" v-show="paymentList.length==0">
		                <img src="/thz/static/pic_kong@2x.png" width="120" class="mgt-40">
		                <p class="mgt-20 gray-font">您还没有待付款的订单记录~</p>
		            </div>
                  </mt-tab-container-item> 
                  <mt-tab-container-item id="3">  
                    <div class="card mgb-10" v-for="(item,index) in unCollectList">
	                    <p class="card-title flex">
	                        <span class="grow">下单时间：{{item.orderTime}}</span>
	                        <span class="theme-font-color">{{item.orderStatus=="待付款"?"等待买家付款":item.orderStatus}}</span>
	                    </p>
	                    <div class="right-content all-top gray-bg flex" @click="lookdetail(item.orderId,item.goodsId)">
	                    	<div class="mgl-6">
	                    		<img v-bind:src="item.goodsUrl" height="60" width="60">
	                    	</div>
	                        <div class="wrap grow">
	                            <h5 class="text-deal">{{item.goodsName}}</h5>
	                        </div>
	                    </div>
	                    <p class="card-footer  flex">
	                   		<span class="grow">实付款:￥{{item.orderAmount}}</span>
	                       	<span class="link-btn-gray suremoney1" @click="confirmationreceipt(item.orderId,item.taskId)" v-if="item.orderPage == 'D'">确认收货</span>
	                        <span class="link-btn-gray expresss1"  @click="logistics(item.expressId,item.expressCompany)" v-if="item.orderPage == 'D'">查看物流</span>
	                        <span class="link-btn-gray lookdetail" @click="lookdetail(item.orderId,item.goodsId)" v-if="item.orderPage == 'C'">查看详情</span>
	                    </p>
	                </div>
	                <div class="flex vertical mgt-40" v-show="unCollectList.length==0">
		                <img src="/thz/static/pic_kong@2x.png" width="120" class="mgt-40">
		                <p class="mgt-20 gray-font">您还没有待收货订单记录~</p>
		            </div>
                  </mt-tab-container-item> 
                  <mt-tab-container-item id="4">  
                   	<div class="card mgb-10" v-for="(item,index) in completeList">
	                   	<p class="card-title flex">
	                        <span class="grow">下单时间：{{item.orderTime}}</span>
	                        <span class="theme-font-color">{{item.orderStatus=="待付款"?"等待买家付款":item.orderStatus}}</span>
	                    </p>
	                    <div class="right-content all-top gray-bg flex" @click="lookdetail(item.orderId,item.goodsId)"> 
	                    	<div class="mgl-6">
	                    		<img v-bind:src="item.goodsUrl" height="60" width="60">
	                    	</div>
	                        <div class="wrap grow">
	                            <h5 class="text-deal">{{item.goodsName}}</h5>
	                        </div>
	                    </div>
	                    <p class="card-footer flex">
	                    	<span class="grow">实付款:￥{{item.orderAmount}}</span>
	                        <span class="link-btn-gray lookdetail" @click="lookdetail(item.orderId,item.goodsId)">查看详情</span>
	                    </p>
                   	</div>
                   	<div class="flex vertical mgt-40" v-show="completeList.length==0">
		                <img src="/thz/static/pic_kong@2x.png" width="120" class="mgt-40">
		                <p class="mgt-20 gray-font">您还没有已完成的订单记录~</p>
		            </div>
                  </mt-tab-container-item>  
                  <mt-tab-container-item id="5">  
                    <div class="card mgb-10" v-for="(item,index) in refundList">
	                   	<p class="card-title flex">
	                        <span class="grow">下单时间：{{item.orderTime}}</span>
	                        <span class="theme-font-color">{{item.orderStatus=="待付款"?"等待买家付款":item.orderStatus}}</span>
	                    </p>
	                    <div class="right-content all-top gray-bg flex" @click="lookdetail(item.orderId,item.goodsId)"> 
	                    	<div class="mgl-6">
	                    		<img v-bind:src="item.goodsUrl" height="60" width="60">
	                    	</div>
	                        <div class="wrap grow">
	                            <h5 class="text-deal">{{item.goodsName}}</h5>
	                        </div>
	                    </div>
	                    <p class="card-footer  flex">
	                    	<span class="grow">实付款:￥{{item.orderAmount}}</span>
	                        <span class="link-btn-gray lookdetail" @click="lookdetail(item.orderId,item.goodsId)">查看详情</span>
	                    </p>
                   	</div>
                   	<div class="flex vertical mgt-40" v-show="refundList.length==0">
		                <img src="/thz/static/pic_kong@2x.png" width="120" class="mgt-40">
		                <p class="mgt-20 gray-font">您还没有退款售后的订单记录~</p>
		            </div>
                  </mt-tab-container-item>   
                </mt-tab-container>  
            </div>
            <router-view/>

            <div class="wrap-hide-order" ref="hideOrder">
	        	<div class="mode-bottom" ref="popper">
	            	<p>物流公司:
	            		<span class="expressCompany">{{expressCompany}}</span>
	            		<span class="close-mode" @click="closemode"><img src="/thz/static/icon_delete@2x.png" width="22"/></span>
	            	</p>
	            	<p>物流单号:<span class="expressId" id="contents">{{expressId}}</span>
	                    <button class="onlineOrderList copy"  data-clipboard-target="#myOnlineOrderNum">复制</button>
	                </p>
	                <input type="text" id="myOnlineOrderNum" v-model="expressId" readonly>                
	            </div>
	            <div class="mode" v-show="showMask"></div>
	        </div>
        </div>
   </transition>  
</template>
<script>
	import VHeader from '@/components/header'
	import {mapState,mapActions} from 'vuex'
	import Clipboard from 'clipboard'
	export default {
		name: 'onlineOrder',
		components: {VHeader},
		data() {
			return {
				selected: '1',
				expressCompany : "",
				showMask : false,
				expressId : "",
			    page : 1,
			    size : 200
			}
		},
		computed : {
            ...mapState({
                orderList : (state) => state.online.orderList,
                paymentList : (state) => state.online.paymentList,
                unCollectList : (state) => state.online.unCollectList,
                completeList : (state) => state.online.completeList,
                refundList : (state) => state.online.refundList
            })
        },
		mounted() {
			this.init();
		},
		methods: {
			...mapActions({
                initData : "online/initData",
                confirm : "online/confirm",
                pay : "online/pay"
            }),
            init(){
            	this.initData(this); 
            },
			toBack() {
				this.$router.back(); 
			},
			topay(orderId,goodsId){
				sessionStorage.goodsId = goodsId;
				this.pay({orderId:orderId,"_self":this});
			},
			lookdetail(orderId,goodsId){
                sessionStorage.setItem("orderId",orderId);
            	sessionStorage.setItem("goodsId",goodsId);
            	sessionStorage.isLoan = 0;
            	sessionStorage.orderType = "onlineOrder";
            	this.$router.push("/onlineorder/order-detail");
            },
            confirmationreceipt(orderId) {
				this.confirm({orderId:orderId,_self:this});
			},
			logistics(eid,ename){ 
                this.expressCompany = ename;
                this.expressId = eid;
                this.showMask = true;
            	this.$refs.popper.style.bottom = 0;  
                let clipboard = new Clipboard('.onlineOrderList')  
                clipboard.on('success', e => {  
                    layer.open({
                        content: "复制物流单号成功"
                        ,skin: 'msg'
                        ,time: 2
                    });
                  // 释放内存  
                  clipboard.destroy()  
                })  
                clipboard.on('error', e => {  
                  // 不支持复制  
                  console.log('该浏览器不支持自动复制')  
                  // 释放内存  
                  clipboard.destroy()  
                })  
            },
            closemode(){            	 
            	this.$refs.popper.style.bottom = "-100px"; 
            	this.showMask = false;                      
            }
		}
	}
</script>
<style lang="scss" scope>
	.page-online-order{
		.mint-navbar{
			.mint-tab-item.is-selected{
				color: #000;
			}
		} 
		.mint-navbar{
			 .mint-tab-item{
			 	padding: 15px 0;
			 }
		}
		.mint-tab-container-wrap{
			position: fixed;
			top:84px;
			left:0;
			right:0;
			bottom:0;
			overflow-y: auto;
			z-index: 9;
		}
		.theme-font-border{
			border:1px solid #F45051;
		}
		.right-content{
			position: relative;
		}
		.backmoney{
            position: absolute;
            right: 10px;
            bottom: 3px;	
            color: #FF9000;
        }
        .text-right{
        	text-align: right;
        }
        
	}

</style>
