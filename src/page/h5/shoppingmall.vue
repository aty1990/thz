<template>
	<transition>
		<div class="page-animate page-shopping">
			<div class="wrapper top0">
				<div class="dlst smll-50 fl" v-for="shop in shopList">
					<dl data-sdlder="helplist">
						<dt><span class="glyphicon"></span>Q:{{shop.problemDesc}}</dt>
						<dd style="display: none;">
							<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;">{{shop.problemAnswer}}</p>					
						</dd>
					</dl>
				</div>
				<footer class="flex vertical fixed-bottom-wrap">
					<span>客服电话：<a href="tel:400-0970-503">400-0970-503</a></span>
					<div class="flex mgt-6" @click="tokefu">
						<span class="flex hasborder"><img src="/thz/static/icon-kefu@2x.png" width="16" class="mgr-6" /><span>在线客服</span></span>
					</div>
				</footer>
			</div>
			<router-view />
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
				shopList : []
			}
		},
		mounted() {
			let _self = this;
			api.getHelpCenter({}).then(res=>{
				_self.shopList = res.body.shopList;
				_self.$nextTick(()=>{
					$(".page-shopping .href-help").addClass("active");
		          	let helplist = $(".page-shopping [data-sdlder=helplist]");
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
			})
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			tokefu(){
				location.href="http://w1.ttkefu.com/k/linkurl/?t=3G6JEI6";
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/mixin';
    @import '../../assets/scss/color'; 
	.page-shopping{
		.top0{
			top:0;
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
			position: fixed;
			width: 100%;
			bottom:0;
			left:0;
			padding-bottom: 10px;
			line-height: 22px;
			color:#69A5E5;
		}
		.hasborder{
			border:1px solid #69A5E5;
			padding: 2px 10px;
			border-radius: 20px;
		}

	}
</style>



