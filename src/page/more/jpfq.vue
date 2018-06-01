<template>
	<transition name="move">
		<div class="page-animate jpfq-page">
		 	<v-header>
	            <mt-header title="精品分期">
	                <div slot="left">
	                    <mt-button icon="back" @click.native="toBack">返回</mt-button>
	                </div>
	            </mt-header>
	        </v-header>	
	        <vue-better-scroll class="wrapper" >
		        <div class="broadcast" @click="goBanner(jxhd_banners.bannerLinkUrl)">
		        	<a href="javascript:;"><img :src="jxhd_banners.bannerPicUrl" width="100%"></a>
		        </div>
		        <p class="title flex">
		        	<span class="grow flex " :class="{'active':active==0}" @click="all">综合</span>
		        	<span class="grow flex" :class="{'active':active==1}" @click="goodsSales">销量<i class="scale-7" :class="{'icon-down':goodsSalesFlag=='down','icon-up':goodsSalesFlag=='up'}"></i></span>
		        	<span class="grow flex" :class="{'active':active==2}" @click="goodsAmount">价格<i class="scale-7" :class="{'icon-down':goodsAmountFlag=='down','icon-up':goodsAmountFlag=='up'}"></i></span>
		        	<span class="grow flex" :class="{'active':active==3}" @click="isNew">新品</span>
		        </p>
		        <div class="home-component flex">
					<div class="goods-item" v-for="goods in loan_goods" @click.stop="toGoodDetail(goods)" >
						<div class="pdt-20 pdb-10 min-he-100">
							<img v-lazy="goods.goodsPicurl" width="90%" style="margin-left: 5%;">
						</div>
						<h5 class="text-deal">{{goods.goodsName}}</h5>
						<div class="price">￥{{goods.goodsAmount}}</div>
					</div>
				</div>	
	        </vue-better-scroll>
			
			<div class="full-page" v-show="sendcode">
                <div class="mask" @click.stop="closePop"></div>
                <div class="content-wrap"> 
                    <header class="flex font-size-16 bold pd-all-10">温馨提示</header>
                    <div class="content">
                    	分期商品下单审核通过后，提供二手回收平台,估价金额100%提前支付
                    </div>
                    <p class="flex mgt-10 mgb-20"><span class="link-text" @click="lookDetail">查看详情</span></p>
                    <footer class="mgt-10">
	                    <mt-button type="primary" size="large" class="font-size-14" @click="ok">我知道了</mt-button>
	                </footer>
                </div>
            </div>
            <router-view />
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import VueBetterScroll from 'vue2-better-scroll' 
	import api from '@/fetch/api'
	export default {
		name: 'jpfq-page',
		components: { VHeader,VueBetterScroll },
		data() {
			return {
				active : 0,
				loan_goods : [],
				goodsSalesFlag : "up",
				goodsAmountFlag : "up",
				sendcode : false,
				sortparam : "",
				sorttype : "asc",
				jxhd_banners : {},
				isnew : ""
			}
		},
        mounted(){
        	this.initData();
        },
		methods: {
			initData(){
				// 获取当前日期，用于判断进入该页面的时间是否是重复进入
	        	if(localStorage.msec){
	        		let day = (new Date()).getDate();
	        		if(day!=Number(localStorage.msec)){
	        			this.sendcode = true;
	        			localStorage.msec = day;
	        		}
	        	}else{
	        		localStorage.msec = (new Date()).getDate();
	        		this.sendcode = true;
	        	}
	        	this.getData();
			},
			getData(){
				let params = {
	        		type : "1",								//1.精品分期(分期商品)2.精选活动(非分期商品)3.猜你喜欢(商品销量倒序)
	        		sortparam : this.sortparam,				// 排序字段 综合：默认不传 ， 销量：“goods_sales”， 价格：“goods_amount”
	        		sorttype : this.sorttype,				// 顺序：升序“asc”降序“desc”
	        		is_new : this.isnew,					// 是否新品 0：否，1：是
	        		page : 1,
	        		size : 100,
	        		is_banner : "1"
	        	}
	        	// 首页 / 首页--类型筛选
	        	api.indexGoodsPage(params).then(res=>{ 
	        		if(res.code=="200"){
	        			this.jxhd_banners = res.body.jpfq_banners[0];
	        			this.loan_goods = res.body.page.data;
	        		}else{
	        			layer.open({
		                    content: res.msg
		                    ,skin: 'msg'
		                    ,time: 3
	                    });
	        		}
	        	});
			},
			toBack(){ 
				this.$router.back();
			},
			closePop(){
				this.sendcode = false;
			},
			ok(){
				this.sendcode = false;
			},
			lookDetail(){
				this.sendcode = false;
				this.$router.push("/home/jpfq/detail");
			},
			goBanner(rou){
				this.$router.push(rou.slice(rou.indexOf("jpfq")));
			},
			toGoodDetail(goods){
				// 将goodsId存入sessionStorage,防止路由刷新参数丢失
				sessionStorage.setItem("goodsId",goods.goodsId);
				localStorage.setItem("goodsId",goods.goodsId);
				this.$router.push({
					name : "jpfq-goods-detail",
					query : {
						goodsId : goods.goodsId
					}
				});
			},
			// 销量排序
			goodsSales(){
				this.active = 1;
				this.sortparam = "goods_sales";
				this.sorttype = this.goodsSalesFlag=="down"?"asc":"desc";
				this.goodsSalesFlag = this.goodsSalesFlag=="up"?"down":"up";
				this.isnew = "";
				this.goodsAmountFlag = "up";
				this.getData();
			},
			// 价格排序
			goodsAmount(){
				this.active = 2;
				this.sortparam = "goods_amount";
				this.sorttype = this.goodsAmountFlag=="down"?"asc":"desc";
				this.goodsAmountFlag = this.goodsAmountFlag=="up"?"down":"up";
				this.goodsSalesFlag = "up";
				this.isnew = "";
				this.getData();
			},
			isNew(){
				this.active = 3;
				this.isnew = "1";
				this.goodsAmountFlag = "up";
				this.goodsSalesFlag = "up";
				this.getData();
			},
			all(){
				this.active = 0;
				this.isnew = "";
				this.sortparam = "";
				this.goodsAmountFlag = "up";
				this.goodsSalesFlag = "up";
				this.sorttype = "desc";
				this.getData();
			}
		}
	}
