<template>
	<transition name="move">
		<div class="makepwd page-animate">
			<v-header>
				<mt-header title="修改登录密码">
					<div slot="left">
						<mt-button icon="back" @click.native="toBack">返回</mt-button>
					</div>
				</mt-header>
			</v-header>
			<div class="input-box">			
				<div class="bk-input-wrap flex no-bottom-border" >
                    <input type="password" placeholder="需由6-20位数字、字母或符号组成，至少两种" v-model="newPwd"  @input="listenValue($event,'newPwd',20)">
                    <i class="icon-close" @click="clearText('newPwd')" v-show="newPwd.length>0"></i>
                    <i class="icon-view" @click="view('newPwd',$event)" v-show="newPwd.length>0"></i>
                </div>
				<div class="bk-input-wrap flex no-bottom-border" >
                    <input type="password" placeholder="请输入确认密码" v-model="repwd"  @input="listenValue($event,'repwd',20)">
                    <i class="icon-close" @click="clearText('repwd')" v-show="repwd.length>0"></i>
                    <i class="icon-view" @click="view('repwd',$event)" v-show="repwd.length>0"></i>
                </div>
				<div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btnState" @click="surepwd">确定</mt-button>
                </div>
			</div>
	    </div>
	</transition>		
</template>
<script>
	import {listenField} from '@/assets/js/tool'
	import VHeader from '@/components/header'
	import api from '@/fetch/api'
	import crypto from 'crypto'
	export default {
		name: 'makepwd',
		components: {VHeader},
		data() {
			return {
			   btnState :true,
			   newPwd : "",
			   repwd : "",
			   reg : ""
			}
		},
		mounted(){
			this.reg = this.$store.state.index.pwd_reg;
		},
		methods: {
			toBack() {
				this.$router.back();
			},			
			surepwd() {
				var _self = this;
				// 两次密码是否一致
				if(_self.newPwd!==_self.repwd){
					layer.open({
					    content: "两次输入的密码不一致"
					    ,skin: 'msg'
					    ,time: 2 
					});
				}else{
					let md5 = crypto.createHash("md5");
					md5.update(_self.newPwd)
					if(_self.newPwd.length<6){
						layer.open({
						    content: "密码请输入至少六位字符"
						    ,skin: 'msg'
						    ,time: 2 
						});
					}else{
						// 密码强度校验
						if(!_self.reg.test(_self.newPwd)){
							layer.open({
	                            content: "密码必须由字符、数字组成!"
	                            ,skin: 'msg'
	                            ,time: 3
	                        });
						}else{
							if(sessionStorage.getItem("term")){
								// 安卓端免密登录
			                    $.ajax({
			                        url: "/thz/user/modpwd",
			                        type: "post",
			                        data: {
										newPwd: md5.digest('hex'),
										userId: JSON.parse(localStorage.getItem("userInfo")).userId
									},
			                        headers: {    
			                            jhVer: "2.0.0",
			                            loginTerm : "wx",
			                            rand: Math.round(Math.random() * 89999) + 10000
			                        },
			                        beforeSend: function() {
			                            $("body").Loading("show");
			                        },
			                        complete: function() {
			                            $("body").Loading("hide");
			                        },
			                        success: function(res) {
		                                layer.open({
				                            content: res.msg
				                            ,skin: 'msg'
				                            ,time: 2,
				                            end : function(){
				                                if(res.code=="200"){
				                                	_self.$router.replace('/login');
				                                }
				                            }
				                        });
			                        }
			                    })
							}else{
								api.modpwd({
									newPwd: md5.digest('hex'),
									userId: JSON.parse(localStorage.getItem("userInfo")).userId
								}).then(res=>{
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
            // 监听必填字段是否已填写
	        listenValue(e,type,maxLen){
	        	let _self = this;
                if(_self[type].length >maxLen)_self[type]=_self[type].slice(0,maxLen);
	        	if(e.target.value.length>=6){
		            this.btnState = listenField([
	                    {value:_self.newPwd,type:"text"},
	                    {value:_self.repwd,type:"text"}
	                ]);
					//输出 true
	        	}else{
	        		this.btnState = true;
	        	}
	        }
		}
	}
</script>
<style lang="scss">
	.makepwd{
		.bk-input-wrap .label{
			min-width:70px;
		}
	}
</style>
