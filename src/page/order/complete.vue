<template>
    <transition name="move">
    	<div class="page-animate page-complete">
            <v-header>
                <mt-header title="淘花宅">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div>
                    <div></div>
                    <div class="com-plete">
                        <p><img class="img-com" src="/thz/static/jindudui2@2x.png"/><span style="margin-left: 10px;color: rgb(85,176,85);">出售成功，已提交银行处理</span></p>
                        <p class="gray-font" style="margin-left: 50px;">{{resultObj.CardBankName}}(尾号：{{resultObj.BankCard?resultObj.BankCard.slice(resultObj.BankCard.length-4):""}})</p>
                        <p class="gray-font" style="margin-left: 50px;">￥{{resultObj.price}}</p>
                        <div class="line-com "></div>
                    </div>
                  
                    <div class="com-plete"><img class="img-com" src="/thz/static/jindudui1@2x.png"/>
                      <span class="font-size-18" style="margin-left: 10px;">预计{{resultObj.hour}}时{{resultObj.minute}}分到账</span>  
                    </div>
                </div>
                <div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" @click="commit" class="font-size-14" :disabled="disabled">完成</mt-button>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    import VuePickers from 'vue-pickers'
    export default {
    	name: 'page-refund',
        components: { VHeader,VuePickers},
        data() {
			return {
                disabled : false,
				resultObj :{}
			}
		},
		mounted() {          
            this.initData();   
		},
		methods : {
			initData(){
                let _self = this;
                api.withdrawing({}).then(res=>{
                    _self.resultObj = res.body;
                })
			},
            toBack(){
                this.$router.back();
            },
            commit(){
                this.disabled = true;
                $.publish('app.list');
                $.publish('app.refreshOrderDetail');
                this.$router.back();
            }
        }
    }
</script>

<style lang="scss">
    .page-complete{
       .com-plete{
       	width: 80%;
       	margin-left: 15%;
       	margin-top: 40px;
       	position: relative;
       }
       .line-com{
       	width: 74%;
       	margin-left: 13%;
       	height: 70px;
       	border-left: 2px solid #888;
       	position: absolute;
       	top: 40px;
       	left: -20px;
       }
       .img-com{
       		width: 40px;
       		vertical-align: middle;
       	}
    }
</style>