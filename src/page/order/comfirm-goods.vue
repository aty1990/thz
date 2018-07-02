<template>
    <transition name="move">
    	<div class="page-animate page-comform-goods">
            <v-header>
                <mt-header title="收货成功">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <section class="wrapper">
                <section class="section">
                    <section class="flex vertical pdt-40">
                        <img src="/thz/static/icon_success@2x.png" width="60">
                        <h2 class="mgt-20">确认收货成功！</h2>
                    </section>
                    <section class="flex pdt-30">
                        <div class="grow flex">
                            <span class="link-btn-gray large" @click="toOrder">查看订单</span>
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
            }
        }
    }
</script>

<style lang="scss">
    .page-comform-goods{
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
        .link-btn-gray{
            margin-left: 0;
        }
    }
</style>