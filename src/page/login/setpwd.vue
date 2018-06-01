<template>
	<transition name="move">
		<div class="find-pwd page-animate">
			<v-header>
				<mt-header title="设置密码">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="setpwd-box">
				<v-input :tabObj="inputObj"></v-input>
				<p class="pd-all-10 font-size-12">需由6-20位数字、字母或符号组成，至少两种</p>
				<div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btnState" @click="commit">提交</mt-button>
                </div>
			</div>
		</div>
	</transition>
</template>
<script>
	import VHeader from '@/components/header'
	import VInput from '@/components/input'
	import api from '@/fetch/api.js'
	import '@/assets/js/prng4'
    import '@/assets/js/rng'
    import '@/assets/js/jsbn'
    import '@/assets/js/base64'
    import r from '@/assets/js/rsa'
    import crypto from 'crypto'
     import { getCookie } from '@/assets/js/tool'
	export default {
		name: 'find-pwd',
		components: {VHeader,VInput},
		data() {
			return {
				password : "",
				inputObj:[{type : "password",
                    placeholder : "需由6-20位数字、字母或符号...",
                    icon : "icon-phone",
                    isCode : false
                }],
                btnState : true,
                reg : ""
			}
		},
		mounted() {
			var _self = this;
			this.reg = this.$store.state.index.pwd_reg;
			$("body").on("input",".setpwd-box input",function(){
				if(this.value.length>20){
					this.value = this.value.slice(0,19);
				}
				_self.btnState = this.value.length>=6?false:true
				_self.password = this.value;
			})

			$("body").on("click",".setpwd-box .icon-close",function(){
				_self.btnState = true;
			})
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			commit(){
				var _self = this;
				var phone = this.$store.state.index.account;
				// 密码强度校验
				if(!_self.reg.test(_self.password)){
					layer.open({
                        content: "密码必须由6-20位字符、数字组成!"
                        ,skin: 'msg'
                        ,time: 3
                    });
                    return;
				}
				var md5 = crypto.createHash("md5");
				md5.update(_self.password);
				let term = sessionStorage.getItem("term");
				// 安卓端注册
				if(term){
					let loginChannel = this.$route.query.loginChannel;
					$.ajax({
	                    url: "/thz/market/user/register",
	                    type: "post",
	                    data: {userMob:phone,userPwd:md5.digest('hex'),smsNum:_self.$route.query.smsNum},
	                    headers: {    
	                        jhVer: "2.0.0",
	                        loginTerm : term,
	                        loginChannel : loginChannel?loginChannel:"",
	                        rand: Math.round(Math.random() * 89999) + 10000
	                    },
	                    beforeSend: function() {
	                        $("body").Loading("show");
	                    },
	                    complete: function() {
	                        $("body").Loading("hide");
	                    },
	                    success: function(res) {
	                        if (res.code == "200") {
	                            layer.open({
								    content: "注册成功"
								    ,skin: 'msg'
								    ,time: 2,
								    end : function(){
								    	if(res.code=="200"){
								    		_self.$router.replace("/home");
								    	}
								    }
								});
	                        } else {
	                            layer.open({
	                                content: res.msg
	                                ,skin: 'msg'
	                                ,time: 2 
	                            });
	                        }
	                    }
	                })	
				}else{
					// 微信端注册
					api.register({userMob:phone,userPwd:md5.digest('hex')}).then(res=>{
						layer.open({
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2,
						    end : function(){
						    	if(res.code=="200"){
						    		window.location.href= location.origin+'/thz/index';
						    	}
						    }
						});
					})
				}
			}
		}
	}
</script>
<style></style>