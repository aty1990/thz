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
            <vue-better-scroll style="height:100%"  class="wrapper" ref="scroll">
                <ul ref="list" class="list-content">
                    <li class="list-item" v-for="i in 100">555551111</li>
                    
                </ul>
            </vue-better-scroll>
            <router-view></router-view>
        </div>
    </transition>
</template>

<script>
    import VueBetterScroll from 'vue2-better-scroll' 
    import VHeader from '@/components/header'
    export default {
        name: 'index',
        components: { VueBetterScroll,VHeader },
        data () {
            return { 
                
            }
        },
        mounted(){
        },
        methods : {
            toBack(){
                this.$router.back();
            }
        }
    }
</script>
<style lang="scss">
	
</style>
