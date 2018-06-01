<template>
	<transition name="move">
		<div class="page-animate page-order-detail">
			<v-header>
				<mt-header title="订单详情">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper order-common-ui">
				<section class="order-state ordercenter  vertical">
					<h3>{{orderdetail.orderStatus}}</h3>
					<span class="mgt-10 hide1">您的分期申请正在审核中，请耐心等待</span>
					<span class="mgt-10 hide2">感谢您对淘花宅的支持，欢迎再次光临</span>
					<span class="mgt-10 hide3">还剩10天系统自动确认收货</span>
				</section>

				<div class="line-order white-bg" v-show="orderdetail.orderPage=='G' && orderdetail.refundId">
					<div class="wordd">退款总金额：</div>
					<div class="totalAmount1">￥{{orderdetail.totalAmount}}</div>
				</div>

				<section class="flex all-top alltop white-bg order-detail-top" v-if="orderdetail.deliveryMobile">
					<div class="address-label">配送地址：</div>
					<div class=" grow vertical text-left deliveryName">
						<p>{{orderdetail.deliveryName}} {{orderdetail.deliveryMobile}}</p>
						<p>{{orderdetail.deliveryAddress}}</p>
					</div>
				</section>
				<section class="flex pd-all-10">
					<div class="img-wrap">
						<img v-bind:src="orderdetail.goodsUrl">
					</div>
					<div class=" grow vertical pdl-10 text-left">
						<p class="text-deal font-size-12">{{orderdetail.goodsName}}</p>
						<div class="mgt-16 flex full-w">
							<h3 class="grow text-left">￥{{orderdetail.orderAmount}}</h3>
							<span id="tuikuang" v-if="(orderdetail.orderPage=='C' || orderdetail.orderPage=='D') && orderdetail.refundId==''" class="link-btn-gray fr refun font-size-12" @click="saleFlag && refundback(orderdetail,orderdetail.orderId)">退款</span>
							<span class="refundback">退款成功</span>
							<span class="refundback1" @click="refundback1(orderdetail.orderId,orderdetail.refundId,orderdetail.refundStatus)">{{orderdetail.refundStatus}}</span>
						</div>
					</div>
				</section>
				<template v-if="orderdetail.orderPage!='G'">
					<p class="item pdt-10 proamout"><span class="amout">商品总额：</span><span class="fr">￥{{orderdetail.orderAmount}}</span></p>
					<p class="item pdt-10 backAmount"><span class="amout">转卖金额：</span><span class="fr">￥{{orderdetail.backAmount}}</span></p>
					<p class="item pdt-10 cashTime1"><span class="amout">转卖时间：</span><span class="fr">{{orderdetail.cashTime}}</span></p>
					<p class="item pdt-10 cashCompany"><span class="amout">转卖公司：</span><span class="fr">{{orderdetail.cashCompany}}</span></p>
					<p class="item freightAmount"><span>运费：</span><span class="fr">￥{{orderdetail.freightAmount}}</span></p>
					<p class="item applyRefundTime"><span class="refundTime">申请时间：</span><span class="fr">{{orderdetail.applyRefundTime}}</span></p>
					<p class="item pdb-10 totalAmount">实付费：<span class="fr theme-font-color">￥{{orderdetail.totalAmount}}</span></p>
					<p class="item refundId"><span class="refundTime">退款编号：</span><span class="fr">{{orderdetail.refundId}}</span></p>
					<p class="item pdb-10 lookstaging more-icon" v-if="orderdetail.orderPage!='0' && orderdetail.orderPage!='B' &&  orderdetail.orderPage!='G'" @click="fqzd(orderdetail.taskId)" >查看分期账单</p>
				</template>
				<template v-if="orderdetail.orderPage=='G' && orderdetail.refundId">
					<p class="item pdt-10"><span>退款总额：</span><span class="fr">￥{{orderdetail.totalAmount}}</span></p>
					<p class="item pdt-10"><span>申请时间：</span><span class="fr">{{orderdetail.orderTime}}</span></p>
					<p class="item pdt-10"><span>退款编号：</span><span class="fr">{{orderdetail.refundId}}</span></p>
					<p class="item pdb-10 more-icon"  @click="fqzd(orderdetail.taskId)" >查看分期账单</p>
					<p></p>
				</template>
				<div class="order-wrap">
					<p class="item">订单号码：<span class="fr">{{orderdetail.orderId}}</span></p>
					<p class="item">订单时间：<span class="fr">{{orderdetail.orderTime}}</span></p>
				</div>
				<footer class="footer">
					<span class="link-btn-gray lookexpresss" v-if="orderdetail.orderPage=='A'" @click="progress(orderdetail.orderId)">查看进度</span>
					<span class="link-btn-gray changemoney" @click="sale(orderdetail.orderId)">卖了换钱</span>
					<span class="link-btn-gray expresss" v-if="orderdetail.orderPage!=0"  @click="logistics1()">查看物流</span>
					<span class="link-btn-gray suremoney"  @click="confirmationreceipt1(orderdetail.orderId,orderdetail.taskId)">确认收货</span>
					<span class="link-btn-gray kefu" @click="kefu">联系客服</span>
					<span class="link-btn-gray" v-if="orderdetail.orderPage==0" @click="gotoplay">去付款</span>
				</footer>
			</div>
			<div class="hide-order">
            	<div class="mode-bottom" >
	            	<p>物流公司:<span class="expressCompany">{{orderdetail.expressCompany}}</span><img src="/thz/static/icon_delete@2x.png" class="close-mode" @click="closemode"/></p>
	            	<p>物流单号:<span class="expressId">{{orderdetail.expressId}}</span>
	            		<button class="orderDetail copy"  data-clipboard-target="#mydetailNumber">复制</button>
	            	</p>
	            	<input type="text" id="mydetailNumber" v-model="orderdetail.expressId" readonly>                       
	            </div>
	            <div class="mode"></div>
            </div>
			<router-view />
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api'
	import { getCookie,iosOrAndroid } from '@/assets/js/tool'
	import Clipboard from 'clipboard'
	export default {
		name: 'page-order-detail',
		components: {
			VHeader
		},
		data() {
			return {
				saleFlag : true,
				orderdetail: {}
			}
		},
		mounted() {
			let _self = this;
			
			this.initData();
        	// 监听退款成功事件
            $.subscribe('app.refreshOrderDetail', function(e, results) {
            	_self.orderdetail = {};
                _self.initData();
            });
		},
		methods: {
			initData() {
				var _this = this;
				let orderId1 = sessionStorage.getItem("orderId")
				api.orderdetail({
					orderId: orderId1
				}).then(res => {
					if(res.code == 500) {
						layer.open({
							content: res.msg,
							skin: 'msg',
							time: 2
						});
					}
					if(res.code == 200) {
						_this.orderdetail = {};
						_this.orderdetail.deliveryAddress = res.body.deliveryAddress;
						_this.orderdetail.deliveryMobile = res.body.deliveryMobile;
						_this.orderdetail.deliveryName = res.body.deliveryName;
						_this.orderdetail.freightAmount = res.body.freightAmount;
						_this.orderdetail.goodsName = res.body.goodsName;
						_this.orderdetail.goodsUrl = res.body.goodsUrl;
						_this.orderdetail.orderAmount = res.body.orderAmount;
						_this.orderdetail.orderId = res.body.orderId;
						_this.orderdetail.orderStatus = res.body.orderStatus;
						_this.orderdetail.orderTime = res.body.orderTime;
						_this.orderdetail.totalAmount = res.body.totalAmount;
						_this.orderdetail.applyRefundTime = res.body.applyRefundTime;
						_this.orderdetail.refundId = res.body.refundId;
						_this.orderdetail.backAmount = res.body.backAmount;
						_this.orderdetail.cashTime = res.body.cashTime;
						_this.orderdetail.cashCompany = res.body.cashCompany;
						_this.orderdetail.expressCompany = res.body.expressCompany;
						_this.orderdetail.expressId = res.body.expressId;
						_this.orderdetail.refundStatus=res.body.refundStatus;
						_this.orderdetail.orderPage=res.body.orderPage;
						_this.orderdetail.taskId=res.body.taskId;
						var orderPage = res.body.orderPage;
						var refundStatus=res.body.refundStatus;
						
						//分期审核中
						if(orderPage == 'A') {
							$(".hide1").show();
							$(".refundback").hide();
							$(".lookstaging").hide();
							$(".expresss").hide();
						}
						//分期失败
						if(orderPage == 'B') {
							$(".hide2").show();
							$(".refun").hide();
							$(".footer").hide();
						}
						//已付款
						if(orderPage == 'C') {
							if(res.body.refundId != "") {
								$(".refundback1").show();
								$(".refun").hide();
							}
							$(".hide2").show();
							$(".changemoney").show();
							$(".lookexpresss").hide();
							$(".refundback").hide();
							$(".expresss").hide();
						}
						//已发货
						if(orderPage == 'D') {
							if(res.body.refundId != "") {
								$(".refundback1").show();
								$(".refun").hide();
							}
							$(".hide3").show();
							$(".cashTime1").hide();
							$(".lookexpresss").hide();
							$(".suremoney").show();
							
						}
						//交易成功
						if(orderPage == 'E') {
							$(".hide2").show();
							$(".refun").hide();
							$(".footer").hide();
						}
						//交易关闭
						if(orderPage == 'G') {
							if(_this.orderdetail.refundId){
								$(".refundback").show();
								$(".address-label").html("退回淘花宅分期:");
								$(".address-label").css("width", "150px");
								$(".deliveryName").html('￥'+res.body.totalAmount);
								$(".deliveryName").css("color", "#F45051");
								$(".deliveryName").css("text-align", "right");
							}else{
								$(".order-detail-top").hide();
							}
							$(".hide2").show();
							$(".expresss").hide();
							$(".kefu").show();
						}
						//已转卖
						if(orderPage == 'H') {
							$(".lookexpresss").hide();
							$(".expresss").hide();
							$(".hide2").show();
							$(".backAmount").show();
							$(".cashTime1").show();
							$(".cashCompany").show();
							$(".alltop").hide();
							$(".refun").hide();
							$(".kefu").show();
							$(".proamout").hide();
							$(".freightAmount").hide();
							$(".totalAmount").hide();
						}
					}
				})
			},
			toBack() {
				this.$router.push("/home/order")
			},
			refund() {
				this.$router.push({
					name: "refund"
				});
			},
			gotoplay(){
				sessionStorage.setItem("goodsId",this.orderdetail.goodsId);
                localStorage.setItem("goodsId",this.orderdetail.goodsId);
                this.$router.push({
                    name:"goods-detail",
                    query : {
                        goodsId : this.orderdetail.goodsId
                    }
                });
			},
			refundback(orderdetail, orderId) {
				let userId =  JSON.parse(localStorage.getItem("userInfo")).userId;
				api.canWithdraws({orderId:orderId,userId:userId}).then(res=>{
                    if(res.code=="200"){
                    	let orderStatus = res.body.orderStatus;
                        if((orderStatus == "C" || orderStatus == "D") && res.body.payStatus=="1"){
                            this.$router.push({
								path: "/refund",
								query: {
									orderdetail: orderdetail,
									orderId: orderId
								}
							});	
                        }else{
                        	layer.open({
                                content: "订单正在处理中..."
                                ,skin: 'msg'
                                ,time: 2 
                            });
                        }
                    }
                })
			},
			fqzd(taskId){
                sessionStorage.setItem("taskId",taskId);
                if(sessionStorage.getItem("taskId")){                	
                	this.$router.push("/home/fqzd");
                }
            },
			logistics1() {
				let _self = this;
				$(".page-order-detail .hide-order").show(); 
				let clipboard = new Clipboard('.orderDetail')  
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
			kefu(){
				if(browser.versions.ios){
					sessionStorage.setItem("selected","首页");
					if(sessionStorage.getItem("term")){
						iosOrAndroid("Open Page",{url:sessionStorage.getItem("kfLink")},false);
					}else{
						location.href = sessionStorage.getItem("kfLink");
					}
				}else{
					sessionStorage.setItem("from","orderdetail");
					this.$router.push({
	                    name :"orderkefu"
	                });
				}
			},
			refundback1(orderId, refundId,refundStatus) {
				sessionStorage.setItem("refundId",refundId);
				sessionStorage.setItem("orderId",orderId);
				var _this=this;								
				if(refundStatus=="退款审核中"){
					this.$router.push({
						path: "/success",
						query: {
							orderId: orderId,
							refundId: refundId
						}
					});			
				}else if(refundStatus=="请退货"){
					this.$router.push({
						path: "/home/logistics",
						query: {
							orderId: orderId,
							refundId: refundId
						}
					});			
				}				
			},
			sale(orderId){
				let userId =  JSON.parse(localStorage.getItem("userInfo")).userId;
                api.canWithdraws({orderId:orderId,userId:userId}).then(res=>{
                    if(res.code=="200"){
                        if(res.body.orderStatus=="C" && res.body.payStatus=="1"){
                            sessionStorage.setItem("pawnOrderId",orderId);
                			this.$router.push("/home/sale");
                        }else{
                            layer.open({
                                content: "订单正在处理中..."
                                ,skin: 'msg'
                                ,time: 2 
                            });
                        }
                    }else{
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2 
                        });
                    }
                })
			},
			confirmationreceipt1(orderId,taskId) {
				let _self = this;
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
                                    content: "确认收货成功"
                                    ,skin: 'msg'
                                    ,time: 2,
                                    end : function(){
                                    	sessionStorage.setItem("taskId",taskId);
                                    	$.publish('app.list');
										$.publish('app.refreshOrderDetail');
                                        _self.$router.push({
											path: "/home/receipt"
										});    
                                    } 
                                });
							}
						}) 
                    }
                });
			},
			updateData() {
				this.initData();
			},
			logistics() {
				this.$router.push({
					name: "logistics"
				});
			},
			toRouter(e) {
				this.$router.push(e.params);
			},
            progress(){
               this.$router.replace({name:"progress"}); 
            },
            closemode(){            	 
                $(".page-order-detail .hide-order").hide();                         
            }
		}
	}
