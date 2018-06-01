<template>
    <transition name="move">
    	<div class="page-animate page-order-detail">
            <v-header>
                <mt-header title="转卖详情">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class ="wrapper  order-common-ui">
                <section class="flex pd-all-10">
                    <div class="img-wrap">
                        <img :src="pawnObj.goodsUrl">
                    </div>
                    <div class="flex grow vertical pdl-10 text-left">
                        <p class="text-deal font-size-12">{{pawnObj.goodsName}}</p>
                        <div class="mgt-16 flex full-w">
                            <h3 class="grow text-left">￥{{pawnObj.totalAmount}}</h3>
                        </div>
                    </div>
                </section>
                <p class="item pdt-16 pdb-12">转卖金额：<span class="fr  theme-font-color">￥{{pawnObj.backAmount}}</span></p>
                <p class="item pdt-12 pdb-12">转卖时间：<span class="fr">{{pawnObj.cashTime}}</span></p>
                <p class="item pdt-12 pdb-12">转卖公司：<span class="fr">{{pawnObj.cashCompany}}</span></p>
                <p class="item pdt-12 pdb-12">到账银行卡：<span class="fr">{{pawnObj.bankName}}(尾号{{pawnObj.bankCard?pawnObj.bankCard.slice(pawnObj.bankCard.length-4):""}})</span></p>
                <p class="item pdt-12 pdb-12 more-icon" @click="fqzd(pawnObj.taskId)">查看分期账单</p>
                <div class="order-wrap">
                   <p class="item pdt-12 pdb-12">订单号码：<span class="fr">{{pawnObj.orderId}}</span></p> 
                   <p class="item pdt-12 pdb-12">订单时间：<span class="fr">{{pawnObj.orderTime}}</span></p> 
                </div>
                <footer class="footer">
                    <span class="link-btn-gray" @click="kefu">联系客服</span>
                    
                </footer>
            </div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    export default {
    	name: 'page-order-detail',
        components: { VHeader},
        data() {
			return {
				pawnObj : {}
			}
		},
        mounted(){
            this.initData();
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            initData(){
                let _self = this;
                api.pawnOrderDetail({orderId:sessionStorage.getItem("pawnOrderId")}).then(res=>{
                    _self.pawnObj = res.body;
                })
            },
            kefu(){
                if(browser.versions.ios){
                    sessionStorage.setItem("selected","首页");
                    location.href = sessionStorage.getItem("kfLink");
                }else{
                    sessionStorage.setItem("from","pawndetail");
                    this.$router.push({
                        name :"pawnkefu"
                    });
                }
            },
            fqzd(taskId){
                sessionStorage.setItem("taskId",taskId);
                if(sessionStorage.getItem("taskId")){                	
                	this.$router.push("/home/fqzd");
                }
            }
        }
    }
</script>

<style lang="scss">
    .page-order-detail{
        .text-deal{
            width: 100%;
        }
    }
</style>