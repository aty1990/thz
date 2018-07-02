<template>
    <transition name="move">
    	<div class="page-animate page-success">
            <v-header>
                <mt-header title="退款申请">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <section class="wrapper">
                <section class="section">
                    <section class="flex vertical pdt-40">
                        <img src="/thz/static/icon_success@2x.png" width="60">
                        <h3 class="mgt-10">您的退款申请已提交！</h3>
                        <span class="mgt-6 gray-font font-size-12">工作人员将尽快审核,请耐心等待！</span>
                    </section>
                    <section class="flex pdt-30">
                        <div class="grow flex">
                            <span class="link-btn-gray large mgr-20" v-tap="{methods : cancel }">取消申请</span>
                            <span class="link-btn-gray large" v-tap="{methods : toOrder}">查看订单</span>
                        </div>
                    </section>
                </section>
            </section>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    export default {
    	name: 'page-success',
        components: { VHeader},
        data() {
			return {}
		},
		methods : {
            toBack(){
                this.$router.back();
            },
            toOrder(){
                this.$router.back();
            },
            cancel(){
            	let _self = this;            	
            	let orderId=this.$route.query.orderId;            	
            	let refundId=this.$route.query.refundId;     
                layer.open({
                    content: '确定取消申请退款吗？'
                    ,btn: ['确定', '取消']
                    ,yes: function(index){
                        api.applyCancel({orderId:orderId,refundId:refundId}).then(res=>{
                            if(res.code == 200){
                                _self.$parent.updateData();
                                layer.open({
                                    content: res.msg
                                    ,skin: 'msg'
                                    ,time: 2,
                                    end:function(){
                                        $.publish('app.refreshOrderDetail');
                                        $.publish('app.list');
                                        _self.$router.go(-2);
                                    }
                                });
                            }else{
                                layer.open({
                                    content: res.msg
                                    ,skin: 'msg'
                                    ,time: 2,
                                })
                            }
                        })     
                        layer.close(index);
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .page-success{
        .section{
            background: #fff;
            padding-bottom: 20px;
        }
        .large{
            padding: 10px 20px;
        }
        .gray-font{
            color:#888;
        }
    }
</style>