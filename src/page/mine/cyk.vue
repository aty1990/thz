<template>
    <transition name="move">
    	<div class="page-animate cyk-page">
            <v-header>
                <mt-header title="常用卡认证">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <table>
                    <tr style="height: 40px;background: #fff;">
                        <td width="40px;" style="text-indent: 10px;"><img src="/thz/static/icon_yinhangkaxinxi@2x.png" width="20" /></td>
                        <td width="65%">常用卡认证</td>
                        <td><img src="/thz/static/icon_completed11@2x.png" width="16" /></td>
                        <td style="text-indent: 4px;">{{state}}</td>
                    </tr>
                </table>
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    export default {
    	name: 'cyk-page',
        components: { VHeader },
        data() {
			return {
				state : sessionStorage.getItem("wage")=="2"?"已认证":"认证中"
			}
		},
		mounted() {			
		},
		methods : {
			toBack(){
                this.$parent.loadData();
                this.$router.back();
            }
        }
    }
</script>
<style lang="scss">
    .cyk-page{
        table {
            width: 100%;
            border: none;
            border-collapse: collapse;
        }
    }
</style>