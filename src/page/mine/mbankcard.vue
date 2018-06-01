<template>
    <transition name="move">
    	<div class="page-animate page-mbankcord">
            <v-header>
                <mt-header title="银行卡">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div class="bk-input-wrap flex" >
                    <label class="w-60">持卡人</label>
                    <input type="text" placeholder="请输入持卡人姓名" v-model="userName" readonly>
                </div>
                <div class="bk-input-wrap flex" >
                    <label class="w-60">银行预留手机号</label>
                    <input type="text" placeholder="请输入持卡人姓名" v-model="phone"  readonly>
                </div>
                <div class="bk-input-wrap flex" >
                    <label class="w-60">储蓄卡号</label>
                    <input type="tel" placeholder="请输入银行卡号" class="bandcard-input"  maxlength="25"  v-model="cardNo" @keyup="verCardNo($event)">
                    <i class="icon-msg scale-5" @click="suppertBank"></i>
                </div>
                <div class="pd-all-10 text-box">
                    <!--  <p class="gray-font font-size-10 pd-all-4">友情提示：</p>
                    <p class="gray-font font-size-10 pd-all-4">1:请绑定持卡人本人的常用储蓄银行卡;</p> -->
                    <p class="gray-font font-size-14 pd-all-4">请确保卡内余额充足,绑卡后会扣款<b class="red font-size-16">{{price}}</b>元以校验卡片。</p>
                    <div class="mgt-20">
                        <mt-button type="primary" size="large" :disabled="cmtState" @click="bindCard" class="font-size-14">绑卡</mt-button> 
                        <p class="gray-font font-size-10 mgt-6 flex"><i class="icon-tip scale-6 mgb-3"></i><span>以上信息经加密处理,仅用于银行卡验证</span></p>
                    </div>
                </div>
            </div>
            <div class="bank-list-desc-wrap" :class="{'active':flag,'no-active':!false}">
                <span class="close-span" @click="close">关闭</span>
                <div class="header flex">
                    <span class="grow font-size-14">支持银行</span>
                </div>
                <div>
                    <p class="title-tip">友情提示：当前仅支持以下银行请勿绑定其他银行卡，以免导致分期不成功</p>
                    <div>
                        <div class="flex bank-card-list pdl-10">
                            <span v-for="bank in bankCardList" class="pd-all-6">{{bank.value}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="full-page" v-show="sendcode">
                <div class="mask" @click.stop="closePop"></div>
                <div class="content-wrap"> 
                    <header class="flex font-size-16 bold pd-all-10">输入验证码</header>
                    <div class="mgb-10 text-desc">
                      为了保障您的用卡安全,需要验证您的手机号，验证码已发送至手机<span class="red font-size-16">{{phone}}</span> 
                    </div>
                    <div class="flex bg-gray pdt-10 pdb-10 font-size-12">
                        <span class="mgl-10 w-70">验证码</span>
                        <input type="tel" maxlength="6" class="code-input" @input="lstCode" v-model="code">
                        <button class="code-btn font-size-12 w-100" @click="getCode">{{codeText}}</button>
                    </div>
                    <footer class="mgt-10">
                        <mt-button type="primary" size="large" :disabled="submitFlag" @click="submit" class="font-size-14">确认提交</mt-button>
                    </footer>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import {listenField} from '@/assets/js/tool'
    import api from '@/fetch/api'
    export default {
    	name: 'page-mbankcord',
        components: { VHeader },
        data() {
			return {
                userName:"",
                sendcode : false,
                phone : localStorage.account,
                cmtState : true,
                codeText : "获取验证码",
                submitFlag : true,
                price : 0,
                code : "",
                flag : false,
                time : 60,
                bankCardList : [],
                cardNo : ""
            }
		},
        mounted(){
            let _self = this;
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.userName = this.userInfo.userName;
            api.getDebitAmount().then(res=>{
                _self.price = res.body;
            });

            api.bankSelecter({userId:this.userInfo.userId}).then(res=>{
                if(res.code=="200"){
                    _self.bankCardList = res.body;
                }else{
                    layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2
                    });
                }  
            });

        },
		methods : {
            toBack(){
                this.$router.back();
            },
            // 监听必填字段是否已填写
            verCardNo(e){
                //this.cardNo =this.cardNo.replace(/\s/g,'').replace(/\D/g,'').replace(/(\d{4})(?=\d)/g,"$1 ");
                if(this.cardNo.length>=16){
                    this.cmtState = false;
                }else{
                    this.cmtState = true;
                }
            },
            clearText(text){
                this[text] = "";
            },
            suppertBank(){
                this.flag = true;
            },
            close(){
                this.flag = false;
            },
            closePop(){
                this.sendcode = false;
            },
            getCode(){
                let _self = this;
                // 如果小于60s说明已经点击了获取验证码按钮
                if(_self.time<60) return;
                // 调用发送二维码函数
                this.sendCode();
            },
            bindCard(){
               this.sendcode = true; 
            },
            lstCode(){
                this.submitFlag = (this.code.length==6?false:true);
            },
            sendCode(){
                let _self = this;
                // 调用接口
                api.checkCard({ accNo:this.cardNo}).then(res=>{
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
            },
            submit(){
                let _self = this;
                this.submitFlag = true;
                api.payBindCard({accNo:this.cardNo.replace(/[ ]/g, ""),vCode:this.code}).then(res=>{                  
                    if(res.code=="200"){
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2,
                            end : function(){
                                 _self.$parent.loadData();
                                _self.toBack();
                            }
                        });
                    }else{
                        _self.submitFlag = false;
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
    @import '../../assets/scss/mixin';
    .page-mbankcord{
        .w-60{
            width: px2rem(200);
            text-align: center;
            text-align:left;
            padding-left:px2rem(10)
        }
        .w-70{
            width: px2rem(60);
        }
        .w-100{
            width: px2rem(100);  
        }
        .bold{
            font-weight: bold;
        }
        .icon-msg{
            position: absolute;
            right:px2rem(2);
            top:px2rem(2);
        }
        .bg-gray{
            background:#F4F5F7;
            color:#999FAB;
        }
        .bandcard-input{
            padding-right:40px;
        }
        .bank-list-desc-wrap{
            -webkit-transition: all .3s ease;
            transition: all .3s ease;
            background: #fff;
            position: fixed;
            top:0;
            left:0;
            right:0;
            bottom: 0;
            overflow: hidden;
            z-index: 999;
            .header{
                line-height: px2rem(40);
                text-align: center;
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    height: px2rem(1);
                    width: 100%;
                    background:  #d9d9d9;
                    bottom: 0;
                    transform: scaleY(0.5);
                }
            }
            .close-span{
                position: absolute;
                top:px2rem(13);
                left: px2rem(20);
                color:#3AA6D7;
                z-index: 99;
            }
            .bank-card-list{
                flex-wrap: wrap;
                justify-content: flex-start;
                padding-top: px2rem(10);
                span{
                    width: 33%; 
                    padding: px2rem(4) 0;
                    text-indent: px2rem(16);
                    font-size: 12px;
                    position: relative;
                    color:#9D9D9D;
                    &:after{
                        position:absolute;
                        content: "";
                        height: px2rem(6);
                        width: px2rem(6);
                        top:px2rem(12);
                        left:px2rem(6);
                        background: #3AA6D7;
                        border-radius: 50%;

                    }
                }
            }
            .title-tip{
                background: #FAFAFA;
                color:#9D9D9D;
                padding: px2rem(10);
                line-height: px2rem(20);
            }
            
        }
        .no-active{
            -webkit-transform: translate3d(0, 100%, 0); 
            transform: translate3d(0, 100%, 0);
        }
        .active{
            -webkit-transform: translate3d(0, 0, 0);
            transform: translate3d(0, 0, 0);
        }
        .text-box{
            p{
                line-height:px2rem(20);
            }
        }
        .mgb-3{
            margin-bottom: px2rem(2);
        }
        input[type=text]:disabled{
            background: #fff;
        }
        .full-page{
            position: absolute;
            top:0;
            left:0;
            right:0;
            bottom:0;
            overflow:hidden;
            z-index:1000;
            .content-wrap{
                width:80%;
                height:px2rem(280);
                background:#fff;
                position: absolute;
                top:50%;
                margin-top:px2rem(-140);
                margin-left:10%;
                z-index:1001;
                border-radius:px2rem(4);
                padding:px2rem(10);
            }
            .code-input{
                width:px2rem(120);border:none;background:transparent;outline: none;
            }
            .code-btn{
                border:none;
                background:transparent;

            }
            .text-desc{
                line-height:px2rem(26);
                font-size:px2rem(12);
            }
            .mask{
                opacity:0.7;
            }
        }
        .red{
            color: #F64F53;
            font-weight: bold;
        }
    }
</style>