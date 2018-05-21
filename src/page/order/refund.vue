<template>
    <transition name="move">
    	<div class="page-animate page-refund">
            <v-header>
                <mt-header title="退款申请">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <section class=" pd-all-10 floatorder">
                    <div class="img-wrap float" style="width: 30%;">
                        <img v-bind:src="refund.goodsUrl">
                    </div>
                    <div class=" grow vertical pdl-10 text-left float">
                        <p class="text-deal font-size-12">{{refund.goodsName}}</p>
                        <div class="mgt-16 flex full-w">
                            <h3 class="grow text-left">￥{{refund.orderAmount}}</h3>
                        </div>
                    </div>
                </section>
                <ul>
                    <li class="flex li-item white-bg pdt-10 pdb-10" v-model="paramsObj.item1Text" @click="choose">
                        <span class="grow is-link">退款类型：<span class="fr wordrefund mgr-28">请选择</span></span>
                    </li>
                    <li class="flex li-item white-bg pdt-10 pdb-10">
                        <span class="grow mar">可退款金额：<span class="fr mgr-28">￥{{refund.orderAmount}}</span></span>
                    </li>
                </ul>
                <div class="flex text-left refund-desc  pdt-10 pdb-10">
                    <span class="mgr-1 mgl-8">退款说明：</span>
                    <input type="text" class="grow refundcon mgt-3" placeholder="选填" maxlength="30" :disabled="disabled"/>
                </div>
                <mt-actionsheet :actions="actions" v-model="sheetVisible" cancelText=""></mt-actionsheet>
                <div class="button-wrap mgt-20">
                    <mt-button type="primary" size="large" :disabled="btnState" @click="commit">提交申请</mt-button>
                </div>
                <div class="flex line-refund">申请退款前，请先与客服沟通确认退款事宜！</div>
                <router-view></router-view>
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
    	name: 'page-refund',
        components: { VHeader},
        data() {
			return {
				sheetVisible : false,
                btnState : true,
                saleFlag : false,
                disabled : false,
                actions : [],
                refund:{
					goodsName:"",
					goodsUrl:"",
					orderAmount:"",					
				},
				paramsObj : {
                    item1Text : "", 
                }
			}
		},
		mounted() {          
            this.initData();
            $.publish('app.removeItem');  

		},
		methods : {
			initData(){
				var _this = this;
				let orderId=this.$route.query.orderId;
				api.orderdetail({orderId:orderId}).then(res=>{
					if(res.code == 500){
            			layer.open({
		                    content: res.msg
		                    ,skin: 'msg'
		                    ,time: 2 
	                    });
            		}
            		if(res.code == 200){
		                _this.refund.goodsName=res.body.goodsName;
			            _this.refund.goodsUrl=res.body.goodsUrl;
			            _this.refund.orderAmount=res.body.orderAmount;
			            _this.actions.name=res.body.refundType.value;
			            $.each(res.body.refundType,function(i,ele){			            	   	
	                       _this.actions.push({name: ele.value,id: ele.key,method:_this.item});                     
	                    })
		            }
				})
			},
            toBack(){
                this.$router.back();
            },
            item(e){
                sessionStorage.setItem("refundType",e.id);
                $(".wordrefund").html(e.name);
                this.btnState = false;
            },
            choose(){
                if(!this.saleFlag){
                    this.sheetVisible = true;
                }
            },
            commit(){
            	let _self = this;	
                this.btnState = true;
            	let orderId=this.$route.query.orderId; 
            	let refundDescription=$(".refundcon").val();
            	if(!sessionStorage.getItem("refundType")){
            		layer.open({
		                content:"请选择退货类型"
		                ,skin: 'msg'
		                ,time: 2,
            	        })
            	}else{
                    let params = {
                        orderId:orderId,
                        refundType:sessionStorage.getItem("refundType"),
                        refundDescription:refundDescription
                    };
					api.refundapply(params).then(res=>{
						sessionStorage.removeItem("refundType");
                        $.publish('app.refreshOrderDetail');
                        $.publish('app.list');
						layer.open({
			                content: res.msg
			                ,skin: 'msg'
			                ,time: 4,
			                end:function(){
                                if(res.code=="200"){
                                    _self.saleFlag = true;
                                    _self.disabled = true;
                                    $.publish('app.refreshOrderDetail');
    			                    _self.$router.push({					
        								path:"/success",
        								query : {
        						            orderId  : orderId,
        						            refundId : res.body.refundId
        						        }							
        							});	
                                }
			                }
			            });	
					})
				}               
            },
            updateData(){
                this.refund = {};
                this.initData();   
            },
            open(picker) {
	        	this.$refs[picker].open();
	      	},
        }
    }
</script>

<style lang="scss">
    .page-refund{
        .img-wrap{
            width: 150px;
            img{
                width: 100%;
            }
        }
        .white-bg{
            background: #fff;
            padding: 5px 10px;
            font-size: 12px;
            line-height: 22px;
        }
        .full-w{
            width: 100%;
        }
        .float{
        	width: 70%;
        }
        .fr{
            float: right;
        }
        .mar{
        	margin-left: 10px;
        }
        .refund-desc{
            padding: 8px 10px;
            background: #fff;
            input{
                outline: none;
                border:none;
            }
            .mgt-3{
                margin-top: 3px;
            }
        }
        .line-refund{
        	line-height: 40px;
        	color: #888;
        }

        input:disabled, input[disabled]{ 
            color: #000; 
            -webkit-text-fill-color:#000; 
            -webkit-opacity:1; 
            opacity: 1; 
            background: #fff;
        }

    }
</style>