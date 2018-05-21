<template>
	<div class="page-animate home-page">
		<div class="page-wrap">
			<mt-tab-container class="page-tabbar-container" v-model="selected">
				<mt-tab-container-item id="首页">
					<v-header>
						<mt-header title="淘花宅"></mt-header>
					</v-header>
					<div class="home-component flex">
						<div class="goods-item" v-for="goods in homeDataSet" @click.stop="toGoodDetail(goods)" >
							<div class="pdt-20 pdb-10 min-he-100">
								<img v-lazy="goods.goodsPicurl"  height="100%" width="100%">
							</div>
							<h5 class="text-deal">{{goods.goodsName}}</h5>
							<div class="price">￥{{goods.goodsAmount}}</div>
						</div>
					</div>
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
							<div class="right-content flex" >
								<div class="pdl-10">
									<img :src="pawn.goodsUrl" height="60px" width="60px">
								</div>
								<div class="wrap grow">
									<h5 class="text-deal" @click.stop="sale(pawn.orderId)">{{pawn.goodsName}}</h5>
									<p class="stages">分期付款</p>
									<p class="price">￥{{pawn.orderAmount}} 
										<span class="link-btn-red fr" @click="sale(pawn.orderId)">卖了换钱</span>
									</p>
								</div>
							</div>
						</div>
						<div v-if="pawnList.length==0" class="no-pawn-order">
							<b>购买成功可以换钱哦</b>
						</div>
						<div>
							<p class="flex pd-all-10" style="background:#fff;">
								<img src="/thz/static/hot.png" width="70%" />
							</p>
							<div class="flex avg">
								<div class="goods-item"  height="200" v-for="goods in homeDataSet" @click.stop="toGoodDetail(goods)" >
									<div class="pdt-20 pdb-10 min-he-100">
										<img v-lazy="goods.goodsPicurl"  height="100%" width="100%">
									</div>
									<h5 class="text-deal">{{goods.goodsName}}</h5>
									<div class="price">￥{{goods.goodsAmount}}</div>
								</div>
							</div>
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
						
						<div class="flex">
							<div class="flex-item vertical flex" @click="toRouter('/home/order')">
								<img src="/thz/static/icon_goumaidingdan@2x.png"/>
								<span>购买订单</span>
							</div>
							<div class="flex-item vertical flex" @click="toRouter('/home/pawn')">
								<img src="/thz/static/icon_zhuanmai@2x.png" />
								<span>转卖订单</span>
							</div>
							<div class="flex-item vertical flex" @click="staging1">
								<img src="/thz/static/icon_fenqi@2x.png" />
								<span>淘花宅分期</span>
							</div>
						</div>
						<div class="item-list">
							<ul>
								<li class="flex li-item">
									<img src="/thz/static/icon_jiaoyijilu@2x.png" class="scale-8"/>
									<span class="grow is-link" @click="toRouter('/home/transaction')">交易记录</span>
								</li>
								<li class="flex li-item">
									<img src="/thz/static/me-address.png" class="scale-9"/>
									<span class="grow is-link" @click="toRouter('/home/shipping-address')">我的收货地址</span>
								</li>
								<li class="flex li-item">
									<img src="/thz/static/icon_wenti@2x.png" class="scale-7"/>
									<span class="grow is-link" @click="toRouter('/home/help')">常见问题</span>
								</li>
								<li class="flex li-item">
									<img src="/thz/static/icon_lianxikefu@2x.png" class="scale-8"/>
									<span class="grow is-link"  @click="toRouter('/home/kefu')">联系客服</span>
								</li>
								<li class="flex li-item">
									<img src="/thz/static/shouhou.png" class="scale-8"/>
									<span class="grow is-link"  @click="toRouter('/home/shouhou')">售后客服</span>
								</li>
								<li class="flex li-item" >
									<img src="/thz/static/icon_shezhi@2x.png" class="scale-8"/>
									<span class="grow is-link" @click="toRouter('/home/dropout')">安全设置</span>
								</li>
							</ul>
						</div>
					</div>
				</mt-tab-container-item>
			</mt-tab-container>
		</div>
		<mt-tabbar v-model="selected" fixed>
			<mt-tab-item id="首页">
				<img v-if="selected=='首页'" src="/thz/static/home_selected.png" height="20">
				<img v-else src="/thz/static/home.png" height="20">
				<p class="mgt-4">首页</p>
			</mt-tab-item>
			<mt-tab-item id="换钱" class="pawnTab">
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
	export default {
		name: 'home-page',
		components: { VHeader },
		data() {
			return {
				selected: '首页',
				homeDataSet : [],
				hasData : false,
				pawnList : [],
				userInfo : null,				
				account : "登录/注册"
			}
		},
        mounted(){
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
        	// 根据sessionStorage取值判断 ps这里不能取this.$route.query里的term 以防子页面跳转到当前页this.$route.query里不存在此参数
        	if(!sessionStorage.getItem("term")){
        		// 微信就获取地理位置坐标 安卓不获取
	        	let thisUrl = location.href.split('#')[0];
	        	// 获取微信签名
	        	api.getWxSign({url:thisUrl}).then(res=>{
	        		if(res.code=="200"){
	                    _self.getWx(res);
	                }
	        	})
        	}else{
        		console.log("来着安卓 or ios的访问请求");
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

        	// 用户点击换钱选项卡时刷新换钱页面数据
            $("body").on("click",".pawnTab",function(){
            	_self.pawnList = [];
            	//换钱订单列表
				api.paymentList({}).then(res=>{
					_self.pawnList = res.body.data?res.body.data:[];
				})
            });
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
						if(!sessionStorage.getItem("term")){
							window.location.href='${project.domain}/index';
						}
	        		}else if(res.code=="200"){
		        		// 将用户信息存入localStorage中     
		        		localStorage.setItem("userInfo",JSON.stringify(res.body));
			        	//我的
			        	api.getmyinfo({userId:res.body.userId}).then(res=>{
							if(res.code=="200"){
								// 将联系客服的链接、桃花宅分期数存入sessionStorage中				
								sessionStorage.setItem("kfLink",res.body.kfLink);						
								sessionStorage.setItem("stagesCount",res.body.stagesCount);
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
			initData(){
				var _self = this;
				// 判断thz_H5是否存在
				if(getCookie("thz_H5")){
					// 获取用户信息
	        		this.userInfo =  JSON.parse(localStorage.getItem("userInfo"));
	        	}
	        	// 获取首页商品数据
	        	_self.homeDataSet = [];
				// 首页商品
	        	api.indexPage({}).then(res=>{
					if(res.code=="200"){
						_self.homeDataSet = res.body;
						// 隐藏加载层
						_self.hasData = true;
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
				this.$router.push({
					name : "goods-detail"
				});
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
            getWx(res){
            	let _self = this;
            	let appId = res.body.appid;
				let nonceStr = res.body.noncestr;
				let signature = res.body.signature;
				let timestamp = res.body.timestamp;
				wx.config({
					debug: false,
					appId: appId,
					timestamp: timestamp,
					nonceStr: nonceStr,
					signature: signature,
					jsApiList: ['getLocation']
				});
                wx.ready(function() {
                   	wx.getLocation({
						type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
						success: function (res) {
							localStorage.setItem("latitude",res.latitude);   	// 纬度，浮点数，范围为90 ~ -90
							localStorage.setItem("longitude",res.longitude); 	// 经度，浮点数，范围为180 ~ -180。
							// 将GPS坐标转化为高德系经纬度
				            AMap.convertFrom(res.longitude+","+res.latitude,"gps",function(status,result){
				           		if(result.info=="ok"){
				           			localStorage.setItem("latitude",result.locations[0].lat);   	// 纬度，浮点数，范围为90 ~ -90
									localStorage.setItem("longitude",result.locations[0].lng); 		// 经度，浮点数，范围为180 ~ -180。
				           		}
				            });
						}
					});
                })
            }
		}
	}
</script>
<style scoped lang="scss">
	.mint-header {
		background-color: #F45051;
		color: #fff;
		border: none;
	}
	.newmsg{
		width: 8px;
		height: 8px;
		border-radius: 8px;
		background: rgb(255,239,0);
		display: block;
		position: absolute;
		top: 8px;
		right: 15px;
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
			width: 80px;
			height: 80px;
			border-radius: 80px;
			margin-left: 20px;
		} 
		.user_login{
			margin-left: 20px;
		} 
		.icon-code {
			display: block;
		}  
		.right{
			float: right;
			margin: 10px 15px;
		} 
		.mine-component {
			.top {
				height: 120px;
				width: 100%;				
				color: #fff;
			}
			.flex-item {
				padding: 15px;
				background: #fff;
			}
			.icon-code {
				transform: scale(0.7);				
			}
			.item-list {
				background: #fff;
				margin-top: 10px;
			}
			.is-link {
				background: url("/thz/static/href.png") scroll 94% 50% no-repeat;
				background-size: 20px auto;
			}
			.li-item {
				padding: 12px 0;
				position: relative;
				&:after {
					content: "";
					position: absolute;
					height: 1px;
					width: 100%;
					left: 0;
					bottom: 0;
					background: #ccc;
					transform: scaleY(0.1);
				}
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
		}
		// 换钱样式
		.pawn-component {
			.card {
				border-bottom: 1px solid #F2F2F2;
				margin-bottom: 4px;
				.card-title {
					padding: 10px;
					border-bottom: 1px solid #F2F2F2;
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
			letter-spacing: 1px;
		}
	}

</style>