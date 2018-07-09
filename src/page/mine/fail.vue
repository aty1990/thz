<template>
	<transition name="move">
		<div class="aboutus page-animate">
			<v-header>
				<mt-header title="我的资料">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div  class="flex mgt-80 vertical">
					<img src="/thz/static/pic_wujilu@2x.png" width="100">
					<p class="mgt-20 gray-font">您的资料未通过审核</p>
				</div>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api.js'
	import {getCookie} from '@/assets/js/tool'
	export default {
		name: 'progress-word',
		components: {VHeader},
		data() {
			return {
				
			}
		},
		mounted() {
          this.initData(); 
		},
		methods: {
			initData(){								
			},
			toBack() {
				this.$router.push({path: '/home'})
			}
		}
	}
</script>
<style lang="scss">

</style>

