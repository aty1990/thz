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
                        <img src="/thz/static/success.png" width="60">
                        <h3 class="mgt-10">退款物流提交成功！</h3>
                        <span class="mgt-6 gray-font font-size-12">等待物流寄回，收到商品后，会尽快处理您的订单！</span>
                    </section>
                    <section class="flex pdt-30">
                        <div class="grow flex">
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
    import api from '@/fetch/api.js'
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
                $.publish('app.refreshOrderDetail');
                $.publish('app.list');
                this.$router.go(-2);
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
