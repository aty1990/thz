<template>
	<transition name="move">
		<div class="page-follow page-animate">
			<v-header>
				<mt-header title="淘花宅">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper follow-box">
				<img src="/thz/static/follow1.jpg" width="100%"/>
			</div>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	export default {
		components: {VHeader},
		data() {
			return {}
		},
		methods: {
			toBack() {
				this.$router.back();
			}
		}
	}
</script>
<style lang="scss">
	.page-follow{
		.follow-box{
			overflow-y:auto; 
			bottom: -4px;
			background: #E42EFF;
		}
	}
</style>