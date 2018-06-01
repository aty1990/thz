<template>
    <transition name="move">
        <div class="page-channel page-animate">
            <p class="title">淘花宅</p>
            <div class="channel-box">
                <img src="/thz/static/banner.png" width="100%" />
                <section class="flex pd-all-10">
                    <i><img src="/thz/static/petal_l.png" width="30"></i>
                    <span class="font-size-22 mgl-12 mgr-12 pink-color">极速注册</span>
                    <i><img src="/thz/static/petal_r.png" width="30"></i>
                </section>
                <section>
                    <div class="flex hasborder">
                        <i><img src="/thz/static/channel_phone.png" width="22"></i>
                        <input type="tel" class="grow mgl-8" placeholder="请输入您的手机号" @input="lst" v-model="phone" maxlength="11" id="phone">
                    </div>
                    <div class="flex hasborder">
                        <i><img src="/thz/static/channel_pass.png" width="22"></i>
                        <input type="tel" class="grow mgl-8" placeholder="请输入验证码" @input="lst"  v-model="code" maxlength="6">
                        <span class="getCode" @click="getCode">{{codeText}}</span>
                    </div>
                    <div class="flex hasborder">
                        <i><img src="/thz/static/channel_code.png" width="22"></i>
                        <input type="text" class="grow mgl-8" placeholder="请输入6-12位数字和字母组合的密码" @input="lstPass"  v-model="password" maxlength="12">
                    </div>
                </section>
                <div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="subBtn" @click="commit">立即注册</mt-button>
                </div>
                <div class="flex mgt-4">
                    <img src="/thz/static/channel_xy.png" width="16">
                    <span class="xy-desc mgl-4" @click="xy">阅读并同意《淘花宅服务与隐私协议》</span>
                </div>
                <br>
                <br>
            </div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import {listenField,checkPhone} from '@/assets/js/tool'
    import '@/assets/js/prng4'
    import '@/assets/js/rng'
    import '@/assets/js/jsbn'
    import '@/assets/js/base64'
    import r from '@/assets/js/rsa'
    import crypto from 'crypto'
    import api from '@/fetch/api'
    export default {
        data () {
            return {
                subBtn : true,
                phone : "",
                code : "",
                password : "",
                time : 60,
                codeText : "获取验证码",
                timer : "",
                reg:""
            }
        },
        mounted(){
           this.reg = this.$store.state.index.channel_pwd_reg;
        },
        methods : {
            lst(){
                if(this.password.length>=6){
                    this.subBtn = listenField([
                        {value:this.phone,type:"phone"},
                        {value:this.code,type:"text"},
                        {value:this.password,type:"text"}
                    ]);
                }
            },
            lstPass(){
                this.password = this.password.replace(/[\u4e00-\u9fa5]/g,'');
                this.lst();
            },
            commit(){
                let _self = this;
                $(".page-channel #phone").focus().blur();
                // 密码强度校验
                if(!_self.reg.test(_self.password)){
                    layer.open({
                        content: "密码必须由6-12位字符、数字组成!"
                        ,skin: 'msg'
                        ,time: 3
                    });
                    return;
                }
                // 判断手机号是否已注册
                api.mobver({userMob : this.phone }).then(res=>{
                    if(res.code == '500') {  
                        layer.open({
                            content: "您已是我们的优质客户，赶紧去提现吧"
                            ,skin: 'msg'
                            ,time: 3,
                            end : function(){
                                if(browser.versions.ios){
                                    location.href = "https://www.pgyer.com/wcvk";  
                                }else{
                                    location.href = "http://thz-static.oss-cn-shanghai.aliyuncs.com/app/thz_web_v1.0_20180419.apk";
                                }
                            }
                        });
                        // 手机号为黑名单
                    }else if(res.code=="401"){
                        location.href = "https://m.vjiehu.com/jiehu/product/html/market.html";
                    }else{
                        // 手机未注册，调用注册接口
                        _self.postData("/thz/market/user/out/register",{userMob:this.phone,userPwd:this.password,smsNum:this.code},function(){
                            if(res.code=="200"){
                                layer.open({
                                    content : "恭喜您,注册成功，关注微信公众号，赶紧拿钱去吧"
                                    ,skin : 'msg'
                                    ,time : 3,
                                    end : function(){
                                        // 跳转到二维码页面
                                        _self.$router.push("/extension");      
                                    }
                                });
                            }else{
                                layer.open({
                                    content : res.msg
                                    ,skin : 'msg'
                                    ,time : 3
                                });
                            }
                        });
                    }
                })
            },
            getCode(){
                let _self = this;
                $(".page-channel #phone").focus().blur();
                if(!_self.phone){
                    layer.open({
                        content: "手机号码不能为空"
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return;
                }
                if(!checkPhone(_self.phone)){
                    layer.open({
                        content: "手机号码有误"
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return;
                } 
                api.mobver({userMob : this.phone }).then(res=>{
                    if(res.code == '500') {  
                        layer.open({
                            content: "您已是我们的优质客户，赶紧去提现吧"
                            ,skin: 'msg'
                            ,time: 3,
                            end : function(){
                                if(browser.versions.ios){
                                    location.href = "https://www.pgyer.com/wcvk";        
                                }else{
                                    location.href = "http://thz-static.oss-cn-shanghai.aliyuncs.com/app/thz_web_v1.0_20180419.apk";
                                }  
                            }
                        });
                    }else if(res.code=="401"){
                        location.href = "https://m.vjiehu.com/jiehu/product/html/market.html";
                    }else{
                        if(_self.time<60) return;
                        let rsa = new r.RSAKey();
                        rsa.setPublic(_self.$store.state.index.regSecKey, '10001');
                        let tel=r.linebrk(hex2b64(rsa.encrypt(_self.phone)), 64);   
                        let tempId = "10000";  // 发送验证码时的判断 10000表示注册时的值  10001表示忘记密码的值  10002:免密登录
                        api.sendcode({userMob:tel,tempId:tempId}).then(res=>{
                            if(res.code=="200"){
                                layer.open({
                                    content: "验证码已发送"
                                    ,skin: 'msg'
                                    ,time: 2 
                                });
                            }else{
                                layer.open({
                                    content: res.msg
                                    ,skin: 'msg'
                                    ,time: 2 
                                });
                            }
                        })
                        _self.timer = setInterval(function(){
                            _self.time--;
                            _self.codeText = "重新发送("+_self.time+")";
                            if(_self.time==0){
                                _self.codeText = "重新发送";
                                clearInterval(_self.timer);
                                _self.time = 60;
                            }
                        },1000) 
                    }
                })
            },
            xy(){
                $(".page-channel #phone").focus().blur();
                this.$router.push("/channel/xy"); 
            },
            postData(url, params, callback) {
                let loginChannel = this.$route.query.loginChannel;
                $.ajax({
                    url: url,
                    type: "post",
                    async: true,
                    data: params,
                    headers: {    
                        jhVer: "2.0.0",
                        loginTerm : "wx",
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
                            callback && callback(res)
                        } else {
                            layer.open({
                                content: res.msg
                                ,skin: 'msg'
                                ,time: 2 
                            });
                        }
                    }
                })
            }
        }
    }
</script>
<style lang="scss" scoped>
    .page-channel{
        background: #fff;
        .title{
            position: fixed;
            top:0;
            left: 0;
            width: 100%;
            text-align: center;
            background: #fff;
            padding: 12px 0;
        }
        .channel-box{
            position: absolute;
            top:40px;
            width: 100%;
            bottom: 0;
            overflow-y:auto;
        }
        .pink-color{
            color:#F36581;
            font-weight: bold;
        }
        .hasborder{
            border:1px solid #F36581;
            border-radius: 8px;
            padding: 12px;
            width: 90%;
            margin: 0 auto;
            margin-bottom: 20px;
            position: relative;
            input{
                outline: none;
                border:none;
                font-size: 14px;
            }
        }
        .getCode{
            padding: 10px 8px;
            position: absolute;
            right: 12px;
            top:7px;
            background: #F36581;
            color:#fff;
            z-index: 9;
        }
        .reg-btn{
            position: relative;
            text-align: center;
        }
        .xy-desc{
            color:#F36581;
        }
        .button-wrap button{
            border-radius: 48px;
            letter-spacing: 5px;
            font-size: 20px;
        }
        .mint-button{
            height: 48px;
            line-height: 48px;
            margin-bottom: 10px;
            font-weight: bold;
        }
    }
</style>
