<template>
    <transition name="move">
    	<div class="page-animate page-mbankcordllist">
            <v-header>
                <mt-header title="银行卡">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <vue-better-scroll class="wrapper">
                <div class="pd-all-20 banklist">
                	<div v-for="i in items">
	                    <div class="flex item-card" :style="{'background':i.backgroundColour.substr(0,7)}">
	                		<div class="w-62" style="width:62px;background: #fff;border-radius: 62px;text-align: center;">
	                			<img v-bind:src="i.bankLogo" width="60" height="60" style="margin-top: 2px;">
	                		</div>
	                        <div class="grow all-top" style="margin-left: 20px;">
	                            <p class="card-name">{{i.bankName}}</p>
	                            <h5 class="card-type">储蓄卡</h5>
	                            <span class="card-no font-size-16">{{i.accountNo}}</span>
	                        </div>
	                    </div>                        
                    </div>
                </div>
            </vue-better-scroll>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import VueBetterScroll from 'vue2-better-scroll' 
    import api from '@/fetch/api'
    export default {
    	name: 'page-mbankcordllist',
        components: { VHeader,VueBetterScroll },
        data() {
			return {
                userName:"",
                cmtState : true,
                flag : false,
                items:[],
                bankCardList : [],
                cardno:""
            }
		},
        mounted(){
            let _self = this;
            api.bankInfoList({userId: JSON.parse(localStorage.getItem("userInfo")).userId,jhVer: 2.0}).then(res=>{
                if(res.code=="200"){
                	var bg;
                	for(var i in res.body){
                		bg = res.body[i].backgroundColour;
                		res.body[i].backgroundColour = bg.substring(0,bg.indexOf('|'));
                	}
                    _self["items"] = res.body;
                }else{
                    layer.open({
                        content: res.msg
                        ,skin: 'msg'
                        ,time: 2
                    });
                }  
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
    .page-mbankcordllist{
        .w-80{
            width: 80px;
        }
        .item-card{
            margin-bottom: 10px;
            border-radius: 10px;
            background: #000;
            color:#fff;
            padding: 10px;
        }
        .card-name{
            margin-top: 2px;
            font-size: 16px;
        }
        .card-type{
            padding: 4px 0 8px;
            font-size: 10px;
        }
    }
</style>