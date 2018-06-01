<template>
	<transition name="move">
		<div class="page-animate jpfq-detail-page">
		 	<v-header>
	            <mt-header title="分期介绍">
	                <div slot="left">
	                    <mt-button icon="back" @click.native="toBack"></mt-button>
	                </div>
	            </mt-header>
	        </v-header>	
	        <div class="wrapper">
	        	<div @click="ljzx">
	        		<img src="/thz/static/banner-fqjs.png" width="100%"/>
	        	</div>
	        	<div>
	        		<p class="flex line-height-30 mgt-10 mgb-10"><span class="title font-size-14">早分期&nbsp;&nbsp;早享受</span></p>
	        		<ul>
	        			<li class="flex item text-left">
	        				<span class="flex pd-all-10"><img src="/thz/static/1@2x.png" width="40" class="mgl-6"></span>
	        				<span class="flex vertical pdl-10 pdr-10">
	        					<div class="grow pdt-10 pdb-6" style="width:100%;">
	        						<div  class="title-cls">先买单&nbsp;&nbsp;再还款</div>
	        					</div>
	        					<section class="gray-font-color">
	        						您支付成功后,会将该笔交易计入您的账单中，出账后您可操作还款
	        					</section>
	        				</span>
	        			</li>
	        			<li class="flex item text-left">
	        				<span class="flex pd-all-10"><img src="/thz/static/2@2x.png" width="40" class="mgl-6"></span>
	        				<span class="flex vertical pdl-10 pdr-10">
	        					<div class="grow pdt-10 pdb-6" style="width:100%;">
	        						<div class="title-cls">分期购买</div>
	        					</div>
	        					<section class="gray-font-color">
	        						分期购买，在您购买分期商品时，可以选择分期购买
	        					</section>
	        				</span>
	        			</li>

	        			<li class="flex item text-left">
	        				<span class="flex pd-all-10"><img src="/thz/static/3@2x.png" width="40" class="mgl-6"></span>
	        				<span class="flex vertical pdl-10 pdr-10">
	        					<div class="grow pdt-10 pdb-6" style="width:100%;">
	        						<div  class="title-cls">部分商品不支持分期</div>
	        					</div>
	        					<section class="gray-font-color" style="width:100%;">
	        						部分商品不支付分期
	        					</section>
	        				</span>
	        			</li>

	        			<li class="flex item text-left">
	        				<span class="flex pd-all-10"><img src="/thz/static/4@2x.png" width="40" class="mgl-6"></span>
	        				<span class="flex vertical pdl-10 pdr-10">
	        					<div class="grow pdt-10 pdb-6" style="width:100%;">
	        						<div  class="title-cls">可换钱</div>
	        					</div>
	        					<section class="gray-font-color">
	        						分期商品购买后，可进行转卖换钱
	        					</section>
	        				</span>
	        			</li>

	        			<li class="flex item text-left">
	        				<span class="flex pd-all-10"><img src="/thz/static/5@2x.png" width="40" class="mgl-6"></span>
	        				<span class="flex vertical pdl-10 pdr-10">
	        					<div class="grow pdt-10 pdb-6" style="width:100%;">
	        						<div  class="title-cls">在线咨询</div>
	        					</div>
	        					<section class="gray-font-color">
	        						如有问题，可联系微客服，在线咨询 <span class="link-text" @click="ljzx">立即咨询</span>
	        					</section>
	        				</span>
	        			</li>
	        		</ul>
	        	</div>
	        </div>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import {iosOrAndroid} from '@/assets/js/tool'
	export default {
		name: 'jpfq-page',
		components: { VHeader },
		data() {
			return {}
		},
        mounted(){
        	
        },
		methods: {
			toBack(){
				this.$router.back();
			},
			ljzx(){
				let _self = this;
				// 如果为苹果系统则直接打开链接，因为ios不支持iframe
				if(browser.versions.ios){
					if(sessionStorage.getItem("term")){
						iosOrAndroid("Open Page",{url:"http://w1.ttkefu.com/k/linkurl/?t=3G6JEI6"},false);
					}else{
						location.href = "http://w1.ttkefu.com/k/linkurl/?t=3G6JEI6";
					}
				}else{
					// 标识去联系客服的源
					sessionStorage.setItem("from","goods-detail"); 
					// 安卓直接跳路由
					_self.$router.push("/home/kefu");
				}
			}
		}
	}
</script>
<style scoped lang="scss">
	@import '../../assets/scss/mixin';
	.jpfq-detail-page{
		background:#fff;
		.wrapper{
			overflow-y: auto;
			background:url("/thz/static/footer-bg.png") left bottom no-repeat;
			background-size : 100%;
		}
		.item{
			position: relative;
			padding-bottom: px2rem(6);
			&:after{
				position: absolute;
				background: #D9D9D9;
				content: "";
				height: 1px;
				width: 98%;
				bottom: 0;
				right:0;
				z-index: 2;
				transform:scaleY(0.5); 
			}
		}
		.title{
			width:40%;
			text-align: center;
			position: relative;
			font-family: PingFangSC-Regular;
			color: #9198A3;
			&:before{
				position: absolute;
				content: "";
				width:px2rem(6);
				height: px2rem(6);
				background:#9399A5;
				border-radius: 50%;
				top:px2rem(10);
				right:px2rem(8);
				z-index: 2;
			}

			&:after{
				position: absolute;
				content: "";
				width:px2rem(6);
				height: px2rem(6);
				background:#9399A5;
				border-radius: 50%;
				top:px2rem(10);
				left:px2rem(8);
				z-index: 2;
			}
		}
		.link-text{
			color:#4290E3;
			text-decoration: underline;
		}
		.title-cls{
			font-family: PingFangSC-Regular;
			font-size: px2rem(14);
			color: #444444;
		}
		.gray-font-color{
			font-family: PingFangSC-Light;
			font-size: px2rem(10);
			color: #9198A3;
			line-height: px2rem(20);
		}
	}
</style>