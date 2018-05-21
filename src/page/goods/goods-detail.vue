<template>
    <transition name="move">
    	<div class="page-animate page-goods-detail">
            <v-header>
                <mt-header title="商品详情">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper">
                <div class="goods-content">
                    <mt-swipe :auto="2000">
                        <mt-swipe-item v-for="icon in iconArr" :key="">
                            <img :src="icon.src" width="100%">
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
                <h5 class="text-deal pdl-10">{{goodsData.goodsName}}</h5> 
                <div class="price pdl-10 flex text-left">
                    <h2>￥{{goodsData.goodsAmount}}</h2>
                    <!-- <div class="grow pdl-10 mgt-10">
                        <span class="min-tag">特价</span>
                    </div> -->
                </div>
                <p class="desc"><span class="mgr-20">快递:{{goodsData.expressAmount}}元</span></p>
                <div class="pdb-44 img-box">
                    <img v-for="icon in detailArr"  v-lazy="icon.src" width="100%">
                </div> 
                <mt-button type="primary" size="large" class="fixed-btm-btn font-size-14" @click="shopping">立即购买</mt-button>
            </div>
            <router-view />
        </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import { Swipe, SwipeItem } from 'mint-ui';
    import {getCookie} from '@/assets/js/tool'
    import Vue from 'vue';
    Vue.component(Swipe.name, Swipe);
    Vue.component(SwipeItem.name, SwipeItem);
    import api from '@/fetch/api'
    export default {
    	name: 'page-goods-detail',
        components: { VHeader },
        data() {
			return {
				goodsData : "",
                userInfo : "",
                iconArr :[],
                detailArr : []
			}
		},
        created(){
            let _self = this;
            if(getCookie("thz_H5")){
                this.userInfo =  JSON.parse(localStorage.getItem("userInfo"));
            }
            this.initData();
            this.initPhoto();
        },
		methods : {
            toBack(){
                this.$router.back();
            },
            initData(){
                let _self = this;
                api.goodsDetail({id:sessionStorage.getItem("goodsId")}).then(res=>{
                    if(res.code=="200"){
                        _self.goodsData = res.body;
                    }else if(res.code=="111"){
                        // 判断安卓和微信
                        if(!sessionStorage.getItem("term")){
                            window.location.href='${project.domain}/index';
                        }else{
                            _self.$router.push("/login");
                        }
                    }else{
                    	layer.open({
	                         content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2	                            
	                    });
                    }
                })
            },
            initPhoto(){
                 let goodsId = sessionStorage.getItem("goodsId");
                 if(goodsId=="14"){
                     for(var i = 1;i<5;i++){
                        this.iconArr.push({src:`/thz/static/goods/item14/${i}.jpg`});
                     }
                     for(var i = 1;i<=15;i++){
                        this.detailArr.push({src:`/thz/static/goods/item14/detail${i}.jpg`});
                     }
                 }else if(goodsId=="15"){
                    for(var i = 1;i<=5;i++){
                        this.iconArr.push({src:`/thz/static/goods/item15/${i}.jpg`});
                    }
                    for(var i = 1;i<=16;i++){
                        this.detailArr.push({src:`/thz/static/goods/item15/detail${i}.jpg`});
                    }
                 }else if(goodsId=="16"){
                    for(var i = 1;i<=2;i++){
                        this.iconArr.push({src:`/thz/static/goods/item16/${i}.jpg`});
                    }
                    for(var i = 1;i<=8;i++){
                        this.detailArr.push({src:`/thz/static/goods/item16/detail${i}.jpg`});
                    }
                 }else if(goodsId=="17"){
                    for(var i = 1;i<=4;i++){
                        this.iconArr.push({src:`/thz/static/goods/item17/${i}.jpg`});
                    }
                    for(var i = 1;i<=10;i++){
                        this.detailArr.push({src:`/thz/static/goods/item17/detail${i}.jpg`});
                    }
                 }
            },
            shopping(){            	
                // 判断用户是否登录且cookie是否有效
                if(getCookie("thz_H5")){
                    api.verUser({ accessToken: getCookie("thz_H5") }).then(res=>{
                        if(res.code=="200"){
                            this.$router.push({name:"generate"});
                        }else{
                            this.$router.push("/login");
                        }
                    })
                }else{
                    this.$router.push("/login");
                }
            }
        }
    }
</script>

<style lang="scss">
    $color : #F45051;
    .page-goods-detail{
        .wrapper{
            overflow-y:auto; 
            background: #fff;
        }
        .goods-content{
            height: 320px;
        }
        .is-active{
            background:red;
            opacity:1;
        }
        .text-deal{
            padding: 10px 10px 0 0;
        }
        .min-tag{
            border:1px solid $color;
            color:$color;
            font-size: 10px;
            padding: 1px;
            padding-top: 3px;
            border-radius: 4px;
            margin-right: 5px;
        }
        .desc{
            font-size: 12px;
            color:#878787;
            padding-left: 10px;
            margin-bottom: 10px;

        }
        .img-box img{
            float: left;
        }
    }
</style>