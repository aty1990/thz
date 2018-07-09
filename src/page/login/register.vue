<template>
	<transition name="move">
		<div class="register-page page-animate">
			<v-header>
				<mt-header title="手机注册">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack"></mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper register-wrap">
				<div class="bk-input-wrap flex no-bottom-border" >
					<input type="tel" placeholder="请输入手机号" v-model="phone"  @input="listenValue(11)" id="registerNumber"  class="icon-phone">
	                <i class="icon-close" @click="clearText('phone')" v-show="phone.length>0"></i>
				</div>
				<p class="mgt-10 pdl-10 gray-font font-size-12">为了安全，我们会向你的手机发送验证码</p>
				<div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="nextBtn" @click="nextFn">下一步</mt-button>
                    <p class="mgt-6 gray-font font-size-12 has-check-icon">本人已阅读并同意
                    	<span class="xy"  @click="xyfn">注册协议</span>
                    </p>
                </div>
				<router-view />
			</div>
		</div>
	</transition>
</template>
<script>
	import {listenField} from '@/assets/js/tool'
	import VHeader from '@/components/header'
	import api from '@/fetch/api'
	
	export default {
		components: {
			VHeader
		},
		data() {
			return {
				nextBtn: true,
				phone : ""
			}
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			nextFn() {
				var _self = this;
				api.mobver({userMob : this.phone }).then(res=>{
					if(res.code == '500') {  
						layer.open({
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2,
						    end : function(){
						    	_self.toBack();
						    }
						});
					}else if(res.code=="401"){
                        location.href = "https://go.vjiehu.com/go/index.html#/home?page=2";
                    }else{
						_self.$router.push({
							name:"fillCode",
							query:{
								phone : _self.phone
							}
						});
					}
				})
			},
			listenValue(maxLen){
				var _self = this;
				if(this.phone.length>maxLen)this.phone=this.phone.slice(0,maxLen);
				this.nextBtn = listenField([
					{value:_self.phone,type:"phone"}
				]);
			},
			xyfn(){
				$("#registerNumber").blur();
				this.$router.push({name:"xy"});
			},
			clearText(text){
                this[text] = "";
                this.nextBtn = true;
            }
		}
	}
</script>
<style lang="scss">
	.register-page {
		background: #f1f1f1;
		.item-list {
			background: #fff;
		}
		.is-link {
			background: url("/thz/static/href.png") scroll 98% 50% no-repeat;
			background-size: 20px;
			margin-left: 10px;
		}
		.li-item {
			padding: 10px 0;
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
		.has-check-icon{
			background: url("/thz/static/icon_duihao@2x.png") scroll 0% 35% no-repeat;
			background-size: 14px;
			padding: 5px 0 5px 20px;

			.xy{
				color:#90ADDB;
				padding-left: 2px;
			}
		}
	}
</style>