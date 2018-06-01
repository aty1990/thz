<template>
	<transition name="move">
		<div class="dropout page-animate">
			<v-header>
				<mt-header title="安全设置">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="item-list">
				<div class="flex li-item">
					<span class="grow is-link" v-tap="{methods : toRouter,params:'/makepwd'}">修改登录密码</span>
				</div>
			</div>
			<!-- <div class="button-wrap mgt-20" >
			   	<mt-button type="primary" size="large" :disabled="btn2State" @click="dropout">退出登录</mt-button> 
			</div> -->
			<router-view/>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api.js'
	import axios from 'axios'
	export default {
		name: 'dropout',
		components: {
			VHeader
		},
		data() {
			return {
				btn2State: false
			}
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			toRouter(e){
                this.$router.push(e.params);
            },
			dropout() {
			   	window.location.href='${project.domain}/sigOut';
			}
		}
	}
</script>
<style lang="scss">
	.dropout {
		background: #f1f1f1;
		.item-list {
			background: #fff;
		}
		.is-link {
			margin-left: 10px;
			background: url("/thz/static/href.png") scroll 94% 50% no-repeat;
			background-size: 20px auto;
		}
		.li-item {
			padding: 15px 0;
			position: relative;
			&:after {
				content: "";
				position: absolute;
				height: 1px;
				width: 100%;
				left: 0;
				bottom: 0;
				background: #ccc;
				transform: scaleY(0.1);
			}
		}
	}
</style>