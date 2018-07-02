<template>
    <transition name="move">
    	<div class="page-animate page-mbankcordllist">
            <v-header>
                <mt-header title="我的银行卡">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div v-if="items.length>0">
                    <div class="pd-all-10">
                        <div v-for="i in items" @click="returnCard(i)" @key="">
                            <div class="flex item-card" :style="{'background':i.backgroundColour.substr(0,7)}">
                                <div class="w-62" style="width:62px;background: #fff;border-radius: 62px;text-align: center;">
                                    <img v-bind:src="i.bankLogo" width="60" height="60" style="margin-top: 2px;">
                                </div>
                                <div class="grow all-top" style="margin-left: 20px;">
                                    <p class="card-name">{{i.bankName}}</p>
                                    <h5 class="card-type">储蓄卡</h5>
                                    <span class="card-no font-size-16">{{i.accountNo}}</span>
                                </div>
                            </div>                        
                        </div> 
                    </div>
                    <div class="flex bg-white" @click="addCard" v-show="notAddCard">
                       <div class="flex grow text-left pdl-10"><img src="/thz/static/icon_add@2x.png" width="16" class="mgr-6" /><span>添加银行卡</span></div>
                       <img src="/thz/static/href.png" width="20" class="mgr-10">
                   </div>
                </div>
                <div class="flex vertical wrapper" v-if="items.length==0">
                   <img src="/thz/static/no_bankcard.png" width="60" class="mgb-20" />
                   <span class="mgb-50">您还没有绑定银行卡哦~</span>
               </div> 
            </div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    export default {
    	name: 'page-mbankcordllist',
        components: { VHeader },
        data() {
			return {
                userName:"",
                hasData : false,
                cmtState : true,
                flag : false,
                notAddCard : true,
                items:[],
                bankCardList : [],
                cardno:""
            }
		},
        mounted(){
            if(this.$route.path.indexOf("hmyCard")>-1){
                this.notAddCard = true;
            }else{
                this.notAddCard = false;
            }
            this.initData();
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            initData(){
                let _self = this;
                api.bankInfoList({}).then(res=>{
                    if(res.code=="200"){
                        let bg = "";
                        for(let i in res.body){
                            bg = res.body[i].backgroundColour;
                            res.body[i].backgroundColour = bg.substring(0,bg.indexOf('|'));
                        }
                        _self.items = res.body;
                    }else if(res.code=="500"){
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }  
                })
            },
            addCard(){
                // 1为资料采集绑卡 需要扣验卡费
                sessionStorage.bindCardType = 0;
                if(this.$route.path.indexOf("hmyCard")>-1){
                    this.$router.push("/home/mycard/haddcard");
                }else{
                    this.$router.push("/home/mycard/addcard");
                }
            },
            loadData(){
                this.bankCardList = [];
                this.initData();
            },
            returnCard(card){
                if(this.$route.path.indexOf("hmyCard")>0){
                    this.$parent.$emit("updateCard",card);
                    this.$router.back();
                }
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/scss/mixin'; 
    @import '../../assets/scss/color'; 
    .page-mbankcordllist{
        .addcard-wrap{
            width: 90%;
            padding: 14px 0;
            border: 1px dashed $theme-bg-color;
            color:$theme-bg-color;
            font-size: px2rem(20);
        }
        .item-card{
            margin-bottom: 10px;
            border-radius: 10px;
            background: #000;
            color:#fff;
            padding: 10px;
        }
        .card-name{
            margin-top: 2px;
            font-size: 16px;
        }
        .card-type{
            padding: 4px 0 8px;
            font-size: 10px;
        }
        .bg-white{
            background-color: #fff;
            padding: px2rem(12) 0;
        }
    }
</style>