<template>
	<transition name="silde">
		<div class="page-animate page-stages">
			<v-header>
				<mt-header title="分期购问题">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper">
				<div class="dlst smll-50 fl" v-for="shop in repaymentList">
					<dl data-sdlder="helplist">
						<dt><span class="glyphicon"></span>Q:{{shop.problemDesc}}</dt>
						<dd style="display: none;">
							<p style="width: 90%;margin-left: 5%;line-height: 22px;padding:5px 0;" v-html="shop.problemAnswer"></p>					
						</dd>
					</dl>
				</div>
				<footer class="flex vertical fixed-bottom-wrap"  v-if="hasData">
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
				repaymentList : [],
				hasData : false
			}
		},
		mounted() {
			let _self = this;
			api.getHelpCenter({}).then(res=>{
				if(res.code=="200"){
					_self.repaymentList = res.body.repaymentList;
					_self.$nextTick(()=>{
						_self.hasData = true;
						$(".page-stages .href-help").addClass("active");
			          	let helplist = $(".page-stages [data-sdlder=helplist]");
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
			tokefu(){
				sessionStorage.from = "goods-detail";
				this.$router.push("/home/stages/kefu");
			}
		}
	}
</script>
<style lang="scss">
	@import '../../assets/scss/mixin';
    @import '../../assets/scss/color'; 
	.page-stages{
		background: #fff; 
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