</script>
<style scoped lang="scss">
	@import '../../assets/scss/mixin';
	.jpfq-page{
		background:#fff;
		.home-component {
			flex-wrap: wrap;
			justify-content: flex-start;
			background:#fff;
		}
		.title{
			padding: px2rem(16) 0;
			background:#fff;
			position: relative;
			margin-bottom: px2rem(10);
			&:after{
				position: absolute;
				background: #D9D9D9;
				content: "";
				height: 1px;
				width: 100%;
				bottom: 0;
				right:0;
				z-index: 2;
				transform:scaleY(0.5); 
			}
		}
		.broadcast{
			font-size:0;
		}
		.active{
			color: #F64F53;
		}

		.full-page{
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            overflow:hidden;
            z-index:1000;
            .content-wrap{
                width:80%;
                height:px2rem(250);
                background:#fff;
                position: absolute;
                top:50%;
                margin-top:px2rem(-125);
                margin-left:10%;
                z-index:1001;
                border-radius:px2rem(4);
                padding:px2rem(10);
            }
            .content{
                line-height: px2rem(30);
                text-align: center;
                padding: 0 px2rem(10);
            }
            .code-btn{
                border:none;
                background:transparent;

            }
            .mask{
                opacity:0.7;
            }
            .link-text{
				color:#4290E3;
				text-decoration: underline;
            }
        }

	}
</style>