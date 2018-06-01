<template>
    <transition name="move">
        <div class="ui-index page-animate">
            <v-header>
                <mt-header title="淘花宅">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                    <mt-button slot="right">首页</mt-button>
                </mt-header>
            </v-header>
            <!-- <vue-better-scroll style="height:100%"  class="wrapper" ref="scroll">
                <ul ref="list" class="list-content">
                    <li class="list-item" v-for="i in 100">555551111</li>
                    
                </ul>
            </vue-better-scroll> -->
            <div class="wrapper">
                <ul class="content" ref="tabcontent">
                    <li v-for="i in 100" class="items">1233333333333333333</li>
                </ul>
                <!-- 这里可以放一些其它的 DOM，但不会影响滚动 -->
            </div>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import BScroll from 'better-scroll'
    import VHeader from '@/components/header'
    export default {
        name: 'index',
        components: { VHeader },
        data () {
            return {}
        },
        mounted(){
            this.$nextTick(()=>{
                var items = $(".items");
                let width = items.length*(items.eq(0).outerWidth(true));
                this.$refs.tabcontent.style.width=width+'px';
                let scroll = new BScroll('.wrapper',{
                    bounce: {
                      top: true,
                      bottom: true
                    },
                    scrollX : true,
                    scrollY : false
                }); 
            })
        },
        methods : {
            toBack(){
                this.$router.back();
            }
        }
    }
</script>
<style lang="scss">
	.wrapper{
        ul{
            width: 2000px;
            height: 100px;
            overflow: hidden;
        }
        li{
            display: inline-block;
            width: 100px;
            height: 100px;
            background-color: blue;
            margin-right: 10px;
            overflow: hidden;
        }
    }
</style>
