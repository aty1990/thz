<template>
    <transition name="move">
    	<div class="page-animate page-repayment">
            <v-header>
                <mt-header title="提前还款">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper" v-if="hasData">
                <p class="font-size-20 repay-title yinghuan">
                    <span>应还金额：</span>
                    <span class="font-size-24">{{earlyrepayObj.periodAmount}}元</span>
                </p>
                <section class="pd-all-20 repay-card">
                    <div class="flex more-icon item pdt-6 pdb-6" v-tap="{methods:chooseCard,params:earlyrepayObj.bankCardId}">
                        <div class="w-60 pd-all-4"><img v-bind:src="earlyrepayObj.bankLogo" width="90%"></div>
                        <div class="grow pd-all-4 font-size-14">
                            <p class="pd-all-4">{{earlyrepayObj.bankName}}</p>
                            <p class="pdl-4">尾号{{earlyrepayObj.accountNo?earlyrepayObj.accountNo.slice(earlyrepayObj.accountNo.length-4):""}}</p>
                        </div>
                    </div>
                    <mt-cell class="item periodCaptial" title="含本金">{{earlyrepayObj.periodCaptial}}</mt-cell>
                    <mt-cell class="item" title="含利息">{{earlyrepayObj.interestAmount}}</mt-cell>
                    <mt-cell class="item" title="含服务费">{{earlyrepayObj.serviceAmount}}</mt-cell>
                    <mt-cell class="item" title="含逾期费">{{earlyrepayObj.penaltyAmount}}</mt-cell>
                    <!-- <mt-cell class="item" title="支付手续费">{{earlyrepayObj.charge}}</mt-cell> -->
                    <div class=" item hkje-cls line-ear">
                        <h5 class="label">还款金额&nbsp;&nbsp;</h5>
                        <input type="tel" :placeholder="placeholder"  class="repay-money" v-model="repayMoney" @focus="lstValus" @input="lst"/>
                    </div>
                    <div v-show="other">
                    	<p class="other"  @click="jieq(earlyrepayObj.allRepayment)">
	                        <span class="blue-font mgr-10">全部结清</span>
	                        <span class="blue-font">{{earlyrepayObj.allRepayment}}元<span class="font-size-10 gray-font">（=未还账单金额+逾期金额+违约金）</span></span>
	                    </p>
	                    <p class="other"  @click="low(earlyrepayObj.lowestRepayment)">
	                        <span class="blue-font mgr-10">最低还款</span>
	                        <span class="blue-font">{{earlyrepayObj.lowestRepayment}}元<span class="font-size-10 gray-font">（=逾期金额或最低还款额）</span></span>
	                    </p>
                    </div>
                    <div class="mgt-20">
                        <mt-button type="primary" size="large" :disabled="commitFlag" @click="commit(earlyrepayObj.allRepayment,earlyrepayObj.lowestRepayment,earlyrepayObj.taskId,earlyrepayObj.bankCardId)">确认还款</mt-button>
                    </div>
                </section>
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
    	name: 'page-repayment',
        components: { VHeader },
        data() {
			return {
				earlyrepayObj:{},
                placeholder : "最高还款xxx元",
                submitFlag : false,
                periodCaptial : "",
                repayMoney : "",
                commitFlag : true,	
                current : 1,
                other : false,
                hasData : false,
                other1:true,
                flag:false
            }
		},
		mounted() {
			this.initData();  
		},
		methods : {
			initData(){
				let _self = this;
				api.bankInfoList({}).then(res=>{
					let userBankCardId = res.body[0].bankcardId;
					if(res.code == "200"){
							api.aheadrepaymentpre({userBankCardId:userBankCardId}).then(res=>{							
		                    if(res.code=="200"){
		                    	_self.earlyrepayObj = res.body;
                                _self.$nextTick(()=>{
                                    _self.hasData = true;
                                    let allRepayment = Number(res.body.allRepayment);
                                    let lowestRepayment= Number(res.body.lowestRepayment);
                                    _self.periodCaptial = res.body.lowestRepayment;
                                    _self.placeholder =  "最高还款" + allRepayment + "元";
                                    _self.submitFlag = Number(allRepayment) <= Number(lowestRepayment)?true:false;
                                });
		                    }
						})
					}else if(res.code=="111"){
	                    window.location.href='${project.domain}/index';
	                }else{
						layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2
	                    });
					}
				})
			},
            toBack(){
                this.$router.back();
            },
            lst(){
                this.commitFlag = this.repayMoney.length>0?false:true;
            },
            lstValus(){
                this.commitFlag = this.repayMoney.length>0?false:true;
                this.other = true;    
            },
            commit(){
            	let _self = this;
            	_self.other = false; 
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
                // 输入还款金额大于当期应还金额
                if(Number(this.repayMoney) - Number(this.earlyrepayObj.allRepayment) > 0){
                    layer.open({
                        content:'还款金额不得大于最高还款金额' + this.earlyrepayObj.allRepayment + '元'
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return false;
                }
                // 输入还款金额小于当期应还金额
                if(Number(this.repayMoney) < Number(this.earlyrepayObj.lowestRepayment)) {
                    layer.open({
                        content:'还款金额不得小于最低还款金额' + this.earlyrepayObj.lowestRepayment + '元'
                        ,skin: 'msg'
                        ,time: 2 
                    });
                    return false;
                }
                let params = {
                    taskId: this.earlyrepayObj.taskId,
                    bankCardId: this.earlyrepayObj.bankCardId,
                    repayMoney: this.repayMoney
                };
                api.askaheadrepay(params).then(res=>{
                    if(res.code=="200"){                        
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2,
                            end:function(){
                                _self.$router.replace({name:"fqzd"});
                                _self.$parent.loadData();
                            }
                        });
                    }else if(res.code=="111"){
                        // 判断安卓和微信
                       _self.$router.push("/login")
                    }else{
                        this.commitFlag = false;
                        layer.open({
                            content: res.msg
                            ,skin: 'msg'
                            ,time: 2
                        });
                    }
                })
            },
            chooseCard(e){
            	sessionStorage.setItem("bankCardId",e.params)
                sessionStorage.setItem("hk-type","early");
                this.$router.push({
                    name : "ebankcard",
                    query:{current:this.current}
                });
            },
            jieq(allRepayment){
                this.repayMoney = allRepayment;
                this.commitFlag = false;
            },
            low(lowestRepayment){
                this.repayMoney = lowestRepayment;
                this.commitFlag = false;
            },
            modifyCard(obj){
            	sessionStorage.setItem('bankCardId1',obj.bankCardId)
                this.earlyrepayObj.bankName = obj.bankName;
                this.earlyrepayObj.accountNo = obj.bankDown;
                this.current = obj.current;
                this.earlyrepayObj.bankCardId = obj.bankCardId;
                this.earlyrepayObj.bankLogo = obj.bankLogo;               
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
    .page-repayment{
        background-color: $text-white-color;
        .wrapper{
            overflow-y:auto;
        }
        .mint-header {
            background-color: $theme-bg-color; 
            color: #fff;
            border: none;
            border-bottom:none;
            height:41px;
        }
        .repay-title{
            background-color: $theme-bg-color;
            color:#fff;
            padding:px2rem(40) 0 px2rem(40) px2rem(20);
        }
        .w-60{
            width:px2rem(60);
        }
        .more-icon{
            background: url("/thz/static/href.png") scroll 94% 50% no-repeat;
            background-size: px2rem(20);
            background-color: #fff;
        }
        .repay-money{
            width: 72%;
            text-align:right;
        }
        .line-ear{
        	height: 50px;
        }
        .repay-card{
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            margin-top:px2rem(-22);
            background:$text-white-color;
            width:100%;
        }
        .mint-cell-value{
        	margin-right: px2rem(10);
        }
        .item{
            -webkit-box-shadow: 0px 2px 5px gray;
            -box-shadow: 1px 1px 1px gray;
            margin-bottom: px2rem(14);
            border-radius:px2rem(6);
            padding: 0 px2rem(10);
        }
        .mint-cell-title{
        	margin-left: px2rem(10);
        }
        .blue-font{
            color:$text-blue-color;
        }
        .hkje-cls{
            padding : px2rem(14) 0;
            font-size:px2rem(16);
            .label{
                padding-left:px2rem(10);
                width: 25%;
                float: left;
                margin-top: px2rem(3);
            }
            input{
                outline:none;
                border:none;
            }
        }
        .other{
            border:px2rem(1) solid #E1E6E0;
            border-top:none;
            background:#fff;
            padding:px2rem(12) px2rem(10);
        }
        .other1{
        	background: rgba(0,0,0,0);
        	float: right;
        	width: 30%;
        }
        .zui{
        	width: 40%;
        }
        .has-border{
            border:px2rem(1) solid #E1E6E0;
        }
        input:disabled, input[disabled]{ 
            color: #000; 
            -webkit-text-fill-color:#000; 
            -webkit-opacity:1; 
            opacity: 1; 
        }
    }
</style>