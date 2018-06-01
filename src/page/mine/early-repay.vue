<template>
    <transition name="move">
    	<div class="page-animate page-repayment">
            <v-header>
                <mt-header title="提前还款">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <p class="font-size-20 repay-title yinghuan">
                    <span>应还金额：</span>
                    <span class="font-size-24">{{earlyrepayObj.periodAmount}}元</span>
                </p>
                <section class="pd-all-20 repay-card">
                    <div class="flex more-icon item" v-tap="{methods:chooseCard,params:earlyrepayObj.bankCardId}">
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
                        <input type="tel" placeholder="最高还款xxx元" class="money early"/>
						<input type="tel" class="money1 early1"  />
						<input type="tel" class="money2 early2" disabled="disabled"  />
                        
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
				earlyrepayObj:{},
                commitFlag : false,				
                current : 1,
                other : false,
                other1:true,
                flag:false
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
				var data=JSON.parse(localStorage.getItem("userInfo"))
				api.bankInfoList({}).then(res=>{
					var userBankCardId=res.body[0].bankcardId;
					if(res.code == "200"){
							api.aheadrepaymentpre({userBankCardId:userBankCardId}).then(res=>{							
		                    if(res.code=="200"){
		                    	_self.earlyrepayObj = res.body;
		                    	var allRepayment=parseFloat(res.body.allRepayment);
		                    	var lowestRepayment=parseFloat(res.body.lowestRepayment);
		                    	$(".money1").val(parseFloat(res.body.lowestRepayment));
		                    	$(".money").attr("placeholder", "最高还款" + allRepayment + "元");
		                    	if(allRepayment == lowestRepayment) {
		                    		$(".money2").val(allRepayment);
									$(".money1").hide();
									$(".money2").show();
									$(".money").attr("disabled", "disabled");
									$(".money").css("background", "#fff");
		                    	}
		                    	$(".money1").on("click", function() {
									$(".money").focus();
									$(".money1").hide();
								})
		                    	$(".money").focus(function() {
									$(".money").css("text-align", "left")
									$(".money1").hide();
									
									if($(".money").val() != "") {
										$(".money").val();
									} else {
										$(".money").val($(".money1").val())
									}
									_self.other = true;			              
					                
								})
		                    	if(allRepayment  <= lowestRepayment){
		                    		$(".money").attr("disabled", "disabled");
		                    	}
		                    	$(".money").blur(function() {
									$(".money").css("width", "70%");
									$(".money").css("text-align", "right");
									if($(".money1").css("display") == "none") {
										$(".money").val()
									}	
								})					
		
								if(res.body.periodAmount == 0) {
									_self.periodCaptial=$(".money1").val()						
									
									$(".money").focus(function() {
										$(".money").css("text-align", "left")							
										_self.periodCaptial=$(".money").val()
									})
									$(".money").blur(function() {
										$(".money").css("width", "70%");
										$(".money").css("text-align", "right");
										_self.periodCaptial=$(".money").val()
									});
								}
								var isLess = parseFloat(allRepayment) <= parseFloat(lowestRepayment);
								if(isLess) {
									$(".money").attr("disabled", "disabled");
								}
							    _self.flag = true;
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
            commit(allRepayment,lowestRepayment,taskId,bankCardId1){
            	let _this=this;
            	_this.other = false; 
            	if(!_this.flag) {					
					return false;
				}
				let bankCardId = sessionStorage.getItem('bankCardId1');
				let repayMoney = _this.isLess ? allRepayment : $(".money").val()||lowestRepayment;
				if(!bankCardId) {
					bankCardId = bankCardId1;
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
				if(!_this.isLess) {
					// 输入还款金额大于当期应还金额
					if(parseFloat(repayMoney) - parseFloat(allRepayment) > 0) {
						layer.open({
	                        content:'还款金额不得大于最高还款金额' + allRepayment + '元'
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
						
						return false;
					}
					// 输入还款金额小于当期应还金额
					if(parseFloat(repayMoney) < parseFloat(lowestRepayment)) {
						layer.open({
	                        content:'还款金额不得小于最低还款金额' + lowestRepayment + '元'
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
						
						return false;
					}
				}
                this.commitFlag = true;
                let params = {taskId: taskId,bankCardId: bankCardId,repayMoney: repayMoney};
				api.askaheadrepay(params).then(res=>{
					sessionStorage.removeItem('bankCardId1')
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
                    }else if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _this.$router.push("/login")
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
            chooseCard(e){
            	sessionStorage.setItem("bankCardId",e.params)
                sessionStorage.setItem("hk-type","early");
                this.$router.push({
                    name : "ebankcard",
                    query:{current:this.current}
                });
                
            },
            jieq(allRepayment){
            	$(".money").val(allRepayment);
            	$(".zui").hide();
            	$(".money").css("width", "70%");
				$(".money").css("text-align", "right");
				
				this.periodCaptial=allRepayment;
				this.other = false;
            },
            low(lowestRepayment){
            	this.periodCaptial=lowestRepayment;
            	this.other = false;
            	$(".money").val(lowestRepayment);
            	$(".zui").hide();
            	$(".money").css("width", "70%");
				$(".money").css("text-align", "right");
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
<style lang="scss">
    $color:#F45051;
    .page-repayment{
        .wrapper{
            overflow-y:auto;
        }
        .mint-header {
            background-color: $color;
            color: #fff;
            border: none;
            border-bottom:none;
            height:41px;
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
        .early{
        	width:45%;
        	float: left;
        	font-size:15px;
        	line-height: 22px;
        	background:#fff;
        	color: #000;
        }
        .early1{
        	background:#fff;
        	display:block;
        	line-height: 22px;
        	text-align: right;
        	font-size:15px;width:25%;
        }
        .early2{
        	background:#fff;
        	display:none;
        	line-height: 22px;
        	text-align: right;
        	font-size:15px;
        	width:25%;
        }
        .line-ear{
        	height: 50px;
        }
        .repay-card{
            border-top-left-radius:10px;
            border-top-right-radius:10px;
            background:#fff;
            margin-top:-22px;
            width:100%;
        }
        .mint-cell-value{
        	margin-right: 10px;
        }
        .item{
            -box-shadow: 1px 1px 1px gray;
            -webkit-box-shadow: 0px 2px 5px gray;
            margin-bottom: 10px;
            border-radius:6px;
        }
        .mint-cell-title{
        	margin-left: 10px;
        }
        .blue-font{
            color:#7ABDC6;
        }
        .hkje-cls{
            padding : 14px 0;
            font-size:16px;
            .label{
                padding-left:10px;
                width: 25%;
                float: left;
                margin-top: 3px;
            }
            input{
                outline:none;
                border:none;
            }
        }
        .other{
            border:1px solid #E1E6E0;
            border-top:none;
            background:#fff;
            padding:12px 10px;
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
            border:1px solid #E1E6E0;
        }
        input:disabled, input[disabled]{ 
            color: #000; 
            -webkit-text-fill-color:#000; 
            -webkit-opacity:1; 
            opacity: 1; 
        }
    }
</style>