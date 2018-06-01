<template>
	<transition name="move">
		<div class="forget-pwd page-animate">
			<v-header>
				<mt-header title="忘记密码">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="input-box">
				<p class="pdl-10 gray-font font-size-12 mgb-10">已向手机号<span class="phone-cls font-size-14">{{phone}}</span>发送短信验证码</p>
				<div class="bk-input-wrap flex" >
					<input type="number" placeholder="请输入验证码" v-model="code" @input="listenValue($event,'code',6)" >
	                <div class="get-code mgt-4"  @click="getCode">{{codeText}}</div>
				</div>
				<div class="bk-input-wrap flex no-bottom-border" >
					<input type="password" placeholder="设置新密码" v-model="password"  @input="listenValue($event,'password',20)">
	                <i class="icon-close" @click="clearText('password')" v-show="password.length>0"></i>
	                <i class="icon-view" @click="view('password',$event)"  v-show="password.length>0"></i>
				</div>
				<span class="pdl-10 gray-font font-size-12 line-32">需由6-20位数字、字母或符号组成，至少两种</span>
				<div class="button-wrap mgt-10">
                    <mt-button type="primary" size="large" :disabled="commitBtn" @click="commit">提交</mt-button>
                </div>
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
	import crypto from 'crypto'
	export default {
		components: {VHeader},
		data() {
			return {
			  	commitBtn :true,
                codeText : "获取验证码",
                time : 60,
			  	timer : "",
			  	code : "",
			  	phone : "--",
              	password : "",
              	reg :""
			}
		},
		mounted() {
			var _self = this;
			this.phone = sessionStorage.getItem("phone");
			this.reg = this.$store.state.index.pwd_reg;
		},
		methods: {
			toBack() {
				this.$router.back();
			},
			commit(){
				let _self = this;
				// 密码强度校验
				if(!_self.reg.test(_self.password)){
					layer.open({
                        content: "密码必须由6-20位字符、数字组成!"
                        ,skin: 'msg'
                        ,time: 3
                    });
                    return;
				}
				let md5 = crypto.createHash("md5");
				md5.update(_self.password);
				api.resetpwd({userMob:this.phone,userPwd:md5.digest('hex'),verCode:_self.code}).then(res=>{
					if(res.code=="200"){
						layer.open({
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2,
						    end:function(){
						    	_self.$router.go(-2);
						    }
						});
					}else{
						layer.open({
						    content: res.msg
						    ,skin: 'msg'
						    ,time: 2
						});
					}
				})
			},
			// 监听必填字段是否已填写
			listenValue(e,type,maxLen){
				let _self = this;
				if(_self[type].length >maxLen)_self[type]=_self[type].slice(0,maxLen);
				this.commitBtn = listenField([
					{value:_self.phone,type:"phone"},
					{value:_self.code,type:"text"},
					{value:_self.password,type:"text"}
				]);
			},
			clearText(text){
				this[text] = "";
			},
			view(text,e){
				let target = $(e.target);
				if(target.hasClass('icon-view')){
					$(e.target).prev().prev().attr("type","text");
					$(e.target).addClass('icon-preview').removeClass('icon-view');
				}else{
					$(e.target).prev().prev().attr("type","password");
					$(e.target).removeClass('icon-preview').addClass('icon-view');
				}
            },
            getCode(){
            	let _self = this;
            	if(_self.time<60) return;
                this.sendCode();
            },
            sendCode(){
            	let _self = this;
            	let rsa = new r.RSAKey();
				rsa.setPublic(_self.$store.state.index.regSecKey, '10001');
				let tel=r.linebrk(hex2b64(rsa.encrypt(_self.phone)), 64);	
				let tempId = "10001";  // 发送验证码时的判断 10000表示注册时的值  10001表示忘记密码的值
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
	.forget-pwd{
		.input-box{
			margin-top:20px;
			.input-phone{
			   border: 1px solid #f1f1f1;
		    }
		}	
		.clear{
			clear: both;
		}
		.line-32{
			line-height: 32px;
		}
		.phone-cls{
			color:#79A6D4;
			margin: 0 5px;
		}
        .no-bottom-border{
        	border:none;
        }
	}
</style>