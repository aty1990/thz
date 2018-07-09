<template>
    <transition name="move">
    	<div class="page-animate page-mbankcordllist">
            <v-header>
                <mt-header title="添加银行卡">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack"></mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div style="background-color: #fff;" class="mgt-6">
                <ul>
                    <li class="flex li-item pdl-20">
                        <span class="label-w">持卡人</span>
                        <span class="grow">{{bankDetail.userName}}</span>
                    </li>
                    <li class="flex li-item pdl-20">
                        <span class="label-w">所属银行</span>
                        <span class="grow">{{bankDetail.bankName}}</span>
                    </li>
                    <li class="flex li-item pdl-20">
                        <span class="label-w">储蓄卡号</span>
                        <span class="grow">{{bankDetail.accountNo}}</span>
                    </li>
                    <li class="flex li-item pdl-20">
                        <span class="label-w">银行预留手机号</span>
                        <span class="grow">{{bankDetail.phoneNumber}}</span>
                    </li>
                </ul>
            </div>
            <div class="flex mgt-20">
                <mt-button type="primary" size="large" class="font-size-14" style="width:90%;" @click="toBack">返回</mt-button>
            </div>
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import api from '@/fetch/api'
    export default {
    	name: 'page-mbankcordllist',
        components: { VHeader },
        data() {
			return {
               bankDetail : {}
            }
		},
        mounted(){
            let _self = this;
            api.getBackinfoDetail({}).then(res=>{
                if(res.code=="200"){
                	_self.bankDetail = res.body;
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
    @import '../../assets/scss/mixin';
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
        .label-w{
            width:px2rem(140);
        }
        .li-item{
            padding: px2rem(16) 0;
        }
    }
</style>