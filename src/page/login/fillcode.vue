<template>
	<transition name="move">
		<div class="dropout page-animate">
			<v-header>
				<mt-header title="手机注册">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="wrapper fillcode-wrap">
				<h3 class="pd-all-10 mgt-10">您的手机号码:{{phone}}</h3>
				<span class="pdl-10 gray-font">请输入接收到的短信验证：</span>
				<div class="bk-input-wrap flex mgt-10" >
					<input type="tel" placeholder="请输入验证码" v-model="code" @input="listenValue(6)" >
	                <div class="get-code" @click="getCode">{{codeText}}</div>
				</div>
				<div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="nextBtn" @click="nextFn">下一步</mt-button>
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
	import '@/assets/js/prng4'
	import '@/assets/js/rng'
	import '@/assets/js/jsbn'
	import '@/assets/js/base64'
	import r from '@/assets/js/rsa'
	export default {
		components: {
			VHeader
		},
		data() {
			return {
				nextBtn: true,
				codeText : "获取验证码",
                time : 60,
			  	timer : "",
			  	code : "",
				phone : ""
			}
		},
		mounted(){
			this.phone = this.$route.query.phone;
			// 如果是安卓
			if(sessionStorage.getItem("term")){
				$(".get-code").css("top","17px");
			}
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			listenValue(maxLen){
				let _self = this;
				if(this.code.length>maxLen)this.code=this.code.slice(0,maxLen);
				this.nextBtn = listenField([
					{value:_self.phone,type:"phone"},
					{value:_self.code,type:"text"}
				]);
			},
			nextFn() {
				var _self = this;
				var sms = $(".fillcode-wrap input").val();
				if(sms){
					api.verifications({userMob:_self.phone,smsNum:sms}).then(res=>{
						if(res.code=="200"){
							_self.$store.state.index.account = _self.phone;
							this.$router.push({
								name:"loginToSetpwd",
								query :{
									smsNum : sms
								}
							});
						}else if(res.code=="401"){
							location.href = "https://m.vjiehu.com/jiehu/product/html/market.html";
						}else{
							layer.open({
							    content: res.msg
							    ,skin: 'msg'
							    ,time: 2 
							});
						}
					})
				}
			},
			getCode(){
            	let _self = this;
            	if(_self.time==60){
            		this.sendCode();
            	}
            },
            sendCode(){
            	let _self = this;
            	let rsa = new r.RSAKey();
				rsa.setPublic(_self.$store.state.index.regSecKey, '10001');
				let tel=r.linebrk(hex2b64(rsa.encrypt(_self.phone)), 64);	

				let tempId = "10000"; // 发送验证码时的判断 10000表示注册时的值  10001表示忘记密码的值

				api.sendcode({userMob:tel,tempId:tempId}).then(res=>{
					if(res.code=="200"){
						layer.open({
						    content: "验证码已发送"
						    ,skin: 'msg'
						    ,time: 2 
						});
						_self.timer = setInterval(function(){
		                    _self.time--;
		                    _self.codeText = "重新发送("+_self.time+")";
		                    if(_self.time==0){
		                        _self.codeText = "重新发送";
		                        clearInterval(_self.timer);
		                        _self.time = 60;
		                    }
		                },1000)
					}else{
						layer.open({
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2 
						});
					}
				})
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
		.get-code{
			top:15px;
		}
	}
</style>