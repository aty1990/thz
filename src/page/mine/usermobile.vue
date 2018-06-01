<template>
    <transition name="move">
        <div class="page-animate page-usermob">
            <v-header>
                <mt-header title="手机认证">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="tel tel-mob" style="height: 40px;display: none;">
			    <span  style="float: left;">{{tel.phoneNo}}</span>
				<span style="float: right;margin-right:10px;">(手机已认证)</span>
			</div>
            <div class="tel-show">
           	  <div class="tel">
           	  	<span>{{tel.phoneNo}}</span>
           	  </div>
           	  
           	  <div class="input-phone bk-input-wrap flex no-bottom-border input-servicePwd">
           	  	<input placeholder="请输入手机运营商服务密码"  type="password"  v-model="password1" @input="listenValue($event,'password1',8,'btn1State')"/>
           	    <i class="icon-close" @click="clearText('password1')" v-show="password1.length>0"></i>
                <i class="icon-view" @click="view('password1',$event)" v-show="password1.length>0"></i>
           	  </div>
			  <div class="input-phone bk-input-wrap flex no-bottom-border input-captcha">
           	  	<input placeholder="请输入短信验证码"  v-model="password2" @input="listenValue($event,'password2',8,'btn2State')"/>
           	    <i class="icon-close" @click="clearText('password2')" v-show="password2.length>0"></i>
                <i class="icon-view" @click="view('password2',$event)" v-show="password2.length>0"></i>
           	  </div>
           	  <div class="input-phone bk-input-wrap flex no-bottom-border input-queryPwd">
           	  	<input placeholder="请输入查询密码"  v-model="password3" @input="listenValue($event,'password3',8,'btn3State')"/>
           	    <i class="icon-close" @click="clearText('password3')" v-show="password3.length>0"></i>
                <i class="icon-view" @click="view('password3',$event)" v-show="password3.length>0"></i>
           	  </div>
				<div class="bottom">
			    	<p>友情提示：</p>
			    	<p style="margin-top: 5px;">1.请确保您的手机号已在官网注册并为本人实名认证；</p>
			    	<p>2.登录成功后，您将有可能收到多条运营商通知短信，无需回复。</p>
		        </div>
		        <div class="button-wrap mgt-20">
					<mt-button type="primary" class="servicePwd" size="large" :disabled="btn1State" @click="servicePwd">确定</mt-button>
					<mt-button type="primary" class="captcha" size="large" :disabled="btn2State" @click="captcha">确定</mt-button>
					<mt-button type="primary" class="queryPwd" size="large" :disabled="btn3State" @click="queryPwd">确定</mt-button>
				</div>
				<div style="text-align:center;"  v-tap="{methods : toRouter,params:'newpwd'}">
				  <a  class="userfindpwd">忘记密码？</a>
				</div>
            </div>
			 <router-view/>
        </div>
    </transition>
</template>

