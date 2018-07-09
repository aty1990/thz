<template>
    <transition name="move">
    	<div class="page-animate page-wxpay">
            <v-header>
                <mt-header title="支付订单">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div class="flex vertical bg-white mgb-10">
                    <span class="prices mgb-10 mgt-20 font-size-20">￥{{goodsData.goodsAmount}}</span>
                    <span class="order-num mgb-20">淘花宅商城{{goodsData.orderId}}</span>
                </div>   
                <div class="bg-white">
                    <p class="title">选择支付方式</p>
                    <div>
                        <p class="flex pd-all-10 bottom-border-1 top-border-1" @click="playStyle(0)">
                            <i class="icon-wx scale-5"></i>
                            <span class="grow">微信支付</span>
                            <span><img :src="selectedIdx==0?uncheckedIcon[0]:uncheckedIcon[1]" class="scale-7"></span>
                        </p>
                    </div>
                </div>
                <footer class="fixed-btm-btn flex">
                    <mt-button type="primary" size="large" :disabled="disabled" @click="commit">确认支付</mt-button>
                </footer>
                <router-view />
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import {mapState,mapActions} from 'vuex'
    export default {
        components: { VHeader},
        data() {
			return {
                disabled : false
            }
		},
        computed : {
            ...mapState({
                uncheckedIcon : (state) => state.wxpay.uncheckedIcon,
                selectedIdx : (state) => state.wxpay.selectedIdx,
                goodsData : (state) => state.wxpay.goodsData
            })
        },
		mounted() {
            this.initData(); 
		},
		methods : {
            ...mapActions({
                initData : "wxpay/initData",
                playStyle : "wxpay/playStyle",
                commitData : "wxpay/commitData"
            }),
            toBack(){
                this.$router.back();
            },
            commit(){
                this.disabled = true;
                this.commitData(this);
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/mixin';
    @import '../../assets/scss/color'; 
    .page-wxpay{
        .bottom-border-1{
            border-bottom: 1px solid #F2F2F2;
        }
        .top-border-1{
            border-top: 1px solid #F2F2F2;
        }
        .bg-white{
            background-color: #fff;
        }
        .prices{
            font-family: PingFangSC-Medium;
            font-size: px2rem(20);
            color: #D0021B;
            text-align: center;
        }
        .order-num{
            font-family: PingFangSC-Light;
            font-size: px2rem(12);
            color: #9198A3;
            letter-spacing: 0;
            line-height: px2rem(16);
        }
        .title{
            padding: px2rem(14) 0;
            padding-left: px2rem(36);
            font-family: PingFangSC-Regular;
            font-size: px2rem(14);
            color: #333333;
            position: relative;
            &:before{
                content:"";
                position: absolute;
                width: px2rem(2);
                height: px2rem(16);
                background-color: $theme-bg-color;
                left:18px;
                top:px2rem(12);
            }
        }
    }
</style>