<template>
	<transition name="move">
		<div class="aboutus page-animate">
			<v-header>
				<mt-header title="关于我们">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="aboutus-word">
				<p class="flex mgb-40"><img src="/thz/static/logo@2x.png" alt="" width="80"></p>
				<div class="text-desc">
					淘花宅是杭州柏阔科技有限公司旗下专注于个人智能信贷服务及借贷问答社区的移动互联网金融平台。凭借致力践行“体感金融”，始终秉承“最好的金融有温度”的经营理念，依托大数据、云计算等金融科技前沿技术，用科技缩短人与金融服务等距离，释放信用价值，用问答社区连接信贷精英，赋予每一个借我用户平等、极速、联结的新型移动借贷体验。
				</div>
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
			}
		},
		mounted() {

		},
		methods: {
			toBack() {
				this.$router.back();
			}
		}
	}
</script>
<style lang="scss">
.aboutus{
	background: #fff;
	.aboutus-word{
		width: 90%;
		margin-left: 5%;
		font-size:15px;
		color:#333;
		
		text-indent:20px;
		line-height:30px;
		letter-spacing: -0.36px;
		margin-top: 57px;
		font-size: 14px;

		.text-desc{
			text-indent: 2em;
			text-align:justify;
		}
	}
}
</style>