<script>
  
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    import {getCookie} from '@/assets/js/tool'
    export default {
        name: 'page-usermob',
        components: {VHeader},
        data () {
            return {
                btn1State : true,
                btn2State : true,
                btn3State : true,
                password1:"",
                password2:"",
                password3:"",
                tel:{
               	    phoneNo:""
                }
            }
        },        
        mounted(){
        	this.tel.phoneNo = localStorage.account;
        	if(sessionStorage.getItem("mobile") == "1"||sessionStorage.getItem("mobile") == "2"){
        		$(".tel-mob").show();
        		$(".tel-show").hide();
        	}
        },
        methods : {
        	// 监听必填字段是否已填写
            listenValue(e,type,maxLen,btn){
                let _self = this;
                if(_self[type].length >maxLen)_self[type]=_self[type].slice(0,maxLen);

                if(btn=="btn1State"){
                    this[btn] = _self.password1.length<6?true:false;
                }
                if(btn=="btn2State"){
                    this[btn] = _self.password2.length<6?true:false;
                }
                if(btn=="btn3State"){
                    this[btn] = _self.password3.length<6?true:false;
                }
            },
            toBack(){
                this.$router.back();
            },
			toRouter(e) {
				this.$router.push({
					name : e.params
				});
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
            servicePwd(){
            	let _this=this;
                _this.btn1State = true;
            	api.servicePwd({servicePwd:_this.password1 }).then(res=>{
            		// 输入验证码 100000
            		if(res.code == 100000){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                         end : function(){
	                        	$(".input-servicePwd").hide();
	                        	$(".servicePwd").hide();
	                        	$(".input-captcha").show();
	                        	$(".captcha").show();
	                        }
	                   });
            		}            		
                    // 重新请求 100001
                    if(res.code == 100001){
            			layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
            		}
                    // 采集请求失败，可能要稍候重试，或者第二天重试100002
                    if(res.code == 100002){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
                        _this.btn1State = false;
            		}
                    // 采集请求成功，认证成功100003
                    if(res.code == 100003){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
	                        	_this.$parent.loadData();
                                _this.toBack();
	                        }
	                    });
            		}
                    // 输入查询密码100004
                    if(res.code == 100004){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                         end : function(){
	                        	$(".input-servicePwd").hide();
	                        	$(".servicePwd").hide();
	                        	$(".input-captcha").hide();
	                        	$(".captcha").hide();
	                        	$(".input-queryPwd").show();
	                        	$(".queryPwd").show();
	                        }
	                    });
                        _this.btn1State = false;
            		}
                    // 重置手机服务密码失败，该地区或运营商不支持重置手机服务密码100005
                    if(res.code == 100005){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
                        _this.btn1State = false;
            		} 
            		if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _this.$router.push("/login")
                        }
                    }
            		if(res.code == "500"){
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
                        _this.btn1State = false;
					}
                   
                });
            },
            captcha(){
            	let _this=this;
                this.btn2State = true;
            	api.captcha({captcha:_this.password2 }).then(res=>{
            		// 输入验证码 100000
            		if(res.code == 100000){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                         end : function(){
	                        	$(".input-servicePwd").hide();
	                        	$(".servicePwd").hide();
	                        	$(".input-captcha").show();
	                        	$(".captcha").show();
	                        }
	                   });
            		}            		
                    // 重新请求 100001
                    if(res.code == 100001){
            			layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
            		}
                    // 采集请求失败，可能要稍候重试，或者第二天重试100002
                    if(res.code == 100002){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
            		}
                    // 采集请求成功，认证成功100003
                    if(res.code == 100003){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
	                        	_this.$parent.loadData();
                                _this.toBack();
	                        }
	                    });
            		}
                    // 输入查询密码100004
                    if(res.code == 100004){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                         end : function(){
	                        	$(".input-servicePwd").hide();
	                        	$(".servicePwd").hide();
	                        	$(".input-captcha").hide();
	                        	$(".captcha").hide();
	                        	$(".input-queryPwd").show();
	                        	$(".queryPwd").show();
	                        }
	                   });
            		}
                    // 重置手机服务密码失败，该地区或运营商不支持重置手机服务密码100005
                    if(res.code == 100005){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
            		}                    
                    if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _this.$router.push("/login")
                        }
                    }
            		if(res.code == "500"){
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
					}
                });
            },
            queryPwd(){
            	let _this=this;
                this.btn3State = true;
            	api.queryPwd({queryPwd:_this.password3}).then(res=>{
            		// 输入验证码 100000
            		if(res.code == 100000){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                         end : function(){
	                        	$(".input-servicePwd").hide();
	                        	$(".servicePwd").hide();
	                        	$(".input-captcha").show();
	                        	$(".captcha").show();
	                        }
	                   });
            		}            		
                    // 重新请求 100001
                    if(res.code == 100001){
            			layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
            		}
                    // 采集请求失败，可能要稍候重试，或者第二天重试100002
                    if(res.code == 100002){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
            		}
                    // 采集请求成功，认证成功100003
                    if(res.code == 100003){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
                                _this.$parent.loadData();
	                        	_this.toBack();
	                        }
	                    });
            		}
                    // 输入查询密码100004
                    if(res.code == 100004){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                         end : function(){
	                        	$(".input-servicePwd").hide();
	                        	$(".servicePwd").hide();
	                        	$(".input-captcha").hide();
	                        	$(".captcha").hide();
	                        	$(".input-queryPwd").show();
	                        	$(".queryPwd").show();
	                        }
	                   });
            		}
                    // 重置手机服务密码失败，该地区或运营商不支持重置手机服务密码100005
                    if(res.code == 100005){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
            		}                    
                    if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _this.$router.push("/login")
                        }
                    }
            		if(res.code == "500"){
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
					}
                });
            }
        }
    }
</script>
<style lang="scss">
    .page-usermob{
    	.bottom{
    		margin: 15px;
    		font-size: 12px;
    		color: rgb(196,196,196);
    	}
       .userfindpwd{
       	line-height: 40px;
       	font-size:14px;
       	color: rgb(74, 144, 226);
       }
       .tel,.input-phone{
       	    width: 100%;
		    position: relative;
		    background-color: #ffffff;
		    line-height: 35px;
		    border-bottom: 1px solid #d9d9d9;
       }
       .captcha{
       	display: none;
       }
       .input-phone input{
       	width: 100%;
       	border: none;
       
       	outline: none;
       }
       .input-captcha,.input-queryPwd{
       	display: none;
       }
       .queryPwd{
       	display: none;
       }
       .tel span{
       	 margin-left: 10px;
       }
    }
</style>
