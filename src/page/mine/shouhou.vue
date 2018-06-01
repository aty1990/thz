<template>
	<transition name="move">
		<div class="page-shouhou page-animate">
			<v-header>
				<mt-header title="售后客服">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="shouhou-word">
				<iframe src="http://free.weikefu.net/AppKeFu/weikefu/web/chat.php?wg=taohuazkf&robot=false&hidenav=true" frameborder="no"></iframe>
			</div>			
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	export default {
		name: 'page-shouhou',
		components: {VHeader},
		data() {
			return {}
		},
		methods: {
			toBack() {
				this.$router.replace("/home");
			}
		}
	}
</script>
<style lang="scss">
	.page-shouhou{
		width: 100%;
			height: 100%;
	    .shouhou-word{
	    	width: 100%;
			height: 100%;
	    }
		iframe{
			width: 100%;
			height: 93%;
		}
	}

</style>



