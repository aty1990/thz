<template>
    <transition name="move">
    	<div class="page-animate page-success">
            <v-header>
                <mt-header title="交易成功">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <section class="wrapper">
                <section class="section">
                    <section class="flex vertical pdt-40">
                        <img src="/thz/static/success.png" width="60">
                        <h3 class="mgt-10">收货成功！</h3>
                    </section>
                    <section class="flex pdt-30">
                        <div class="grow flex">
                            <span class="link-btn-gray large mgr-20" @click="lookdetail">查看订单</span>
                            <span class="link-btn-gray large" @click="lookFQ">查看分期账单</span>
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
                this.$router.push("/toOrder")
            },
            lookdetail(){
            	this.$router.back();
            },
            lookFQ(){
                $.publish('app.refreshOrderDetail');
                $.publish('app.list');
                this.$router.replace("/home/fqzd");
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
