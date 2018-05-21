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
                    <input type="text" placeholder="请输入持卡人姓名" v-model="userName"  disabled="disabled">
                </div>
                <div class="bk-input-wrap flex" >
                    <label class="w-60">卡号</label>
                    <input type="tel" placeholder="请输入银行卡号"  maxlength="25"  v-model="cardNo" @keyup="verCardNo($event)">
                    <i class="icon-msg scale-5" @click="suppertBank"></i>
                </div>
                <div class="pd-all-10 text-box">
                    <p class="gray-font font-size-10">友情提示：</p>
                    <p class="gray-font font-size-10">1:请绑定持卡人本人的常用储蓄银行卡;</p>
                    <p class="gray-font font-size-10">2:请确保卡内余额充足,绑卡后会扣款2元以校验卡片。</p>
                    <div class="mgt-20">
                        <mt-button type="primary" size="large" :disabled="cmtState" @click="bindCard" class="font-size-14">确认绑卡</mt-button>
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
                            <span v-for="bank in bankCardList">{{bank.value}}</span>
                        </div>
                    </div>
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
                cmtState : true,
                flag : false,
                bankCardList : [],
                cardNo : ""
            }
		},
        mounted(){
            let _self = this;
            this.userInfo = JSON.parse(localStorage.getItem("userInfo"));
            this.userName = this.userInfo.userName;
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
            })
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
            bindCard(){
            	let _self = this;
                this.cmtState = true;
                api.bindcard({accNo:this.cardNo.replace(/[ ]/g, "")}).then(res=>{                  
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
                        _self.cmtState = true;
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
                    }
                })
            },
            suppertBank(){
                this.flag = true;
            },
            close(){
                this.flag = false;
            }
        }
    }
</script>
<style lang="scss">
    .page-mbankcord{
        .w-60{
            width: 80px;
            text-align: center;
        }
        .icon-msg{
            position: absolute;
            right:2px;
            top:2px;
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
                line-height: 40px;
                text-align: center;
                position: relative;
                &:after{
                    content: "";
                    position: absolute;
                    height: 1px;
                    width: 100%;
                    background:  #d9d9d9;
                    bottom: 0;
                    transform: scaleY(0.5);
                }
            }
            .close-span{
                position: absolute;
                top:13px;
                left: 20px;
                color:#3AA6D7;
                z-index: 99;
            }
            .bank-card-list{
                flex-wrap: wrap;
                justify-content: flex-start;
               
                padding-top: 10px;
                span{
                    width: 33%; 
                    padding: 4px 0;
                    text-indent: 16px;
                    font-size: 12px;
                    position: relative;
                    color:#9D9D9D;
                    &:after{
                        position:absolute;
                        content: "";
                        height: 6px;
                        width: 6px;
                        top:7px;
                        left:6px;
                        background: #3AA6D7;
                        border-radius: 50%;

                    }
                }
            }
            .title-tip{
                background: #FAFAFA;
                color:#9D9D9D;
                padding: 10px;
                line-height: 20px;
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
                line-height: 20px;
            }
        }
        .mgb-3{
            margin-bottom: 2px;
        }
        input[type=text]:disabled{
            background: #fff;
        }

    }
</style>