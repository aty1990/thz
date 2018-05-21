<style lang="scss">
	.page-login-wrap{
        
    }
</style>
<template>
    <transition name="move">
    	<div class="page-animate">
            <v-header>
                <mt-header :title="title">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div class="flex mgt-120 vertical">
                    <img src="/thz/static/pic_information@2x.png" width="100">
                    <p class="mgt-20 gray-font">{{prevMsg}},{{current}}</p>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    export default {
    	name: 'page-tabbar',
        components: { VHeader },
        data() {
			return {
                current : "",
				prevMsg : "",
                title : ""
			}
		},
		mounted() {	
            this.current =  sessionStorage.getItem("currentMsg");
            this.prevMsg =  sessionStorage.getItem("prevMsg");
            this.title   = 	sessionStorage.getItem("title");
		},
		methods : {
			toBack(){
                this.$router.back();
            }
        }
    }
</script>