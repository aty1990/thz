<template>
	<transition name="move">
		<div class="find-pwd page-animate">
			<v-header>
				<mt-header title="忘记密码">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="input-box findpwd-wrap">
				<div class="bk-input-wrap flex no-bottom-border" >
					<input type="tel" placeholder="请输入手机号码" v-model="phone" class="icon-phone">
	                <i class="icon-close" @click="clearText('phone')" v-show="phone.length>0"></i>
				</div>
				<p class="mgt-10 pdl-10 gray-font font-size-12">为了安全，我们会向你的手机发送验证码</p>
				<div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btn2State" @click="nextpwd">下一步</mt-button>
                </div>
			</div>
			<router-view />
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import * as utils from '@/assets/js/tool'
	import api from '@/fetch/api'
	export default {
		name: 'find-pwd',
		components: {VHeader},
		data() {
			return {
			  btn2State :true,
			  phone : ""
			}
		},
		mounted() {
			var _self = this;
			$("body").on("input",".findpwd-wrap input",function(){
				_self.btn2State = !utils.checkPhone(this.value);
			});
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			nextpwd(){
				let _self = this;
				api.mobver({userMob : this.phone }).then(res=>{
					if(res.code=="500"){
						sessionStorage.setItem("phone",_self.phone);
						_self.$router.push({name:"forgetpwd"});
					}else if(res.code=="401"){
                        location.href = "https://m.vjiehu.com/jiehu/product/html/market.html";
                    }else{
						layer.open({
						    content: res.body
						    ,skin: 'msg'
						    ,time: 2,
						    end : function(){
						    	_self.$router.back();
						    }
						});
					}
				})
			},
			clearText(text){
				this[text] = "";
				this.btn2State = true;
			}
		}
	}
</script>
<style lang="scss">
.find-pwd{
	background: #fff;
	.input-box{
		width:100%;
		.input-phone{
		   border: 1px solid #f1f1f1;
	    }
	}	
}
</style>