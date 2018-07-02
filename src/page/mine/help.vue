<template>
	<transition name="move">
		<div class="page-animate page-help">
			<v-header>
				<mt-header title="帮助中心">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper">
				<div class="bg-white">
					<p class="title">问题类型</p>
					<div class="flex pd-all-10">
						<section class="flex grow question-item mgr-10" @click="toRouter('/home/help/shoppingmall')">
							<img src="/thz/static/icon-sc@2x.png" width="20" />
							<span class="mgl-6">商城问题</span>
						</section>
						<section class="flex grow question-item"  @click="toRouter('/home/help/stages')">
							<img src="/thz/static/icon-fqg@2x.png" width="20" />
							<span class="mgl-6">分期购问题</span>
						</section>
					</div>
				</div>
				<div class="mgt-10 bg-white hot-wrap">
					<p class="title">热门问题</p>
					<div class="dlst smll-50 fl" v-for="hot in hotData">
						<dl data-sdlder="helplist">
							<dt><span class="glyphicon"></span>Q:{{hot.problemDesc}}</dt>
							<dd style="display: none;">
								<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;" v-html="hot.problemAnswer"></p>					
							</dd>
						</dl>
					</div>
				</div>
				<footer class="flex vertical fixed-bottom-wrap" v-if="hasData">
					<span>客服电话：<a href="tel:400-0970-503">400-0970-503</a></span>
					<div class="flex mgt-6" @click="tokefu">
						<span class="flex hasborder"><img src="/thz/static/icon-kefu@2x.png" width="16" class="mgr-6" /><span>在线客服</span></span>
					</div>
				</footer>
				<router-view />
			</div>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api'
	export default {
		name: 'help',
		components: {VHeader},
		data() {
			return {
				hotData : [],
				hasData : false
			}
		},
		mounted() {
			let _self = this;
			api.getHelpCenter({}).then(res=>{
				if(res.code=="200"){
					_self.hotData = res.body.hotList;
					_self.$nextTick(()=>{
						_self.hasData = true;
						$(".hot-wrap .href-help").addClass("active");
			          	let helplist = $(".hot-wrap [data-sdlder=helplist]");
						let collspe = function() {};
						collspe.prototype.toggle = function(o) {
							if(o.hasClass('active')) {
								return o.toggleClass("active").find("dd").slideUp();
							};
							helplist.removeClass("active").find("dd").slideUp();
							o.toggleClass("active").find("dd").slideDown();
						};
						helplist.click(function() {
							collspe.prototype.toggle($(this));
						});

						helplist.eq(0).trigger("click");
					});
				}else{
					layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2
                    });
				}
			})
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			toRouter(url){
				this.$router.push(url);
			},
			tokefu(){
				sessionStorage.from = "goods-detail";
				this.$router.push("/home/help/kefu");
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/mixin';
    @import '../../assets/scss/color'; 
	.page-help{
		background-color: #fff;
		.question-item{
			height: 70px;
			background-color: red;
		}	
		.question-item:nth-child(1){
			background: url("/thz/static/bg-sc@2x.png") no-repeat;
			background-size:100% 100%;
		}
		.question-item:nth-child(2){
			background: url("/thz/static/bg-fq.png") no-repeat;
			background-size:100% 100%;
		}
		.title{
            padding: 10px 15px;
            padding-left: px2rem(20);
            font-family: PingFangSC-Regular;
            font-size: px2rem(14);
            color: #333333;
            position: relative;
            &:before{
                content:"";
                position: absolute;
                width: px2rem(2);
                height: px2rem(16);
                background-color: $theme-bg-color;
                left:10px;
                top:10px;
            }
        }
        .bg-white{
        	background-color: #fff;
        }

        dt{
			border-bottom: 0;
			padding: 14px 20px 14px 0;
			background: url(/thz/static/icon_moredowm@2x.png) right no-repeat;
			background-size: 20px 20px;
			margin-left: 20px;
			margin-right: 20px;
		}
		
		dl {
			position: relative;
			background: #fff;
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
		
		dl.active {
			border-bottom: 0;
		}
		
		dl.active dt {
			background: url(/thz/static/up1@2x.png) right no-repeat;
			background-size: 20px 20px;
			
		}
		
		dd {
			color: rgb(74, 144, 226);
			background: #fafafa;
		}

		.fixed-bottom-wrap{
			width: 100%;
			padding-bottom: 10px;
			line-height: 22px;
			color:#69A5E5;
			margin-top:10px;
		}
		a{
			color:#69A5E5;
		}
		.hasborder{
			border:1px solid #69A5E5;
			padding: 2px 10px;
			border-radius: 20px;
		}
		.wrapper{
			overflow-y: auto;
		}

	}
</style>



