<template>
	<div class="page-animate home-page">
		<div class="page-wrap" v-show="hasData">
			<mt-tab-container class="page-tabbar-container" v-model="selected">
				<mt-tab-container-item id="首页">
					<vue-better-scroll class="wrapper-wrap">
						<div class="flex pd-all-6 search-wrap">
							<input type="search" class="grow font-size-12" placeholder="搜宝贝" @click.stop="search">
							<span class="msg-wraps" @click="toRouter('/home/msg')">
								<img src="/thz/static/home-msg.png" width="22" height="22" />
								<span class="msg-icon newmsg"></span>
							</span>
						</div>
						<div class="home-slide-wrap">
							<mt-swipe :auto="3000" >
		                        <mt-swipe-item v-for="banner in banners" @click.native="tourl(banner.bannerLinkUrl)">
		                            <img :src="banner.bannerPicUrl" width="100%">
		                        </mt-swipe-item>
		                    </mt-swipe>
						</div>
						<div class="flex white-bg">
							<span class="flex grow font-size-12"><img src="/thz/static/sprity/zpbz.png" height="16" class="mgr-4" />正品保障</span> 
							<span class="flex grow font-size-12"><img src="/thz/static/sprity/sm.png" height="16" class="mgr-4" />随买随卖</span>
							<span class="flex grow font-size-12"><img src="/thz/static/sprity/baoyou.png" height="16" class="mgr-4" />全场包邮</span>
						</div>
						<div class="mgt-10 mgb-10">
							<div>
								<p class="flex goods-title" @click="jpfq"><span class="mgr-6">精品分期</span><img src="/thz/static/home-more.png" height="14"></p>
								<div class="home-component flex">
									<div class="goods-item" v-for="goods in jpfqList" @click.stop="toGoodDetail(goods)" >
										<div class="pdt-20 pdb-10 min-he-100">
											<img v-lazy="goods.goodsPicurl" width="90%" style="margin-left: 5%;">
										</div>
										<p class="label-item-wrap"><span class="label-item">分期购</span></p>
										<div class="text-deal1">{{goods.goodsName}}</div>
										<div class="price">￥{{goods.goodsAmount}}</div>
									</div>
								</div>
								<p class="flex goods-title mgt-1" @click="jpfq">
									<span class="mgr-6 font-size-12" style="color:#959BA7">查看更多</span>
									<img src="/thz/static/home-more.png" height="14">
								</p>
							</div>
							<div class="payment-ui">
							 	<p class="flex goods-title mgt-10"  @click="payment">
							 		<span class="mgr-6">支付优选</span>
							 		<img src="/thz/static/home-more.png" height="14" style="font-size:0;">
							 	</p> 
								<div><a :href="jxhd_banners.bannerLinkUrl"><img :src="jxhd_banners.bannerPicUrl" width="100%" /></a></div>
								<div class="home-scroll-tab" ref="homeScroll">
						            <div class="tab_content" ref="tabcontent">
						                <div class="home-tab-item" v-for="goods in nloanGoods" @click="toGoodDetail(goods)">
						                	<img :src="goods.goodsPicurl" width="100%">
						                	<div class="text-deal1 font-size-13">{{goods.goodsName}}</div>
						                	<div class="price font-size-14"><span>￥{{goods.goodsAmount}}</span><span class="old-price">￥{{goods.goodsMarketPrice}}</span></div>
						                </div>
						            </div>
						        </div> 
							</div>

							<div class="mgt-10">
								<p class="flex goods-title"><span class="mgr-6">猜你喜欢</span></p>
								<div class="home-component flex">
									<div class="goods-item" v-for="like in likeGoods" @click.stop="toGoodDetail(like)">
										<div class="pdt-20 pdb-10 min-he-100">
											<img v-lazy="like.goodsPicurl" width="90%" style="margin-left: 5%;font-size: 0;">
										</div>
										<div class="text-deal1">{{like.goodsName}}</div>
										<div class="price">￥{{like.goodsAmount}}</div>
									</div>
								</div>
							</div>
						</div>
					</vue-better-scroll>
				</mt-tab-container-item>
				<mt-tab-container-item id="换钱">
					<v-header>
						<mt-header title="淘花宅"></mt-header>
					</v-header>
					<div class="pawn-component">
						<div class="card" v-for="pawn in pawnList">
							<p class="card-title flex">
								<span class="grow">下单时间：{{pawn.orderTime}}</span>
								<span class="wid-80">{{pawn.orderStatus}}</span>
							</p>
							<div class="right-content flex pdb-10">
								<div class="pdl-10">
									<img :src="pawn.goodsUrl" height="60px" width="60px">
								</div>
								<div class="wrap grow">
									<div class="text-deal1" @click.stop="sale(pawn.orderId)">{{pawn.goodsName}}</div>
									<p class="stages">分期付款</p>
									<p class="price">￥{{pawn.orderAmount}} 
										<span class="link-btn-red fr" @click="sale(pawn.orderId)">卖了换钱</span>
									</p>
								</div>
							</div>
						</div>
						<div v-if="pawnFlag" class="no-pawn-order flex vertical">
							<div class="middle-box"></div>
							<p class="mgt-10 mgb-40">空空如也，购买成功可以换钱哦~</p>
							<mt-button type="primary" size="large" class="font-size-14" style="width:60%;" @click="jpfq">立即选购</mt-button>
						</div>
					</div>
				</mt-tab-container-item>
				<mt-tab-container-item id="我的">
					<div class="mine-component">
						<div class="mine-header">
							<div slot="right" class="right">
								<div @click="toRouter('/home/msg')">
									<img src="/thz/static/icon_xiaoxi@2x.png" style="width: 20px;"/>
									<span class="newmsg" ></span>
								</div>
							</div>
							<div class="top flex text-left" @click="toRouter('/login')">
								<img src="/thz/static/user_default@2x.png" class="user_logo" />
								<span class="user_login">{{account}}</span>
							</div>
						</div>
						<div class="flex order-part">
							<div class="flex grow relative" @click="toRouter('/home/order')">
								<img src="/thz/static/icon-fqdd.png" height="20" class="mgr-4" />
								<span>分期订单</span>
							</div>
							<div class="flex grow relative has-left-border"  @click="toRouter('/home/onlineorder')">
								<img src="/thz/static/icon-online.png" height="20" class="mgr-4"/>
								<span>在线支付订单</span>
							</div> 
						</div>
						<div class="flex fqzd-box" @click="toaccount">
							<span class="flex text-left grow pdl-20 font-size-16">商城分期账单</span>
							<span class="flex">
								<div class="gray-font">待还款<span class="font-size-18 black mgr-4">￥{{sumRA}} </span></div>
								<img src="/thz/static/icon-go@2x.png" height="30" class="left-icon">
							</span>
						</div>
						<div class="item-list">
							<ul>
								<li class="flex li-item">
									<img src="/thz/static/icon-card.png" class="scale-7"/>
									<span class="grow is-link" @click="toRouter('/home/mycard')">我的银行卡</span>
								</li> 
								<li class="flex li-item">
									<img src="/thz/static/me-address.png" style="height: 18px;width: auto;margin-left:26px;" />
									<span class="grow is-link" @click="toRouter('/home/shipping-address')">收货地址</span>
								</li>
								<li class="flex li-item">
									<img src="/thz/static/icon_wenti@2x.png" class="scale-7"/>
									<span class="grow is-link" @click="toRouter('/home/help')">帮助中心</span>
								</li>
								<li class="flex li-item">
									<img src="/thz/static/icon_lianxikefu@2x.png" class="scale-7"/>
									<span class="grow is-link"  @click="toRouter('/home/kefu')">联系客服</span>
								</li>
								<!-- <li class="flex li-item">
									<img src="/thz/static/shouhou.png" class="scale-7"/>
									<span class="grow is-link"  @click="toRouter('/home/shouhou')">售后客服</span>
								</li> -->
								<li class="flex li-item" >
									<img src="/thz/static/icon_shezhi@2x.png" class="scale-7"/>
									<span class="grow is-link" @click="toRouter('/home/dropout')">安全设置</span>
								</li>
							</ul>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="首页" @click.native="getHomeData">
				<img v-if="selected=='首页'" src="/thz/static/home_selected.png" height="20">
				<img v-else src="/thz/static/home.png" height="20">
				<p class="mgt-4">首页</p>
			</mt-tab-item>
			<mt-tab-item id="换钱" @click.native="getPawnTabData">
				<img v-if="selected=='换钱'" src="/thz/static/zhuanmai_select.png" height="20">
				<img v-else src="/thz/static/zhuanmai.png" height="20">
				<p class="mgt-4">换钱</p> 
			</mt-tab-item>
			<mt-tab-item id="我的">
				<img v-if="selected=='我的'" src="/thz/static/me_selected.png" height="20">
				<img v-else src="/thz/static/me.png" height="20">
				<p class="mgt-4">我的</p>   
			</mt-tab-item>
		</mt-tabbar>
		<router-view />
		<div class="no-data-msg" v-show="!hasData">
			<div class="ds-table">
				<div class="ds-tell"><img src="/thz/static/load.png" class="loop" width="22"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api'
	import {getCookie,delCookie,iosOrAndroid} from '@/assets/js/tool'
	import BScroll from 'better-scroll'
	import VueBetterScroll from 'vue2-better-scroll'  
	export default {
		name: 'home-page',
		components: { VHeader,VueBetterScroll },
		data() {
			return {
				selected: '首页',
				jpfqList : [],
				banners : [],
				jxhd_banners : {},
				likeGoods : [],
				nloanGoods : [],
				hasData : false,
				pawnList : [],
				pawnFlag : false,
				sumRA : 0,
				userInfo : null,				
				account : "登录/注册"
			}
		},
        mounted(){
            this.init();
        },
        updated(){
        	let _self = this;
        	// 判断当前cookie里的thz_H5的值是否存在存在就根据cookie获取用户信息
        	if(getCookie("thz_H5")){
	        	api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
	        		//alert(JSON.stringify(res));
	        		// 没有权限
	        		if(res.code=="111"){
						// 判断安卓和微信
						_self.$router.push("/login");
	        		}else if(res.code=="200"){
		        		// 将用户信息存入localStorage中     
		        		localStorage.setItem("userInfo",JSON.stringify(res.body));
		        		localStorage.userStat = res.body.userStat;
		        		localStorage.currentTime = res.body.currentTime;
		        		localStorage.rejectTime = res.body.rejectTime;
			        	//我的
			        	api.getmyinfo({userId:res.body.userId}).then(res=>{
							if(res.code=="200"){
								// 将联系客服的链接、桃花宅分期数存入sessionStorage中				
								sessionStorage.setItem("kfLink",res.body.kfLink);						
								sessionStorage.setItem("stagesCount",res.body.stagesCount);
								localStorage.setItem("account",res.body.mobile);
								_self.sumRA = res.body.sumRA; // 用户分期金额
								// 格式化手机号
								_self.account = res.body.mobile.slice(0, 3)+"****"+res.body.mobile.slice(7, 11); 
							}else if(res.code == "500"){
								layer.open({
				                    content: res.msg
				                    ,skin: 'msg'
				                    ,time: 2,
				                    end:function(){
				                    	_self.account = "登录/注册";
				                    }
			                    });
							}
						});
						// 获取用户消息
						_self.getMsg();
	        		}
	        	})
        	}
        },
		methods: {
			init(){
				let _self = this;
	        	// 获取跳转到当前页面的目标源 term等于android为安卓端访问
	        	let term  = this.$route.query.term;
	        	// 有值就存入sessionStorage
	        	if(term){
	        		sessionStorage.setItem("term",term);
	        	}
	        	// 如果是微信游览器则删除term
	        	if(browser.versions.weixin){
	        		sessionStorage.removeItem("term");
	        	}
	        	
	        	// 监听子页面发布广播事件 用于刷新当前页面数据
	        	$.subscribe('app.thz', function(e, results) {
	                _self.initData();
	            });

	        	// 判断tabbber的选项是否处在“我的” 是就显示我的
	            if(sessionStorage.getItem("selected")){
	            	if(sessionStorage.getItem("selected")=="我的"){
	            		_self.selected = "我的";
	            	}
	            }
	            // 初始化页面数据
	        	this.initData();
			},
			getHomeData(){
				sessionStorage.selected = "首页";
	            this.init();
			},
			// 用户点击换钱选项卡时刷新换钱页面数据
			getPawnTabData(){
				this.pawnList = [];
            	//换钱订单列表
				api.paymentList({}).then(res=>{
					this.pawnList = res.body.data?res.body.data:[];
					this.pawnFlag = this.pawnList.length==0?true:false;
				})
			},
			initTabScroll(){
				let items = $(this.$refs.tabcontent).find(".home-tab-item");
				let width = items.length*(items.eq(0).outerWidth(true));
	            this.$refs.tabcontent.style.width=width+'px';
	           	new BScroll(this.$refs.homeScroll, {
                    startX:0,
                    click:true,
                    scrollX:true,
                    scrollY:false,
                    eventPassthrough:'vertical'
                })
			},
			initData(){
				let _self = this;
				// 判断thz_H5是否存在
				if(getCookie("thz_H5")){
					// 获取用户信息
	        		this.userInfo =  JSON.parse(localStorage.getItem("userInfo"));
	        	}
	        	// 获取首页商品数据
	        	_self.jpfqList = [];
				// 首页商品
	        	api.indexPage({}).then(res=>{
					if(res.code=="200"){
						// 轮播图
						_self.banners = res.body.banners;
						// 精品分期
						_self.jpfqList = res.body.loan_goods;
						// 猜你喜欢
						_self.likeGoods = res.body.like_goods;

						// 支付优选(非分期商品)
						_self.nloanGoods = res.body.nloan_goods;

						// 支付优选banner
						_self.jxhd_banners = res.body.jxhd_banners;

						_self.$nextTick(()=>{
							// 隐藏加载层
							_self.hasData = true;
							_self.initTabScroll();
				        });

					}
				})
			},
			getMsg(){
				//消息总条数
				api.newMsgs({}).then(res=>{
					if(res.code=="200"){
						if(Math.floor(res.body)==0){
							$(".home-page .newmsg").hide();
						}else{
							$(".home-page .newmsg").show();
						}
					}
				})
			},
			toBack() {
				this.$router.back();
			},
			toRouter(_url) {
				let _self = this;
				sessionStorage.setItem("selected","我的");
				if(getCookie("thz_H5")){
					// 判断用户是否登录且cookie是否有效
					api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
						if(res.code=="200"){
							// 点击的是否为联系客服
							if(_url.indexOf("kefu")!=-1){
								// 如果为苹果系统则直接打开链接，因为ios不支持iframe
								if(browser.versions.ios){
									if(sessionStorage.getItem("term")){
										iosOrAndroid("Open Page",{url:sessionStorage.getItem("kfLink")},false);
									}else{
										location.href = sessionStorage.getItem("kfLink");
									}
								}else{
									// 标识去联系客服的源
									sessionStorage.setItem("from","home");
									// 安卓直接跳路由
									_self.$router.push(_url);
								}
							// 是否为售后
							}else if(_url.indexOf("shouhou")!=-1){
								// 判断同联系客服
								if(browser.versions.ios){
									if(sessionStorage.getItem("term")){
										iosOrAndroid("Open Page",{url:"http://free.weikefu.net/AppKeFu/weikefu/web/chat.php?wg=taohuazkf&robot=false&hidenav=true"},false);
									}else{
										location.href = "http://free.weikefu.net/AppKeFu/weikefu/web/chat.php?wg=taohuazkf&robot=false&hidenav=true";
									}
								}else{
									_self.$router.push(_url);
								}
								//是否为登录
							}else if(_url!="/login"){
								_self.$router.push(_url);
							}
						}else{
							//如果cookie中不存在thz_h5就去登录
							_self.$router.push("/login");
						}
					});
				}else{
					this.$router.push("/login");
				}
			},
			// 商品详情
			toGoodDetail(goods) {
				// 将goodsId存入sessionStorage,防止路由刷新参数丢失
				sessionStorage.setItem("goodsId",goods.goodsId);
				localStorage.setItem("goodsId",goods.goodsId);
				sessionStorage.nav = "home";
				this.$router.push({
					name : "goods-detail",
					query : {
						goodsId : goods.goodsId
					}
				});
			},
			payment(){
				this.$router.push("/home/payment");
			},
			toPawnDetail(pawn){
				// 将goodsId存入sessionStorage,防止路由刷新参数丢失
				sessionStorage.setItem("pawnOrderId",pawn.orderId);
				this.$router.push("/pawn-order-detail");
			},
            toOrder(){
                this.$router.push({name:"order"});
            },
            sale(orderId){
            	// 卖了换钱，判断当前订单的状态是否为可出售
            	api.canWithdraws({orderId:orderId,userId:this.userInfo.userId}).then(res=>{
            		if(res.code=="200"){
            			// orderStatus = C 为已付款，payStatus =1 为可以出售
            			if(res.body.orderStatus=="C" && res.body.payStatus=="1"){
            				sessionStorage.orderId = orderId;
	            			this.$router.push({name:"sale"});
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
            staging1(){
            	// 分期记录
            	sessionStorage.setItem("selected","我的");
				if(getCookie("thz_H5")){
					api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
						if(res.code=="200"){
							this.$router.push({path:"/home/staging"});		
						}else{
							this.$router.push("/login");
						}
					});	
				}else{
					this.$router.push("/login");
				}
            },
            tourl(url){
            	if(url){
            		location.href = url;
            	}
            },
            jpfq(){
            	this.$router.push("/home/jpfq");
            },
            search(){
            	this.$router.push("/home/search");
            },
            toaccount(){
            	if(getCookie("thz_H5")){
					// 判断用户是否登录且cookie是否有效
					api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
						if(res.code=="200"){
							this.$router.push("/home/staging"); 
						}else{
							//如果cookie中不存在thz_h5就去登录
							_self.$router.push("/login");
						}
					});
				}else{
					this.$router.push("/login");
				}
            },
            loadData(){}
		}
	}