</script>
<style lang="scss">
	.page-order .flex {
		justify-content: center;
	}
	
	.changemoney {
		border: 1px solid #F45051;
		color: #F45051;
		display: none;
	}
	
	.suremoney {
		display: none;
	}
	
	.ordercenter {
		text-align: center;
		h3 {
			padding-top: 20px;
			line-height: 30px;
		}
	}
	
	.wordd {
		margin-left: 10px;
		text-align: left;
		float: left;
	}
	
	.totalAmount1 {
		text-align: right;
	}
	
	.refundback,
	.refundback1 {
		color: #FF9000;
	}
	
	.order-common-ui .order-state {
		background: url(/thz/static/dingdanzhuangtaibg@2x.png);
		background-size: 100% 100%;
	}
	
	.applyRefundTime,
	.refundId,
	.kefu,
	.hide1,
	.refundback1,
	.hide2,
	.hide3,
	.refundback,
	.backAmount,
	.cashTime1,
	.cashCompany {
		display: none;
	}
	
	.line-order {
		width: 100%;
	}
	.hide-order{display: none;}
    .mode-bottom{
        background: #fff;
    	height: 100px;
    	width: 100%;
    	position: fixed;
    	bottom: 0;
    	z-index: 3211;
    	p{
    		height: 50px;
    		line-height: 50px;
    		border-bottom: 1px solid #f1f1f1;
    		margin-left: 20px;
    	}
    	.copy{
    		border-radius:2px;
    		font-size:12px;
    		border: 1px solid #888;
    		color: #888;margin-left: 10px;
    		background: #fff;
    	}
    	.close-mode{
    		float: right;
    		margin-right: 20px;
    		width: 20px;
    		margin-top: 15px;
    	}
    	
    }
    .mode{
    	width: 100%;
    	height: 100%;
    	background: rgba(0,0,0,0.5);
    	top: 0;
    	position: fixed;
    	z-index: 0;
    }
</style>