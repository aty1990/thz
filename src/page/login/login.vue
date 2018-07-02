<template>
	<div class="page-animate page-login">
        <v-header>
            <mt-header title="登录">
                <div slot="left">
                    <mt-button  icon="back" @click.native="toBack"></mt-button>
                </div>
                <mt-button slot="right" class="mgr-8 gray-font-color" @click.native="register()">注册</mt-button>
            </mt-header>
        </v-header>
        <div class="page-login-wrap">
            <mt-navbar class="page-part" v-model="selected">  
              <mt-tab-item id="1">账号密码登录</mt-tab-item>  
              <mt-tab-item id="2">快捷免密登录</mt-tab-item>  
            </mt-navbar>  
            <mt-tab-container v-model="selected">  
              <mt-tab-container-item id="1">  
                <div class="bk-input-wrap flex" >
                    <input type="tel" placeholder="请输入手机号码" v-model="phone" class="icon-phone" @input="listenValue($event,'phone',11,'btn1State')" id="tel">
                    <i class="icon-close" @click="clearText('phone')" v-show="phone.length>0"></i>
                </div>
                <div class="bk-input-wrap flex no-bottom-border" >
                    <input type="password" placeholder="请输入密码" v-model="password" class="icon-password" @input="listenValue($event,'password',20,'btn1State')">
                    <i class="icon-close" @click="clearText('password')" v-show="password.length>0"></i>
                    <i class="icon-view" @click="view('password',$event)" v-show="password.length>0"></i>
                </div>
                <span class="fr pd-all-10 theme-font-color" @click="findpwd">忘记密码</span>
                <div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btn1State" @click="login">登录</mt-button>
                </div>
              </mt-tab-container-item>  
              <mt-tab-container-item id="2">  
                <div class="bk-input-wrap flex" >
                    <input type="tel" placeholder="请输入手机号码" v-model="phone" class="icon-phone" @input="listenValue($event,'phone',11,'btn2State')">
                    <i class="icon-close" @click="clearText('phone')" v-show="phone.length>0"></i>
                </div>
                <div class="bk-input-wrap flex " >
                    <input type="number" placeholder="请输入验证码" v-model="code" @input="listenValue($event,'code',6,'btn2State')" class="icon-code">
                    <div class="get-code mgt-4" v-tap="{methods:getCode}">{{codeText}}</div>
                </div>
                <div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btn2State" @click="sms">登录</mt-button>
                </div>
              </mt-tab-container-item>  
            </mt-tab-container>  
        </div>
        <router-view />
    </div>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    import * as utils from '@/assets/js/tool'
    import '@/assets/js/prng4'
    import '@/assets/js/rng'
    import '@/assets/js/jsbn'
    import '@/assets/js/base64'
    import r from '@/assets/js/rsa'
    import crypto from 'crypto'
    import { getCookie,iosOrAndroid } from '@/assets/js/tool'
    export default {
        components: { VHeader },
        data() {
			return {
				selected: '1',                  // 默认选择账号密码登录
                btn1State : true,               // 账号密码登录按钮是否可以提交
                btn2State : true,               // 免密登录按钮是否可以提交
                codeText : "获取验证码",
                time : 60,                      // 倒计时60s
                timer : "",                     // 定义定时器
                code : "",      
                phone : "",
                password : "" 
			}
		},
		methods : {
            toBack(){
                // 页面返回
                this.$router.back(); 
            },
            /**
             * 账号密码登录
             */
            login(){
                let _self = this;
                // 对密码进行加密
                let md5 = crypto.createHash("md5");
				md5.update(_self.password);
                // 判断手机号是否注册
                api.mobver({userMob : _self.phone }).then(res=>{
                    if(res.code=="200"){
                        layer.open({
                            content: res.body
                            ,skin: 'msg'
                            ,time: 3
                        });
                    }else if(res.code=="401"){
                        // 手机号黑名单
                        location.href = "https://m.vjiehu.com/jiehu/product/html/market.html";
                    }else{
                        // 传入term参数用于判断是微信中请求还是安卓app中请求
                        let params = {userMob: _self.phone,userPwd: md5.digest('hex'),term:sessionStorage.getItem("term")?"android":""};
                        // 登录
                        api.login(params).then(result=>{
                            if(result.code=="200"){
                                // 获取用户信息
                                _self.getUserInfo(result.body,result.msg);
                            }else{
                                layer.open({
                                    content: result.msg
                                    ,skin: 'msg'
                                    ,time: 2
                                });
                            }
                        });
                    }
                })
            },
            /**
             * 免密登录
             */
            sms(){
                let _self = this;
                let loginChannel = this.$route.query.loginChannel;
                if(sessionStorage.getItem("term")){
                    // 安卓端免密登录
                    $.ajax({
                        url: "/thz/support/unWxVerifications",
                        type: "post",
                        data: {userMob: _self.phone,smsNum: _self.code },
                        headers: {    
                            jhVer: "2.0.0",
                            loginTerm : sessionStorage.getItem("term"),
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
                            if(res.code == "201"){
                                layer.open({
                                    content: res.msg
                                    ,skin: 'msg'
                                    ,time: 2,
                                    end : function(){
                                        _self.$router.replace("/home");
                                    }
                                });
                            }else if(res.code == "200"){
                                _self.$store.state.index.account = _self.phone;
                                _self.$router.push({
                                    name:"loginToSetpwd",
                                    query :{
                                        smsNum : _self.code
                                    }
                                });
                            }
                        }
                    })
                }else{
                    // 微信端免密登录 
                    api.verifications({userMob: _self.phone,smsNum: _self.code }).then(res=>{
                        // code 200跳设置密码  201自动登录  401用户被拒，跳贷款超市
                        if(res.code=="200"){
                            _self.$store.state.index.account = _self.phone;
                            _self.$router.push({name:"loginToSetpwd"});
                        }else if(res.code=="201"){
                             _self.$router.back();
                        }else if(res.code=="401"){
                            location.href = "https://m.vjiehu.com/jiehu/product/html/market.html";
                        }else{
                           layer.open({
                                content: res.msg
                                ,skin: 'msg'
                                ,time: 2
                            });  
                        }
                    });
                }
            },
            getUserInfo(accessToken,msg){
                let _self =  this;
                // 获取用户信息
                api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                    // 缓存用户信息
                    localStorage.setItem("userInfo",JSON.stringify(res.body));
                    layer.open({
                        content: msg
                        ,skin: 'msg'
                        ,time: 2,
                        end : function(){
                            // 缓存用户手机号
                            localStorage.setItem("account",_self.phone);
                            // 是否需要直接返回
                            if(sessionStorage.hasBack){
                                _self.$router.back();
                                sessionStorage.removeItem("hasBack");
                            }else{
                                // 跳转到首页
                                _self.$router.replace({name:"home"});
                            }
                        }
                    });
                });
            },
            /**
             * 监听必填字段是否已填写
             * @param   e      跳转的路由路径
             * @param   type   字段
             * @param   maxLen 最大长度
             * @param   btn    按钮
             */
            listenValue(e,type,maxLen,btn){
                let _self = this;
                if(_self[type].length >maxLen)_self[type]=_self[type].slice(0,maxLen);
                if(btn=="btn1State"){
                    this[btn] = utils.listenField([
                        {value:_self.phone,type:"phone"},
                        {value:_self.password,type:"text"}
                    ]);
                }else{
                     this[btn] = utils.listenField([
                        {value:_self.phone,type:"phone"},
                        {value:_self.code,type:"text"}
                    ]);
                }
            },
            /**
             * 注册
             */
            register(){
                this.$router.push({name:"register"});
            },
            /**
             * 找回密码
             * @param  e 跳转的路由
             */
            findpwd(){
                this.$router.push({name:"findPwd"});
            },
            /**
             * 清空内容
             * @param  text 要清空的字段
             */
            clearText(text){
                this[text] = "";
            },
            /**
             * 密码明文与密文的转换
             * @param  {[type]} text 字段
             * @param  {[type]} e    当前点击对象
             */
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
            /**
             * 获取二维码
             */
            getCode(){
                let _self = this;
                $("#tel").focus().blur();
                if(!_self.phone){
                    layer.open({
                        content: "手机号码不能为空"
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return;
                }
                if(!utils.checkPhone(_self.phone)){
                    layer.open({
                        content: "手机号码有误"
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return;
                } 
                // 如果小于60s说明已经点击了获取验证码按钮
                if(_self.time<60) return;
                // 调用发送二维码函数
                this.sendCode();
            },
            sendCode(){
                let _self = this;
                // 对手机号进行rsa加密
                let rsa = new r.RSAKey();
                rsa.setPublic(_self.$store.state.index.regSecKey, '10001');
                let tel=r.linebrk(hex2b64(rsa.encrypt(_self.phone)), 64); 
                // 发送验证码时的判断 10000表示注册时的值  10001表示忘记密码的值  10002:免密登录  
                let tempId = "10002";  
                // 调用接口
                api.sendcode({userMob:tel,tempId:tempId}).then(res=>{
                    if(res.code=="200"){
                        layer.open({
                            content: "验证码已发送"
                            ,skin: 'msg'
                            ,time: 2 
                        });
                        // 倒计时60s
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
    .page-login-wrap{
       .no-bottom-border{
            border:none;
        }
        .mint-tab-container-item{
            margin-top: 20px;
        }
        .fr{
            float: right;
        }
    }
</style>