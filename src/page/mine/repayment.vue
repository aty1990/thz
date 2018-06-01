<template>
    <transition name="move">
    	<div class="page-animate page-repayment">
            <v-header>
                <mt-header title="还款">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper iscroll repayment-wrap">
                <p class="font-size-20 repay-title">
                    <span>剩余金额：</span>
                    <span class="font-size-24">{{repayObj.periodAmount}}元</span>
                </p>
                <section class="pd-all-20 repay-card">
                    <div class="flex more-icon item" v-tap="{methods:chooseCard,params:repayObj.bankCardId}">
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
                    	<input type="tel" class="yinhuan1 blue-font"/>
                    </mt-cell>
                    <div class="mgt-20">
                        <mt-button type="primary" size="large" :disabled="commitFlag" @click="commit(repayObj.periodAmount,repayObj.lowestRepayment,repayObj.taskId,repayObj.bankCardId)">确认还款</mt-button>
                    </div>
                </section>
            </div>
            <router-view></router-view>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    export default {
    	name: 'page-repayment',
        components: { VHeader },
        data() {
			return {
                name : "",
                commitFlag : false,
                no : "",
                userInfo : "",
                isLess :"",
                repayObj : {}
            }
		},
		mounted() {
            if(sessionStorage.getItem('bankCardId1')){
                sessionStorage.removeItem('bankCardId1');
            }
            this.initData();
		},
		methods : {
			initData(){
                let _self = this;
                this.userInfo =JSON.parse(localStorage.getItem("userInfo"));
                api.bankInfoList({}).then(res=>{
					var userBankCardId=res.body[0].bankcardId;
					if(res.code == 200){						
		                api.repaymentpre({periodNum:sessionStorage.getItem("periodNum"),userBankCardId:userBankCardId }).then(res=>{		                    
		                    if(res.code=="500"){
		                    	layer.open({
			                        content: res.msg
			                        ,skin: 'msg'
			                        ,time: 2 
			                    });
		                    }
		                    if(res.code=="200"){ 
		                    	_self.repayObj = res.body;
                                $(".yinhuan1").val(res.body.periodAmount);
		                    	var periodAmount=res.body.periodAmount;
		                    	var lowestRepayment=res.body.lowestRepayment;
		                    	this.isLess = parseFloat(periodAmount) <= parseFloat(lowestRepayment);
								if(this.isLess) {				
							      $(".yinhuan1").attr("disabled", "disabled");
							    }
		                    }
		                })
                    }
				})
            },
            toBack(){
                this.$router.back();
            },
            commit(periodAmount,lowestRepayment,taskId,bankCardId1){
            	let _this = this;
            	var bankCardId = sessionStorage.getItem('bankCardId1');
				var repayMoney = _this.isLess ? periodAmount : $(".repayment-wrap .yinhuan1").val();
				if(!bankCardId) {
					bankCardId = bankCardId1;
				}
				// 应还金额大于最低还款金额 
				if(!_this.isLess){
					// 输入还款金额大于当期应还金额
					if(parseFloat(repayMoney) > parseFloat(periodAmount)){
						layer.open({
	                        content:'还款金额不得大于最高还款金额' + periodAmount + '元'
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
						return false;
					}
					// 输入还款金额小于当期应还金额
					if(parseFloat(repayMoney) < parseFloat(lowestRepayment)){
						layer.open({
	                        content:'还款金额不得小于最低还款金额' + lowestRepayment + '元'
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
						
						return false;
					}
				}
                
                if(repayMoney){
                    let early = parseFloat(repayMoney)+"";
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
                    bankCardId : bankCardId,
                    periodNum : sessionStorage.getItem("periodNum"),
                    repayMoney : repayMoney                   
                }
                this.commitFlag = true;
                api.askrepay(params).then(res=>{
                    if(res.code=="500"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 ,
	                        end:function(){
	                        	this.initData();
	                        }
	                    });
                    }
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
                    }
                })
            },
            chooseCard(e){
                sessionStorage.setItem("bankCardId",e.params);
                sessionStorage.setItem("hk-type","repay");
                this.$router.push({name : "bankcard"});
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
    $color:#F45051;
    .page-repayment{
       .mint-header {
            background-color: $color;
            color: #fff;
            border: none;
            border-bottom:none;
            height:41px;
        }
        .iscroll{
            overflow-y:auto; 
        }
        .repay-title{
            background-color: $color;
            color:#fff;
            padding:40px 0 40px 20px;
        }
        .w-60{
            width:60px;
        }
        .more-icon{
            background: url("/thz/static/href.png") scroll 98% 50% no-repeat;
            background-size: 20px;
            background-color: #fff;
        }
        .repay-card{
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            background:#fff;
            margin-top:-22px;
            width:100%;
        }
        .item{
            -box-shadow: 1px 1px 1px gray;
            -webkit-box-shadow: 0px 2px 5px gray;
            margin-bottom: 10px;
            border-radius:6px;
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
        .yinhuan1{
        	background: rgba(0,0,0,0);
        	border: none;
        	text-align: right;
        	outline: none;
        }
    }
</style>