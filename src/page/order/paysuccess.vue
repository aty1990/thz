<template>
    <transition name="move">
    	<div class="page-animate page-success">
            <v-header>
                <mt-header title="订单支付成功">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <section class="wrapper">
                <div class="bg-white flex vertical">
                    <div class="mgt-20"><img src="/thz/static/jindudui2@2x.png"></div>
                    <span class="success-msg mgt-10 mgb-20">恭喜！订单支付成功</span>
                </div>
                <div class="weui_cells_access bg-white mgt-10">
                    <a class="weui_cell weui_person pdl-4" @click="toDetail(orderDetail.orderId,orderDetail.goodsId)">
                        <div class="weui_cell_bd weui_cell_primary title">订单信息</div>
                        <div class="weui-cell__ft">查看详情</div>
                    </a>
                    <a class="weui_cell weui_person pdl-4">
                        <div class="weui_cell_bd weui_cell_primary">订单号</div>
                        <div>{{orderDetail.orderId}}</div>
                    </a>
                    <a class="weui_cell weui_person pdl-4">
                        <div class="weui_cell_bd weui_cell_primary">商品名称</div>
                        <div class="text-deal1" style="width: 70%;text-align:right;">{{orderDetail.goodsName}}</div>
                    </a>
                    <a class="weui_cell weui_person pdl-4">
                        <div class="weui_cell_bd weui_cell_primary">配送地址</div>
                        <div>{{orderDetail.deliveryArea}}</div>
                    </a>
                     <a class="weui_cell weui_person pdl-4">
                        <div class="weui_cell_bd weui_cell_primary">收货人</div>
                        <div>{{orderDetail.deliveryName}} {{orderDetail.deliveryMobile.slice(0,3)}}****{{orderDetail.deliveryMobile.slice(7)}}</div>
                    </a>
                     <a class="weui_cell weui_person pdl-4">
                        <div class="weui_cell_bd weui_cell_primary">金额</div>
                        <div class="account">￥{{orderDetail.goodsAmount}}</div>
                    </a>
                </div>
            </section>
            <footer class="fixed-btm-btn flex">
                <mt-button type="primary" size="large" @click="gohome">继续逛逛</mt-button>
            </footer>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    export default {
    	name: 'page-success',
        components: { VHeader},
        data() {
			return {
                orderDetail : {} 
            }
		},
        mounted(){
            this.initData();
        },
		methods : {
            initData(){
                api.showOrder({goodId:sessionStorage.goodsId}).then((res)=>{
                    if(res.code=="200"){
                       this.orderDetail = res.body;
                    }else{
                        layer.open({
                             content: res.msg
                            ,skin: 'msg'
                            ,time: 3
                        });
                    }
                });  
            },
            toBack(){
                this.gohome();
            },
            gohome(){
                if(sessionStorage.nav=="payment"){
                    this.$router.go(-3);
                }else{
                    this.$router.go(-2);
                }
            },
            toDetail(orderId,goodsId){
                sessionStorage.setItem("orderId",orderId);
                sessionStorage.setItem("goodsId",goodsId);
                sessionStorage.orderType = "onlineOrder";
                sessionStorage.isLoan = 0;
                this.$router.push("/home/order/order-detail");
            }
        }
    }
</script>

<style lang="scss">
    @import '../../assets/scss/mixin';
    @import '../../assets/scss/color'; 
    .page-success{
        .weui_cell_primary{
            color: #9198A3;
            padding-left: 10px;
        }
        .weui-cell__ft{
            color: #9198A3;
        }
        .weui_cell{
            padding: 16px 15px;
        }
        .title{
            padding: 0;
            padding-left: px2rem(20);
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
                left:10px;
                top:-1px;
            }
        }
        .bg-white{
            background-color: #fff;
        }
        .success-msg{
            font-family: PingFangSC-Light;
            font-size: 15px;
            color: #333333;
            text-align: center;
        }
        .account{
            color:#D0021B;
        }
    }
</style>