<template>
    <transition name="move">
    	<div class="page-animate page-repayment">
            <v-header>
                <mt-header title="还款">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper iscroll repayment-wrap" v-if="hasData">
                <p class="font-size-20 repay-title">
                    <span>剩余金额：</span>
                    <span class="font-size-24">{{repayObj.periodAmount}}元</span>
                </p>
                <div class="pd-all-20 repay-card">
                    <div class="flex more-icon item pdt-6 pdb-6" v-tap="{methods:chooseCard,params:repayObj.bankCardId}">
                        <div class="w-60 pd-all-4"><img :src="repayObj.bankLogo" width="100%"></div>
                        <div class="grow pd-all-4 font-size-14">
                            <p class="pd-all-4">{{repayObj.bankName}}</p>
                            <p class="pdl-4">尾号{{repayObj.accountNo?repayObj.accountNo.slice(repayObj.accountNo.length-4):""}}</p>
                        </div>
                    </div>
                    <mt-cell class="item" title="含本金">{{repayObj.periodCaptial}}</mt-cell>
                    <mt-cell class="item" title="含利息">{{repayObj.interestAmount}}</mt-cell>
                    <mt-cell class="item" title="含服务费">{{repayObj.serviceAmount}}</mt-cell>
                    <mt-cell class="item" title="含逾期费">{{repayObj.penaltyAmount}}</mt-cell>
                    <!-- <mt-cell class="item" title="支付手续费">{{repayObj.charge}}</mt-cell> -->
                    <mt-cell class="item" title="还款金额">
                    	<input type="tel" class="blue-font repay-money" v-model="repayMoney" :disabled="disabled" @focus="clearText" @blur="resetText" @input="lst"/>
                    </mt-cell>
                    <div class="mgt-20">
                        <mt-button type="primary" size="large" :disabled="commitFlag" @click="commit(repayObj.periodAmount,repayObj.lowestRepayment,repayObj.taskId)">确认还款</mt-button>
                    </div>
                </div>
            </div>
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
    import api from '@/fetch/api'
    export default {
        components: { VHeader },
        data() {
			return {
                commitFlag : false,
                hasData : false,
                repayMoney : "",
                disabled : false,
                isLess :"",
                repayObj : {}
            }
		},
		mounted() {
            this.initData();
		},
		methods : {
			initData(){
                let _self = this;
                api.bankInfoList({}).then(res=>{
					if(res.code == 200){						
		                api.repaymentpre({periodNum:sessionStorage.getItem("periodNum"),userBankCardId:res.body[0].bankcardId }).then(res=>{		                    
		                    if(res.code=="500"){
		                    	layer.open({
			                        content: res.msg
			                        ,skin: 'msg'
			                        ,time: 2 
			                    });
		                    }
		                    if(res.code=="200"){ 
		                    	_self.repayObj = res.body;
                                _self.repayMoney = res.body.periodAmount;
                                _self.hasData = true;
		                    	_self.isLess = Number(res.body.periodAmount) <= Number(res.body.lowestRepayment);
								if(this.isLess) {				
							        this.disabled = true;
							    }
		                    }
		                })
                    }
				})
            },
            toBack(){
                this.$router.back();
            },
            clearText(){
                this.repayMoney = "";
                this.lst();
            },
            resetText(){
                this.repayMoney = this.repayMoney?this.repayMoney:this.repayObj.periodAmount;
                this.lst();
            },
            lst(){
                this.commitFlag = this.repayMoney?false:true;
            },
            commit(periodAmount,lowestRepayment,taskId){
            	let _this = this;
				// 应还金额大于最低还款金额 
				if(!_this.isLess){
					// 输入还款金额大于当期应还金额
					if(Number(this.repayMoney) > Number(periodAmount)){
						layer.open({
	                        content:'还款金额不得大于最高还款金额' + periodAmount + '元'
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
						return false;
					}
					// 输入还款金额小于当期应还金额
					if(Number(this.repayMoney) < Number(lowestRepayment)){
						layer.open({
	                        content:'还款金额不得小于最低还款金额' + lowestRepayment + '元'
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
						return false;
					}
				}
                if(this.repayMoney){
                    let early = Number(this.repayMoney)+"";
                    if(early.indexOf(".")!=-1){
                        let regu = "^[0-9]+[\.][0-9]{0,2}$";   
                        let re = new RegExp(regu);   
                        if (!re.test(early)){   
                            layer.open({
                                content:'还款金额只能保留两位小数'
                                ,skin: 'msg'
                                ,time: 2 
                            });
                            return;   
                        }
                    }
                }else{
                    layer.open({
                        content:'还款金额有误'
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return;   
                }
                let params = {                    
                    taskId : taskId,
                    bankCardId : this.repayObj.bankCardId,
                    periodNum : sessionStorage.periodNum,
                    repayMoney : this.repayMoney                   
                }
                this.commitFlag = true;
                api.askrepay(params).then(res=>{
                    if(res.code=="200"){
	                    layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2,
	                        end:function(){
	                        	_this.$router.replace({name:"fqzd"});
	                        	_this.$parent.loadData();
	                        }
	                    });
                    }else{
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2 
                        });
                        this.commitFlag = false;
                    }
                })
            },
            chooseCard(e){
                sessionStorage.setItem("bankCardId",e.params);
                sessionStorage.setItem("hk-type","repay");
                this.$router.push("/repay/bankcard");
            },
            modifyCard(obj){
            	sessionStorage.setItem('bankCardId1',obj.bankCardId)
                this.repayObj.bankName = obj.bankName;
                this.repayObj.accountNo = obj.bankDown;
                this.repayObj.bankCardId = obj.bankCardId;
                this.repayObj.bankLogo = obj.bankLogo;
            },
            loadData(){
                this.initData();
            }
        }
    }
</script>
<style lang="scss">
    @import '../../assets/scss/mixin';
    @import '../../assets/scss/color';
    .page-repayment{
        background-color: $text-white-color;
       .mint-header {
            background-color: $theme-bg-color;
            color: $text-white-color;
            border: none;
            border-bottom:none;
            height:41px;
        }
        .iscroll{
            overflow-y:auto; 
        }
        .repay-title{
            background-color: $theme-bg-color;
            color:$text-white-color;
            padding:40px 0 40px 20px;
        }
        .w-60{
            width:60px;
        }
        .more-icon{
            background: url("/thz/static/href.png") scroll 94% 50% no-repeat;
            background-size: 20px;
            background-color: $text-white-color;
        }
        .repay-card{
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            background:$text-white-color;
            margin-top:-22px;
            width:100%;
        }
        .item{
            -box-shadow: 0px 2px 5px gray;
            -webkit-box-shadow: 0px 2px 5px gray;
            margin-bottom: px2rem(14);
            border-radius:px2rem(6);
            padding: 0 px2rem(10);
        }
        .blue-font{
            color:#000;
        }
        .mint-cell-text{
        	margin-left: 10px;
        }
        .mint-cell-value{
        	margin-right: 10px;
        }
        .repay-money{
        	background: rgba(0,0,0,0);
        	border: none;
        	text-align: right;
        	outline: none;
        }
    }
</style>