</script>
<style scoped lang="scss">
	@import '../../assets/scss/mixin';
	.mint-header {
		background-color: #F45051;
		color: #fff;
		border: none;
	}
	.wrapper-wrap{
		position: fixed;
		top:0;
		left:0;
		right:0;
		bottom:px2rem(52);
		overflow: hidden;
		z-index: 1;
	}
	.is-fixed{
		z-index: 2;
	}
	.home-slide-wrap{
		width: 100%;
		height: px2rem(180);
	}
	.newmsg{
		width: px2rem(8);
		height: px2rem(8);
		border-radius: px2rem(8);
		background: rgb(255,239,0);
		display: block;
		position: absolute;
		top: px2rem(8);
		right: px2rem(15);
		display: none;
	}
	.page-wrap {
		overflow: auto;
		position: absolute;
		top:0;
		bottom: 54px;
		width: 100%;
		// 我的样式  
		.mine-header{
			height: 170px;
			background:url(/thz/static/header_bg@2x.png) no-repeat ;
			background-size: 100% 100%;
			color: #fff;
		}
		.flex-item{

			img{
				height: 25px;
			}
			span{
				margin-top: 10px;
			}
		}
		.user_logo{
			width: px2rem(64);
			height: px2rem(64);
			border-radius: px2rem(64);
			margin-left: px2rem(20);
		} 
		.user_login{
			margin-left: px2rem(20);
		} 
		.icon-code {
			display: block;
		}  
		.right{
			float: right;
			margin: 10px px2rem(15);
		} 
		.mine-component {
			.top {
				height: 70px;
				width: 100%;				
				color: #fff;
			}
			.flex-item {
				padding: px2rem(15);
				background: #fff;

			}
			.icon-code {
				transform: scale(0.7);				
			}
			.item-list {
				background: #ffffff;
				margin-top: -20px;
			}
			.is-link {
				background: url("/thz/static/href.png") scroll 94% 50% no-repeat;
				background-size: 20px auto;
			}
			.li-item {
				height: 48px;
				line-height: 48px;
				img{
					width: 25px;
					margin-left: 20px;
				}
			}
		}
		// 首页样式
		.home-component {
			flex-wrap: wrap;
			justify-content: flex-start;
			background:#fff;
		}
		.goods-title{
			padding: px2rem(10) 0;
			background:#fff;
			font-size:px2rem(16);
		}
		// 换钱样式
		.pawn-component {
			.card {
				margin-bottom: 4px;
				.card-title {
					padding: 10px;
					margin-bottom: 5px;
					font-size: 12px;
				}
				.wid-80 {
					width: 40px;
				}
				.fr {
					float: right;
				}
				background: #fff;
				.right-content {
					.wrap {
						padding: 2px 8px;
					}
					.stages {
						font-size: 12px;
						padding: 4px 0;
						color: #878787;
					}
				}
			}
			.avg {
				flex-wrap: wrap;
				justify-content: flex-start;
			}
			.bg-white {
				margin-top: 5px;
			}
			
		}
		.no-pawn-order{
			text-align: center;
			padding: 40px 0;
			letter-spacing: px2rem(1);
		}
		.search-wrap{
			background:#fff;
			input{
				background:url("/thz/static/search-btn.png") #EFF0F2 scroll 3% 47% no-repeat;
				background-size :px2rem(14);
				font-size:px2rem(12);
				width:px2rem(308);
				line-height:px2rem(30);
				padding-left: px2rem(30);
				border-radius: px2rem(4);
				margin-right: px2rem(6);
				outline: none;
				border:none;
			}
			span{
				margin-right: px2rem(6);
				img{
					margin-top:  px2rem(6);
				}
			}
		}
		.white-bg{
			background:#fff;
			padding: px2rem(10) 0;
		}
		.home-scroll-tab{
	        display: inline-block;
	        width: 100%;
	        height:px2rem(180);
	        overflow: hidden;
	        background:#fff;

	        .tab_content{
		        text-align: 'center';
		        height: px2rem(170);
		    }
		    .home-tab-item{
		        display: inline-block;
		        width:px2rem(140);
		        margin-left:px2rem(5);
		        padding: px2rem(5);

		        img{
		        	width:px2rem(120);
		        }
		    }   
		    .icon {
		        display: inline-block;
		        width: 1em;
		        height: 1em;
		        vertical-align: -0.15em;
		        fill: currentColor;
		        overflow: hidden;
		        margin-left: 10px;
		        margin-right: 10px;
		    }
		    .old-price{
		    	text-decoration:line-through;
		    	margin-left:px2rem(10);
		    	font-family: PingFang Light;
		    	font-weight: normal;
		    	color:#9AA1AB;
		    }
	        
	    }
	    .middle-box{
	    	background:url("/thz/static/pic_kong@2x.png") center #fff no-repeat;
	    	background-size : px2rem(90);
	    	width:px2rem(130);
	    	height:px2rem(130);
	    	margin-top: px2rem(80);
	    	border-radius: 50%;
	    }
	    .msg-wraps{
	    	position: relative;
	    	.msg-icon{
	    		position: absolute;
	    		width:px2rem(10);
	    		height:px2rem(10);
	    		background-color: #F45051;
	    		top:px2rem(2);
	    		right : px2rem(-10);
	    		border-radius: 50%;
	    		display:none;
	    	}
	    }
	    .order-part{
	    	width: 90%;
	    	margin-left: 5%;
	    	background:#fff;
	    	height: px2rem(60);
	    	line-height: px2rem(60);
	    	margin-top:px2rem(-30);
	    	-webkit-box-shadow: 0 2px 2px #FEF8F8;
	    	border-radius: px2rem(4);
	    	-box-shadow: 0 2px 2px #000;
	    }
	    .fqzd-box{
	    	height: 80px;
	    	background:url("/thz/static/bg-fqzd.png") #fff left bottom no-repeat;
	    	background-size:100% 100%;
	    	margin-top:px2rem(8);
	    	padding-bottom: px2rem(20);
	    }
	    .black{
	    	color: #000;
	    }
	    .left-icon{
	    	margin-top:4px;
	    	margin-right: 10px;
	    }
	    .relative{
	    	position: relative;
	    }
	    .has-left-border:after{
	    	position: absolute;
	    	z-index: 3;
	    	left:1px;
	    	bottom:14px;
	    	content:"";
	    	width: 1px;
	    	height: 30px;
	    	background-color: #E9EAEE;
	    	transform: scaleX(0.6);
	    }

	}
	
	
</style>