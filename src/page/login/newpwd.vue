<template>
    <transition name="move">
        <div class="page-animate page-newpwd">
            <v-header>
                <mt-header title="设置新密码">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
           <div>
           	  <div class="tel">
           	  	<span>{{tel.phoneNo}}</span>
           	  </div>
			  <div class="input-phone bk-input-wrap flex no-bottom-border new-servicePwd">
           	  	<input placeholder="请设置服务密码(多位运营商仅支持6位数字)"  v-model="password1" @input="listenValue($event,'password1',6,'btn1State')"/>
           	    <i class="icon-close" @click="clearText('password1')" v-show="password1.length>0"></i>
                <i class="icon-view" @click="view('password1',$event)" v-show="password1.length>0"></i>
           	  </div>
           	  <div class="bk-input-wrap flex mgt-10 getcode" >
					<input type="number" placeholder="请输入验证码" v-model="code" @input="listenValue($event,'code',6,'btn2State')" >
	                <div class="get-code" @click="getCode">{{codeText}}</div>
				</div>
		   </div>
		   <div class="button-wrap mgt-20">
				<mt-button type="primary" class="newpwd" size="large" :disabled="btn1State" @click="newpwd">下一步</mt-button>
				<mt-button type="primary" class="sumbit" size="large" :disabled="btn2State" @click="sumbit">确定</mt-button>
			</div>
			<div style="text-align:center;"  v-tap="{methods : toRouter,params:'swiper'}">
			  <a  class="userfindpwd">其他修改方式</a>
			</div>
			<router-view />
        </div>
    </transition>
</template>

<script>
  
    import VHeader from '@/components/header'
    import VInput from '@/components/input'
    import api from '@/fetch/api.js'
    import * as utils from '@/assets/js/tool'
    import {getCookie} from '@/assets/js/tool'
    export default {
        name: 'page-newpwd',
        components: {VHeader,VInput},
        data () {
            return {
            	btn1State : true,
            	btn2State : true,
            	password1:"",
            	tel:{phoneNo:""},
            	codeText : "获取验证码",
                time : 60,
			  	timer : "",
			  	code : "",
				
            }
        },
        mounted(){
        	this.tel.phoneNo=getCookie("phoneNo");
            // 判断安卓
            if(sessionStorage.getItem("term")){
                this.tel.phoneNo = localStorage.getItem("account");
            }
        },
        methods : {
        	// 监听必填字段是否已填写
            listenValue(e,type,maxLen,btn){
                let _self = this;
                if(_self[type].length >maxLen)_self[type]=_self[type].slice(0,maxLen);
                if(btn=="btn1State"){
                    if(_self[type].length==maxLen){
                        this[btn] = utils.listenField([
                            {value:_self.password1,type:"password"},                       
                        ]);
                    }else{
                        this[btn] = true;
                    }
                }  
                if(btn=="btn2State"){
                    this[btn] = utils.listenField([
                        {value:_self.code,type:"code"},                       
                    ]);
                }   
            },
            toBack(){
                this.$router.back();
            },
			toRouter(e){
				this.$router.push({
					name : e.params
				});
			},
			clearText(text){
                this[text] = "";
            },
            getCode(){
            	let _self = this;
            	if(_self.time<60) return;
                this.sendCode();
                _self.timer = setInterval(function(){
                    _self.time--;
                    _self.codeText = "重新发送("+_self.time+")";
                    if(_self.time==0){
                        _self.codeText = "重新发送";
                        clearInterval(_self.timer);
                        _self.time = 60;
                    }
                },1000)
            },
            sendCode(){            	
				api.telcaptchas({}).then(res=>{					
					layer.open({
						content: res.msg
						,skin: 'msg'
						,time: 2 
					});					
				})
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
            newpwd(){
            	let _this=this;
            	api.telpwds({serviceNo:_this.password1 }).then(res=>{
            		if(res.code == '100003'){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
	                        	_this.toBack();
	                        }
	                    });
            		}
            		if(res.code == 100000){
            			$(".newpwd").hide();
            			$(".new-servicePwd").hide();
            			$(".sumbit").show();
            			$(".getcode").show();
            		}
            		if(res.code != '100000' && res.code != '100003') {
            			layer.open({
		                    content: res.msg
		                    ,skin: 'msg'
		                    ,time: 2
		                });
            		}           		
            	})           	
            },
            sumbit(){
            	let _this=this;
            	api.telpwdscaptchas({captcha:_this.code }).then(res=>{
            		if(res.code == '100003'){
            			layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end : function(){
	                        	_this.toBack();
	                        }
	                    });
            		}
            		if(res.code == 100000){
            			$(".newpwd").hide();
            			$(".new-servicePwd").hide();
            			$(".sumbit").show();
            			$(".getcode").show();
            		}
            		if(res.code != '100000' && res.code != '100003') {
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
    .page-newpwd{
       .getcode,.sumbit{
       	display: none;
       }
       .bk-input-wrap .get-code{
       	padding:8px 10px;
       }
       .mgt-10{
       	margin-top: 0px !important;
       }
    }
</style>

