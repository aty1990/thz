<template>
    <transition name="move">
        <div class="page-animate pay-msg-detail">
            <v-header>
                <mt-header title="交易详情">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div style="text-align: center;">
				<p class="details_bank">
					<img class="iconUrl" v-bind:src="paydetails.iconUrl" style="width: 25px;vertical-align: middle;"/>
					&nbsp;&nbsp;
					<span class="bankName">{{paydetails.bankName}}</span>
				</p>
				<p class="details_mon amount">{{paydetails.amount}}</p>
				<p class="details_over typeName">{{paydetails.typeName}}</p>
			</div>
			<div class="details_li">				
				<div class="li" >
					<p class="com_left">交易类型</p>
					<p class="com_right type">{{paydetails.type}}</p>
				</div>
				<div class="li" style="border-bottom: 1px solid #f1f1f1;">
					<p class="com_left">备注</p>
					<p class="com_right paymentName">{{paydetails.paymentName}}</p>
				</div>
				<div class="li" >
					<p class="com_left">交易时间</p>
					<p class="com_right time">{{paydetails.time}}</p>
				</div>
				<div class="li" style="width: 100%;display: inline-block;">
					<p class="com_left" style="width: 20%;">流水号</p>
					<p class="com_right transId">{{paydetails.transId}}</p>
				</div>
			</div>
        </div>
    </transition>
</template>

<script>
  
    import VHeader from '@/components/header'
    import api from '@/fetch/api.js'
    export default {
        name: 'pay-msg-detail',
        components: {VHeader},
        data () {
            return {
            	paydetails :{
            		bankName:"",
            		amount:"",
            		typeName:"",
            		type:"",
            		paymentName:"",
            		time:"",
            		transId:"",
            		charge:"",
            		iconUrl:""
            	}
            }
        },
        mounted(){
        	this.initData();
        },
        methods : {
        	initData(){
        		var _this = this;
        		let transId=this.$route.query.transId;
        		let type=this.$route.query.type;
				api.detail({transId:transId,type:type}).then(res=>{
                    if(res.code=="500"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
                    }
                    if(res.code=="200"){
                    	if(type == 1){
                    		$(".type").html("收入");
                    	}
                    	if(type == 2){
                    		$(".type").html("支出");
                    	}
                    	if(res.body.charge){
							if(res.body.charge != ""){
							 $(".charge1").show();
							 _this.paydetails.charge=res.body.charge;
						    }else{
						     $(".charge1").hide();	
						    }
						}
                    	_this.paydetails.bankName=res.body.bankName;                   	     
                    	_this.paydetails.amount=res.body.amount;
                    	_this.paydetails.typeName=res.body.typeName;                   	                         	
                    	_this.paydetails.paymentName=res.body.paymentName;                   	     
                    	_this.paydetails.time=res.body.time;
                    	_this.paydetails.transId=res.body.transId;                   	     
                    	_this.paydetails.iconUrl=res.body.iconUrl;
					}                   
                });
        	},
            toBack(){
                this.$router.back();
            }
        }
    }
</script>
<style lang="scss">
    .pay-msg-detail{
    	font-size: 15px;
    	background: #fff;
        .charge1{display: none;}
    	.li{word-break: break-all;height: 40px;margin: 5px 0;}    	
    	.details_mon{font-weight: 600;font-size: 30px;padding-top: 20px;}
    	.details_bank{padding-top: 20px;}
    	.details_over{padding-top: 20px;color: #909090;}
    	.details_li{padding-top: 30px;width: 96%;margin-left: 2%; }
    	.com_left{float: left;color: #909090;}
    	.com_right{float: right;} 
    	.transId{width: 80%;text-align: right;}
    }
</style>

