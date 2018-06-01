<template>
    <transition name="move">
    	<div class="page-animate page-repayment">
            <v-header>
                <mt-header :title="title">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                    <mt-button slot="right"><img src="/thz/static/plug.png" width="18" @click="addCard"/></mt-button>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <p class="font-size-20 repay-title">
                    <span>选择银行卡：</span>
                </p>
                <vue-better-scroll class="scrol-wrap repay-card">
                    <section class="pd-all-20 ">
                        <div class="flex item" v-for="(card,i) in bankCardList"  :class="{'checked':i== current}" v-tap="{methods:chooseItem,params:i}" >
                            <div class="w-60 pd-all-4"><img :src="card.bankLogo" width="100%"></div>
                            <div class="grow pd-all-4 font-size-14">
                                <p class="pd-all-4">{{card.bankName}}</p>
                                <p class="pdl-4">{{card.bankDown}}</p>
                            </div>
                        </div>
                    </section>
                </vue-better-scroll>
                <router-view />
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import VueBetterScroll from 'vue2-better-scroll' 
    import api from '@/fetch/api'
    export default {
    	name: 'page-repayment',
        components: { VHeader,VueBetterScroll },
        data() {
			return {
               current : 1,
               bankCardId : "",
               bankCardList : [],
               hkType : "",
               title:"还款"
			}
		},
        mounted(){
            this.initData();
            this.hkType = sessionStorage.getItem("hk-type");
            if(this.hkType=="early"){
                this.title = "提前还款";
            }
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            initData(){
                let _self = this;
                this.current = sessionStorage.getItem("current");
                // 当前用户默认银行卡的id
                this.bankCardId = sessionStorage.getItem("bankCardId");
                api.bankInfoList({userId: JSON.parse(localStorage.getItem("userInfo")).userId,jhVer: 2.0}).then(res=>{
                    if(res.code == 200){  
                      _self.bankCardList = [];
                        $.each(res.body,function(index, el) {
                            if(el.bankcardId==_self.bankCardId){
                                _self.current = index;
                            }
                            _self.bankCardList.push(el);
                        });
                    }else if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _self.$router.push("/login")
                        }
                    }else{
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                });
            },
            chooseItem(e){
                let _self = this;
                $(".repay-card .item").removeClass('checked');
                $(e.event.currentTarget).addClass('checked');
                this.$parent.modifyCard({
                    bankName :　_self.bankCardList[e.params].bankName,
                    bankDown :  _self.bankCardList[e.params].bankDown,
                    bankCardId :  _self.bankCardList[e.params].bankcardId,
                    bankLogo :  _self.bankCardList[e.params].bankLogo,
                    current : e.params
                });
              
               this.toBack();
            },
            addCard(){
                var routerName = "addBankCard";
                if(this.hkType=="early"){
                    routerName = "eaddBankCard";
                }
                this.$router.push({
                    name : routerName
                })
            },
            loadData(){
                this.initData(); 
            }
        }
    }
</script>
<style lang="scss">
    $color:#F45051;
    .page-repayment{
       .mint-header {
            background-color: $color;
            color: #fff;
            border: none;
            border-bottom:none;
            height:41px;
        }
        .repay-title{
            background-color: $color;
            color:#fff;
            padding:40px 0 40px 20px;
        }
        .w-60{
            width:60px;
        }
        .checked{
            background: url("/thz/static/success.png") scroll 94% 50% no-repeat;
            background-size: 30px;
            background-color: #fff;
        }
        .item{
            -box-shadow: 1px 1px 1px gray;
            -webkit-box-shadow: 0px 2px 5px gray;
            margin-bottom: 10px;
            border-radius:6px;
        }
        .scrol-wrap{
            position:fixed;
            top:150px;
            left:0;
            right:0;
            bottom:0;
            overflow: hidden;
            padding-top:10px;
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            background:#fff;
            width:100%;
        }
       
    }
</style>