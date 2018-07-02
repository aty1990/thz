<template>
    <transition name="silde" v-on:after-enter="afterEnter">
    	<div class="page-animate page-bankcard-wrap">
            <v-header>
                <mt-header :title="title">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                    <mt-button slot="right" @click.native="addCard"><img src="/thz/static/plug.png" width="18" /></mt-button>
                </mt-header>
            </v-header>
            <vue-better-scroll class="wrapper" v-if="hasData">
                <div class="content-wrap">
                    <p class="font-size-20 bankcard-title">
                        <span>选择银行卡：</span>
                    </p>
                    <div class="flex item-cls" v-for="(card,i) in bankCardList"  :class="{'checked-bank':i== current}" @click="chooseItem(i)" >
                        <div class="w-60 pd-all-4"><img :src="card.bankLogo" width="100%"></div>
                        <div class="grow pd-all-4 font-size-14">
                            <p class="pd-all-4">{{card.bankName}}</p>
                            <p class="pdl-4">{{card.bankDown}}</p>
                        </div>
                    </div>
                </div>
            </vue-better-scroll>
            <div class="no-data-msg" v-if="!hasData">
                <div class="ds-table">
                    <div class="ds-tell"><img src="/thz/static/load.png" class="loop" width="22"></div>
                </div>
            </div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import VueBetterScroll from 'vue2-better-scroll' 
    import api from '@/fetch/api'
    export default {
        components: { VHeader,VueBetterScroll },
        data() {
			return {
               current : 1,
               bankCardId : "",
               hasData : false,
               bankCardList : [],
               hkType : "",
               title:"还款"
			}
		},
        mounted(){
            this.hkType = sessionStorage.getItem("hk-type");
            if(this.hkType=="early"){
                this.title = "提前还款";
            }
            this.initData();
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            afterEnter(){
            },
            initData(){
                let _self = this;
                this.current = sessionStorage.getItem("current");
                // 当前用户默认银行卡的id
                this.bankCardId = sessionStorage.getItem("bankCardId");
                api.bankInfoList({}).then(res=>{
                    if(res.code == "200"){  
                        let list = [];
                        res.body.forEach(function(obj, index, array) {
                            if(obj.bankcardId==_self.bankCardId){
                                _self.current = index;
                            }
                            list.push(obj)
                        });
                        _self.bankCardList = list;
                        _self.hasData = true;
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
            chooseItem(i){
                let _self = this;
                this.$parent.modifyCard({
                    bankName :　_self.bankCardList[i].bankName,
                    bankDown :  _self.bankCardList[i].bankDown,
                    bankCardId :  _self.bankCardList[i].bankcardId,
                    bankLogo :  _self.bankCardList[i].bankLogo,
                    current : i
                });
               this.toBack();
            },
            addCard(){
                // 1为资料采集绑卡 需要扣验卡费
                sessionStorage.bindCardType = "0";
                this.$router.push("/addcard");
            },
            loadData(){
                this.initData(); 
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../../assets/scss/mixin'; 
    @import '../../assets/scss/color';
    .page-bankcard-wrap{
        .bankcard-title{
            background-color: $theme-bg-color;
            color:#fff;
            padding:px2rem(40) 0 px2rem(40) px2rem(20);
        }
        .mint-header{
            background: $theme-bg-color;
            color:$text-white-color;
            height: px2rem(50);
        }
        .item-cls{
            border:1px solid $text-white-color; 
            width: 90%;
            margin-top: px2rem(10);
            margin-left: 5%;
            border-radius: px2rem(10);
            background-color: #fff;
            -webkit-box-shadow: 0px 2px 5px gray;
            -box-shadow: 1px 1px 1px gray;
        }
        .checked-bank{
            background:url("/thz/static/icon_morenduihao@2x.png") scroll 94% 50% no-repeat;
        }
    }
</style>