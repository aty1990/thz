<template>
    <transition name="move">
    	<div class="page-animate page-pawn-order">
            <v-header>
                <mt-header title="转卖订单">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <vue-better-scroll  class="wrapper" ref="scroll">
                <div class="card mgb-10" v-for="pawn in pawnArr" >
                    <p class="card-title flex">
                        <span class="grow">转卖时间：{{pawn.cashTime}}</span>
                        <span class="theme-font-color">{{pawn.orderStatus}}</span>
                    </p>
                    <div class="right-content flex all-top gray-bg">
                        <div class="pdl-10">
                            <img :src="pawn.goodsUrl" height="60" width="60">
                        </div>
                        <div class="wrap mgt-10 grow" v-tap="{methods : toOrderDetail,params:pawn.orderId}">
                            <h5 class="text-deal">{{pawn.goodsName}}</h5>
                        </div>
                    </div>
                    <p class="card-footer">
                        <span>转卖金额:<span class="theme-font-color">￥{{pawn.backAmount}}</span></span>
                        <span class="fr link-btn-gray" v-tap="{methods : toOrderDetail,params:pawn.orderId}">查看详情</span>
                    </p>
                </div>
            </vue-better-scroll>
            <div class="no-data-msg" v-show="maxLen">
                <div class="ds-table">
                    <div class="ds-tell">
                        <img src="/thz/static/pic_wujilu@2x.png" width="120">
                        <p class="mgt-20 gray-font">暂无转卖订单记录~</p>
                    </div>
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
    	name: 'page-pawn-order',
        components: { VHeader,VueBetterScroll},
        data() {
			return {
                maxLen : false,
				pawnArr :[]
			}
		},
        mounted(){
            let _self = this;
            this.initData();
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            initData(){
                let _self = this;
                api.pawnList({}).then(res=>{
                    if(res.code=="200"){
                        _self.pawnArr = res.body.data;
                        if(_self.pawnArr.length==0){
                            _self.maxLen = true;
                        }
                    }else if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _self.$router.push("/login");
                        }
                    }else{
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });    
                    }
                })
            },
            toOrderDetail(e){
                sessionStorage.setItem("pawnOrderId",e.params);
                this.$router.push("/pawn-order-detail");
            }
        }
    }
</script>

<style lang="scss">
    .page-pawn-order{
        
    }
</style>