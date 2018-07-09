<template>
    <transition name="move">
    	<div class="page-animate page-logistics">
            <v-header>
                <mt-header title="物流详情">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <section class="wrapper page-logistics-wrap">
                <p class="pd-all-10 gray-bg gray-font font-size-12">
                    您的退款申请已通过审核,请尽快将商品寄回！(请保证退回的商品完好无损)
                </p>
                <section class="white-bg pd-all-10">
                    <p class="items">退货地址：</p>
                    <p class="items">{{logistics.address}}</p>
                    <p class="items">收件人：{{logistics.recipient}}</p>
                    <p class="items">电话：{{logistics.tel}}</p>
                    <mt-cell title="物流公司：" class="line" @click.native="choose">{{paramsObj.expressName}}</mt-cell>
                     <div class="flex text-left line refund-desc" style="padding: 15px 0;">
                        <span class="mgr-10">退款单号：</span>
                        <input type="text" v-model="refundNo" class="grow mgt-3" placeholder="" @input="lst"/>
                    </div>
                    <div class="flex text-left line refund-desc" style="padding: 15px 0;">
                        <span class="mgr-10">联系电话：</span>
                        <input type="tel" v-model="consignorTel" class="grow mgt-3" placeholder=""  @input="lst"/>
                    </div>
                                    
                    <div class="flex text-left line refund-desc" style="padding: 15px 0;">
                        <span class="mgr-10">退款说明：</span>
                        <input type="text" v-model="refundDesc" class="grow mgt-3" placeholder="选填" />
                    </div>

                    <div class="button-wrap mgt-20">
                        <mt-button type="primary" size="large" :disabled="disabled" @click="commit">提交退货物流信息</mt-button>
                    </div>

                    <!-- 物流公司弹出层 begin -->
                    <vue-pickers :show="express" :selectData="expressData" v-on:cancel="close" v-on:confirm="confirmFn"></vue-pickers>
                    <div class="mask" v-show="express"></div>
                    <!-- 物流公司弹出层 end -->
                </section>
            </section>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    import VuePickers from 'vue-pickers'
    import {listenField} from '@/assets/js/tool'
    export default {
    	name: 'page-logistics',
        components: { VHeader,VuePickers},
        data() {
			return {
				express : false,
                disabled : true,
                paramsObj : {
                    expressName:"请选择>",
                    expressId : ""
                },
                refundNo:"",
                consignorTel:"",
                refundDesc:"",
                expressData : {
                    columns: 1, // picker的列数
                    value : "",
                    // 第一列的数据结构
                    pData1: []
                },
                logistics:{
                	address:"",
                	recipient:"",
                	tel:""
                }
			}
		},
        mounted(){
            let _self = this;
            let orderId1=sessionStorage.getItem("orderId") 
            api.express({orderId:orderId1}).then(res=>{
            	if(res.code == 200){
            		$.each(res.body.expressList,function(i,ele){
                        _self.expressData.pData1.push({text:ele.value,value:ele.key});
                    });
                    _self.logistics.address = res.body.address;
                    _self.logistics.recipient = res.body.recipient;
                    _self.logistics.tel = res.body.tel;
            	}else if(res.code=="111"){
                    // 判断安卓和微信
                    if(!sessionStorage.getItem("term")){
                        window.location.href='${project.domain}/index';
                    }else{
                        _self.$router.push("/login")
                    }
                }else{
					layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2
                    });
				}
                
            });
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            choose(){
                this.express = true;
            },
            commit(){
                let _this=this;
            	let refundId=sessionStorage.getItem("refundId");
                this.disabled = true;                       	
            	api.submitExpress({
            		refundId:refundId,
            		expressCo:sessionStorage.getItem("text"),
            		expressId:sessionStorage.getItem("key"),
            		refundNo:_this.refundNo,
            		consignorTel:_this.consignorTel,
            		refundDesc:_this.refundDesc}).then(res=>{
            		if(res.code == 200){
            			layer.open({
			                content: res.msg
			                ,skin: 'msg'
			                ,time: 2,
			                end:function(){
			                	_this.$router.push({				
									path:"/prosuccess",
								});
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
                        _this.disabled = false;
					}
            	})              
            },
            confirmFn(e){
                this.express = false;
                this.paramsObj.expressName=e.select1.text+">";
                this.expressData.value=e.select1.value;
                this.expressId = e.select1.value;
                sessionStorage.setItem("text",e.select1.text);
                sessionStorage.setItem("key",e.select1.value);
                this.lst();
            },
            close(){
                this.express = false;
            },
            lst(){
                this.disabled = listenField([
                    {value:this.refundNo,type:"text"},
                    {value:this.consignorTel,type:"phone"},
                    {value:this.expressId,type:"text"}
                ])
            }
        }
    }
</script>

<style lang="scss" scoped>
    .page-logistics{
        .page-logistics-wrap{
            overflow-y:auto; 
        }
    	.line{border-top:1px solid #F1F1F1;}
        .refund-desc{
            padding: 8px 0;
            background: #fff;
            font-size: 14px;
            input{
                outline: none;
                border:none;
            }
            .mgt-3{
                margin-top: 3px;
            }
        }
        .white-bg{
            background: #fff;
        }
        .items{
            color:#888;
            line-height: 30px;
            font-size: 14px;
        }
        .area_btn{
            font-size: 16px;
        }
    }
</style>