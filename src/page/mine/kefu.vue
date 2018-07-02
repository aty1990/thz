<template>
	<transition name="move">
		<div class="aboutus page-animate">
			<v-header v-show="flag">
				<mt-header title="联系客服">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="kefu-word">
				<iframe v-bind:src="kfLink" frameborder="no" id="kefu"></iframe>
			</div>			
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	export default {
		name: 'aboutus',
		components: {VHeader},
		data() {
			return {
				kfLink:"",
				flag : true
			}
		},
		mounted() {
			var _this=this;
			_this.kfLink=sessionStorage.kfLink?sessionStorage.kfLink:"http://w1.ttkefu.com/k/linkurl/?t=3G6JEI6";

			if(!browser.versions.weixin){
				this.flag = false;
				$("#kefu").css("height","100%");
			}
		},
		methods: {
			toBack() {
				var type = sessionStorage.getItem("from");
				if(type=="home"){
					this.$router.replace("/home");
				}else if(type=="orderdetail"){
					this.$router.replace({name:"orderDetail"}); 
				}else if(type=="pawndetail"){
					this.$router.go(-2);
				}else if(type=="goods-detail"){
					this.$router.go(-2);
				}
			}
		}
	}
</script>
<style lang="scss">
	.aboutus{
		width: 100%;
			height: 100%;
	    .kefu-word{
	    	width: 100%;
			height: 100%;
	    }
		iframe{
			width: 100%;
			height: 93%;
		}
	}

</style>



