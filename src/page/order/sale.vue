<template>
    <transition name="move">
    	<div class="page-animate page-sale">
            <v-header>
                <mt-header title="换钱">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <p class="pd-all-10 gray-font font-size-12" v-if="!flag">平台与第三方合作,根据您的订单匹配最优的交易价格</p>
                <section class=" pd-all-10 flex" v-if="goodsObj.goodspic">
                    <div class="img-wrap float">
                        <img :src="goodsObj.goodspic">
                    </div>
                    <div class=" grow vertical pdl-10 text-left">
                        <p class="text-deal font-size-12">{{goodsObj.goodsname}}</p>
                        <div class="mgt-6 flex full-w vertical text-left">
                            <p class="font-size-10 full-w" >购买价格</p>
                            <h3 class="grow full-w">￥{{goodsObj.buyprice}}</h3>
                        </div>
                    </div>
                </section>

                <div class="weui_cells_access mgt-10 white-bg" v-if="goodsObj.goodspic">
                    <a class="weui_cell weui_person pdl-10">
                        <div class="weui_cell_bd weui_cell_primary title">买家：</div>
                        <div>{{goodsObj.sellcompany}}</div>
                    </a>
                    <a class="weui_cell weui_person pdl-10">
                        <div class="weui_cell_bd weui_cell_primary">出价：</div>
                        <div><span class="fr" style="color:red;">￥{{goodsObj.sellprice}}</span></div>
                    </a>
                    <a class="weui_cell weui_person pdl-10" @click="chooseAddr">
                        <div class="weui_cell_bd weui_cell_primary">到账银行卡：</div>
                        <div class="weui-cell__ft">
                            <span>{{goodsObj.CardBankName}} </span>
                            <span>({{goodsObj.wageCard}})</span>
                        </div>
                    </a>
                </div>
                <div class="button-wrap mgt-20" v-if="goodsObj.goodspic">
                    <mt-button type="primary" size="large" :disabled="btnState" @click="commit" class="font-size-16">确认出售</mt-button>
                </div>
                <div class="flex mgt-80 vertical" v-if="flag">
                    <img src="/thz/static/pic_wujilu@2x.png" width="50%">
                    <p class="mgt-20 gray-font">订单正在处理中...</p>
                </div>
                <router-view />
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import { Actionsheet } from 'mint-ui';
    import Vue from 'vue'
    import api from '@/fetch/api.js'
    export default {
        components: { VHeader},
        data() {
			return {
                btnState : false,
                goodsObj : {},
                flag : false
			}
		},
		mounted() {
            this.initData(); 
            this.initEvent();
		},
		methods : {
			initData(){
				let _self = this;
				api.withdraws({orderId:sessionStorage.orderId}).then(res=>{
                    // orderStatus 等于C才可以转卖
                    if(res.body.orderStatus=="C"){
                        _self.goodsObj = res.body;
                    }else{
                        _self.flag = true;
                    }
				})
			},
            initEvent(){
                this.$on("updateCard",(res)=>{
                    this.goodsObj.CardBankName = res.bankName;
                    this.goodsObj.wageCard = res.bankDown;
                    this.goodsObj.userBankId = res.bankcardId;
                })
            },
            toBack(){
                $.publish('app.list');
                $.publish('app.refreshOrderDetail');
                this.$router.back();
            },
            commit(){
            	let _self = this;
                layer.open({
                    content: '确认出售该商品？'
                    ,style: 'width:80%;'
                    ,anim :'up'
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        _self.btnState = true;
                        _self.goDeal();
                        layer.close(index);
                    }
                });
            },
            goDeal(){
                let _self = this;
                api.wxaskwithdraw({bankCardId:_self.goodsObj.userBankId,orderId:sessionStorage.orderId}).then(res=>{
                    if(res.code=="200"){
                        layer.open({
                            content:"出售成功"
                            ,skin: 'msg'
                            ,time: 2,
                            end : function(){
                                $.publish('app.list');
                                $.publish('app.refreshOrderDetail'); 
                                _self.$router.replace({name:"complete"});
                            }
                        })
                    }else{
                        layer.open({
                            content:res.msg
                            ,skin: 'msg'
                            ,time: 2
                        })
                        _self.btnState = false;
                    }
                })
            },
            chooseAddr(){
                this.$router.push("/home/hmyCard");
            }
        }
    }
</script>

<style lang="scss">
    .page-sale{
        .img-wrap{
            width: 70px;
            img{
                width: 100%;
            }
        }
        .white-bg{
            background: #fff;
            font-size: 14px;
        }
        .full-w{
            width: 100%;
        }
        .fr{
            float: right;
        }
        .mar{
        	margin-left: 10px;
        }
        .has-check-icon{
            background: url("/thz/static/icon_duihao@2x.png") scroll 10px 35% no-repeat;
            background-size: 14px;
            padding: 5px 0 5px 30px;
        }
        .li-item{
            padding: 20px 10px 20px 0px;
        }
        .weui_cell{
            padding: 16px 15px;
        }
    }
</style>