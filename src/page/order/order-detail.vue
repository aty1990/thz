
<template>
	<transition name="move">
		<div class="page-animate page-order-detail">
			<v-header>
				<mt-header title="订单详情">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="order-common-ui  content-wrap" v-if="hasData">
				<section class="order-state flex vertical">
					<h3>{{orderdetail.orderStatus}}</h3>
					<span class="mgt-10" v-if="orderdetail.orderPage=='A'">您的分期申请正在审核中，请耐心等待</span>
					<span class="mgt-10" v-if="orderdetail.orderPage=='B' || orderdetail.orderPage=='C' || orderdetail.orderPage=='E'|| orderdetail.orderPage=='G' || orderdetail.orderPage=='H'">感谢您对淘花宅的支持，欢迎再次光临</span>
					<span class="mgt-10" v-if="orderdetail.orderPage=='D'">{{orderdetail.expReceiveTime}} 系统将自动确认收货</span>
				</section>
				<div class="line-order white-bg" v-show="orderdetail.orderPage=='G' && orderdetail.refundId">
					<div class="wordd">退款总金额：</div>
					<div class="totalAmount1">￥{{orderdetail.refundStatus=="FS"?orderdetail.refundAmount:orderdetail.orderAmount}}</div>
				</div>
				<section class="flex all-top alltop white-bg order-detail-top" v-show="orderdetail.deliveryMobile" ref="showAddr">
					<div class="address-label">配送地址：</div>
					<div class=" grow vertical text-left deliveryName">
						<p>{{orderdetail.deliveryName}} {{orderdetail.deliveryMobile}}</p>
						<p>{{orderdetail.deliveryAddress}}</p>
					</div>
				</section>
				<section class="flex pd-all-10 all-top">
					<div class="img-wrap" @click="toDetalPage">
						<img v-bind:src="orderdetail.goodsUrl">
					</div>
					<div class=" grow vertical pdl-10 text-left">
						<p class="text-deal font-size-12"  @click="toDetalPage">{{orderdetail.goodsName}}</p>
						<div class="mgt-16 flex full-w">
							<h3 class="grow text-left">￥{{orderdetail.orderAmount}}</h3>
							<span class="refundStatus" v-if="orderdetail.refundStatus=='FS'">退款成功</span>
							<span class="refundStatus" v-if="orderdetail.refundStatus=='FC'">退款申请已取消</span>
							<span class="refundStatus link-btn-yellow" v-if="orderdetail.refundStatus=='FB' || orderdetail.refundStatus=='FA'" @click="refundback1(orderdetail.orderId,orderdetail.refundId,orderdetail.refundStatus)">退款审核中</span>
							<span class="refundStatus" v-if="orderdetail.refundStatus=='FF' || orderdetail.refundStatus=='FG' || orderdetail.refundStatus=='FW'">退款处理中</span>
							<span class="refundStatus" v-if="orderdetail.refundStatus=='FK'">退款失败</span>
							<span class="refundStatus link-btn-yellow" v-if="orderdetail.refundStatus=='FD'" @click="refundback1(orderdetail.orderId,orderdetail.refundId,orderdetail.refundStatus)">退货</span>
							<span id="tuikuang" v-if="(orderdetail.orderPage=='C' || orderdetail.orderPage=='D') && orderdetail.refundId=='' && orderdetail.isLoan==0" 
									class="link-btn-gray fr font-size-12" 
									@click="saleFlag && refundback(orderdetail.refundId,orderdetail.orderId)">退款</span>
						</div>
					</div>
				</section>
				<template v-if="orderdetail.orderPage!='G'">
					<template  v-if="orderdetail.refundStatus!='FS' && orderdetail.refundStatus!='FK' && orderdetail.orderPage!='H'">
						<p class="item" v-if="orderdetail.orderPage!='B'">商品总额：<span class="fr">￥{{orderdetail.orderAmount}}</span></p>
						<p class="item freightAmount" v-if="orderdetail.orderPage!='G' && orderdetail.orderPage!='B'">
							运费：<span class="fr">￥{{orderdetail.freightAmount}}</span>
						</p>
						<p class="item pdb-10 totalAmount"  v-if="orderdetail.orderPage!='H' && orderdetail.orderPage!='B'">
							实付费：<span class="fr theme-font-color">￥{{orderdetail.totalAmount}}</span>
						</p>
					</template>
					<template v-if="orderdetail.orderPage=='H'">
						<p class="item">转卖金额：<span class="fr">￥{{orderdetail.backAmount}}</span></p>
						<p class="item">转卖时间：<span class="fr">{{orderdetail.cashTime}}</span></p>
						<p class="item">转卖公司：<span class="fr">{{orderdetail.cashCompany}}</span></p>
					</template>
					<template v-if="orderdetail.refundStatus=='FS' || orderdetail.refundStatus=='FK'">
						<p class="item"><span>退款金额：</span><span class="fr">￥{{orderdetail.refundStatus=="FS"?orderdetail.refundAmount:orderdetail.orderAmount}}</span></p>
						<p class="item">申请时间：<span class="fr">{{orderdetail.applyRefundTime}}</span></p>
						<p class="item" >退款编号：<span class="fr">{{orderdetail.refundId}}</span></p>
					</template>
					<p class="item pdb-10 more-icon" v-if="orderdetail.orderPage=='H' && orderdetail.isLoan==1" @click="fqzd(orderdetail.taskId)" >查看分期账单</p>
				</template>
				<template v-if="orderdetail.orderPage=='G' && orderdetail.refundId">
					<p class="item"><span>退款金额：</span><span class="fr">￥{{orderdetail.refundStatus=="FS"?orderdetail.refundAmount:orderdetail.orderAmount}}</span></p>
					<p class="item"><span>申请时间：</span><span class="fr">{{orderdetail.orderTime}}</span></p>
					<p class="item"><span>退款编号：</span><span class="fr">{{orderdetail.refundId}}</span></p>
					<p class="item pdb-10 more-icon" v-if="orderdetail.isLoan==1"  @click="fqzd(orderdetail.taskId)" >查看分期账单</p>
					<p></p>
				</template>
				<div class="order-wrap">
					<p class="item">订单号码：<span class="fr">{{orderdetail.orderId}}</span></p>
					<p class="item">订单时间：<span class="fr">{{orderdetail.orderTime}}</span></p>
				</div>
				<footer class="footer" v-if="orderdetail.orderPage!='E' && orderdetail.orderPage!='B'">
					<span class="link-btn-gray lookexpresss" v-if="orderdetail.orderPage=='A'" @click="progress(orderdetail.orderId)">查看进度</span>
					<span class="link-btn-gray changemoney red-style"  @click="sale(orderdetail.orderId)">卖了换钱</span>
					<template v-if="orderdetail.orderPage=='D'">
						<span class="link-btn-gray" @click="logistics1()">查看物流</span>
						<span class="link-btn-gray"  @click="confirmationreceipt1(orderdetail.orderId,orderdetail.taskId)">确认收货</span>
					</template>
					<span class="link-btn-gray" v-if="orderdetail.orderPage!='D' && orderdetail.orderPage!='0'"  @click="kefu">联系客服</span>
					<span class="link-btn-gray red-style" v-if="orderdetail.orderPage==0" @click="gotoplay">{{orderdetail.isLoan==1?"去付款":"立即付款"}}</span>
				</footer>
			</div>
			<div class="hide-order" ref="detailOrderWrap">
            	<div class="mode-bottom" ref="modeBottom">
	            	<p>物流公司:
	            		<span class="expressCompany">{{orderdetail.expressCompany}}</span>
	            		<span class="close-mode" @click="closemode"><img src="/thz/static/icon_delete@2x.png" width="22"/></span>
	            	</p>
	            	<p>物流单号:<span class="expressId">{{orderdetail.expressId}}</span>
	            		<button class="orderDetail copy"  data-clipboard-target="#mydetailNumber">复制</button>
	            	</p>
	            	<input type="text" id="mydetailNumber" v-model="orderdetail.expressId" readonly>                       
	            </div>
	            <div class="mode" v-show="showMask"></div>
            </div>
			<router-view />
			<template v-if="orderdetail.orderPage=='B'">
				<div class="fixed-bottom" @click="goJytz">
					<img src="/thz/static/bg-order-footer.png" width="100%">
				</div>
			</template>

			<div class="no-data-msg" v-show="!hasData">
				<div class="ds-table">
					<div class="ds-tell"><img src="/thz/static/load.png" class="loop" width="22"></div>
				</div>
			</div>

		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api'
	import { getCookie,iosOrAndroid } from '@/assets/js/tool'
	import {mapActions} from 'vuex'
	import Clipboard from 'clipboard'
	export default {
		name: 'page-order-detail',
		components: {
			VHeader
		},
		data() {
			return {
				saleFlag : true,
				showMask : false,
				hasData : false,
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
			...mapActions({
				pay:"online/pay"
			}),
			initData() {
				var _this = this;
				//isLoan 1:分期订单 0：在线支付订单
				api.orderdetail({
					orderId: sessionStorage.getItem("orderId"),
					isLoan : sessionStorage.isLoan
				}).then(res => {
					if(res.code == 500) {
						layer.open({
							content: res.msg,
							skin: 'msg',
							time: 2
						});
					}
					if(res.code == 200) {
						_this.orderdetail = res.body;
						let orderPage = res.body.orderPage;
						_this.hasData = true;
						
						//交易关闭
						if(orderPage == 'G') {
							if(_this.orderdetail.refundId && _this.orderdetail.isLoan!="0"){
								_this.$refs.showAddr.style.display = "flex";
								$(".address-label").html("退回淘花宅分期:");
								$(".address-label").css("width", "150px");
								$(".deliveryName").html('￥'+res.body.refundAmount);
								$(".deliveryName").css("color", "#F45051");
								$(".deliveryName").css("text-align", "right");
							}else{
								setTimeout(()=>{
									_this.$refs.showAddr.style.display = "none";
								},0)
							}
						}
					}
				})
			},
			toBack() {
				if(sessionStorage.orderType == "onlineOrder"){
					this.$parent.init && this.$parent.init();
					history.back();
				}else{
					this.$router.push("/home/order");
				}
			},
			refund() {
				this.$router.push({ name: "refund" });
			},
			toDetalPage(){
				sessionStorage.setItem("goodsId",this.orderdetail.goodsId);
				localStorage.setItem("goodsId",this.orderdetail.goodsId);
				this.$router.push("/home/goods-detail");
			},
			gotoplay(){
				sessionStorage.setItem("goodsId",this.orderdetail.goodsId);
                localStorage.setItem("goodsId",this.orderdetail.goodsId);
                if(this.orderdetail.isLoan=="1"){
	                this.$router.push({
	                    path:"/home/userInfoList",
	                    query : {
	                        goodsId : this.orderdetail.goodsId
	                    }
	                });
                }else{
					sessionStorage.goodsId = this.orderdetail.goodsId;
                	this.pay({orderId:this.orderdetail.orderId,"_self":this}); 
                }
			},
			refundback(refundId, orderId) {
				let userId =  JSON.parse(localStorage.getItem("userInfo")).userId;
				api.canWithdraws({orderId:orderId,userId:userId}).then(res=>{
                    if(res.code=="200"){
                    	let orderStatus = res.body.orderStatus;
                        if((orderStatus == "C" || orderStatus == "D") && res.body.payStatus=="1"){
                            this.$router.push({
								path: this.orderdetail.isLoan=="1"?"/refund":"/onlineorder/refund",
								query: {
									refundId: refundId,
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
                	this.$router.replace("/home/fqzd");
                }
            },
			logistics1() {
				let _self = this;
				this.showMask = true;
				this.$refs.modeBottom.style.bottom = 0;
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
				if(refundStatus=="FB" || refundStatus=="FA"){
					this.$router.push({
						path: location.href.indexOf("onlineorder")>0?"/home/order/onlinesuccess":"/order/success",
						query: {
							orderId: orderId,
							refundId: refundId
						}
					});			
				}else if(refundStatus=="FD"){
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
				sessionStorage.orderId = orderId;
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
                                    content: "收货成功"
                                    ,skin: 'msg'
                                    ,time: 2,
                                    end : function(){
                                    	sessionStorage.setItem("taskId",taskId);
                                    	$.publish('app.list');
										$.publish('app.refreshOrderDetail');
                                        _self.$router.push({
											path: "/order/detail/comfirmgoods"
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
            	this.showMask = false;
				this.$refs.modeBottom.style.bottom = "-100px";
            },
            goJytz(){
            	location.href = "https://go.vjiehu.com/go/index.html#/home?page=2";
            }
		}
	}
</script>
<style lang="scss">
	.page-order-detail{
		.changemoney {
			border: 1px solid #F45051;
			color: #F45051;
			display: none;
		}
		.wordd {
			margin-left: 10px;
			text-align: left;
			float: left;
		}
		.totalAmount1 {
			text-align: right;
		}
		
		.refundback1,
		.refundStatus{
			color: #FF9000;
		}
		.content-wrap{
			overflow:auto; 
			position: absolute;
			top:41px;
			bottom: 40px;
			left:0;
			right:0;
			.order-state {
				background: url(/thz/static/dingdanzhuangtaibg@2x.png);
				background-size: 100% 100%;
			}
		} 
		.line-order {
			width: 100%;
		}
	    .fixed-bottom{
	    	position: fixed;
	    	bottom:0;
	    	left:0;
	    	font-size:0;
	    	z-index: 9999;
	    }
	    .red-style{
	    	color:#F45051;
	    	border: 1px solid #F45051;
	    }
	    .deliveryName{
			width:80%;
	    }
	}
</style>
