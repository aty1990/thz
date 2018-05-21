<template>
    <transition name="move">
    	<div class="transaction page-animate">
            <v-header>
                <mt-header title="交易记录">
                    <div slot="left">
                        <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                    </div>
                </mt-header>
            </v-header>
            <div class="wrapper transaction-wrap">
                <mt-navbar class="page-part" v-model="selected">  
                  <mt-tab-item id="1">全部</mt-tab-item>  
                  <mt-tab-item id="2">收入</mt-tab-item>  
                  <mt-tab-item id="3">支出</mt-tab-item>  
                </mt-navbar> 
                <mt-tab-container v-model="selected">  
                  <mt-tab-container-item id="1">  
                    <ul class="msg-items-wrap">
	                    <li class="flex" v-for="i in items" @click="transaction(i.transId,i.type)">
	                        <span class="img-wrap">
	                            <img v-bind:src="i.iconUrl" width="40px" height="40px" />
	                        </span>
	                        <div class="msg-item flex vertical">
	                            <h4>{{i.name}}</h4>
	                            <p class="on-line font-size-12 gray-font-color">{{i.time}}</p>
	                        
	                        </div> 
	                        <div class="transaction-right is-link">
	                            <h4>{{i.amount}}</h4>
	                            <p class="on-line font-size-12 gray-font-color">{{i.status}}</p>
	                        </div> 
	                    </li>
	                    <div class="flex mgt-80 vertical" v-if="items.length==0">
		                    <img src="/thz/static/pic_wujilu@2x.png" width="100">
		                    <p class="mgt-20 gray-font">暂无交易记录~</p>
		                </div>
	                </ul>
                    <!-- <p class="all-msg-readed gray-font-color"><span class="text">已查看全部消息</span></p> -->
                  </mt-tab-container-item>  
                  <mt-tab-container-item id="2">  
                    <ul class="msg-items-wrap">
	                    <li class="flex"  v-for="i in items" @click="transaction(i.transId,i.type)">
	                        <span class="img-wrap">
	                            <img v-bind:src="i.iconUrl" width="40px" height="40px" />
	                        </span>
	                        <div class="msg-item flex vertical">
	                            <h4>{{i.name}}</h4>
	                            <p class="on-line font-size-12 gray-font-color">{{i.time}}</p>
	                        
	                        </div> 
	                        <div class="transaction-right is-link">
	                            <h4>{{i.amount}}</h4>
	                            <p class="on-line font-size-12 gray-font-color">{{i.status}}</p>
	                        </div> 
	                    </li>
	                    <div class="flex mgt-80 vertical" v-if="items.length==0">
		                    <img src="/thz/static/pic_wujilu@2x.png" width="100">
		                    <p class="mgt-20 gray-font">暂无交易记录~</p>
		                </div>
	                </ul>
                    <!-- <p class="all-msg-readed gray-font-color"><span class="text">已查看全部消息</span></p> -->
                  </mt-tab-container-item> 
                  <mt-tab-container-item id="3">  
                    <ul class="msg-items-wrap">
	                    <li class="flex"  v-for="i in items" @click="transaction(i.transId,i.type)">
	                        <span class="img-wrap">
	                            <img v-bind:src="i.iconUrl" width="40px" height="40px" />
	                        </span>
	                        <div class="msg-item flex vertical">
	                            <h4>{{i.name}}</h4>
	                            <p class="on-line font-size-12 gray-font-color">{{i.time}}</p>
	                        
	                        </div> 
	                        <div class="transaction-right is-link">
	                            <h4>{{i.amount}}</h4>
	                            <p class="on-line font-size-12 gray-font-color">{{i.status}}</p>
	                        </div> 
	                    </li>
	                    <div class="flex mgt-80 vertical" v-if="items.length==0">
		                    <img src="/thz/static/pic_wujilu@2x.png" width="100">
		                    <p class="mgt-20 gray-font">暂无交易记录~</p>
		                </div>
	                </ul>
                    <!-- <p class="all-msg-readed gray-font-color"><span class="text">已查看全部消息</span></p> -->
                  </mt-tab-container-item>  
                </mt-tab-container>  
            </div>
            <router-view/>
        </div>
   </transition>  
</template>
<script>
	import VHeader from '@/components/header'
	import api from '@/fetch/api.js'
	export default {
		name: 'transaction',
		components: {VHeader},
		data() {
			return {
			  selected: '1',
			  items : [],
			}
		},
		mounted() {
          this.initData(); 
		},
		methods: {
			initData(){
				var _this = this;
				api.records({page:1,size:121203,list:"0"}).then(res=>{
                    if(res.code=="500"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
                    }
                    if(res.code=="200"){                    	
                    	if(res.body.data == ""){
                    		$(".no-transaction").show();
                    	}else{
                    		_this["items"] = res.body.data; 
                    	}
					}
                    
                });
                $(".mint-navbar .mint-tab-item").on("click",function(){
					var index=$(this).index();
					var list;
					if(index == 0){list="0";}
					if(index == 1){list="1";}
					if(index == 2){list="2";}
					api.records({list: list, page: 1, size: 1000}).then(res=>{
						if(res.code=="500"){
	                    	layer.open({
		                        content: res.msg
		                        ,skin: 'msg'
		                        ,time: 2 
		                    });
	                    }
	                    if(res.code=="200"){
							console.log(res);
							_this["items"] = res.body.data;								
						}
					})
				})
			},
			toBack() {
				this.$router.back();
			},
			toRouter(e) {
				this.$router.push(e.params);
			},
			transaction(transId,type){
				this.$router.push({					
					path:"/paydetails",
					query : {
						transId : transId,
						type:type
					}
				});
			}
		}
	}
</script>
<style lang="scss">
	.transaction-wrap{
		overflow-y:auto; 
	}
	.mint-navbar{
		.mint-tab-item.is-selected{
			color: #000;
		}
	} 
	.mint-navbar{
		 .mint-tab-item{
		 	padding: 15px 0;
		 }
	}
	
	.no-transaction{
		width: 90%;
		margin-left: 5%;
		text-align: center;
		display: none;
	}
	.no-transaction p{
		line-height: 70px;
	}
	.no-transaction img{
		width: 50%;
		margin-top: 50px;
	}
	.transaction{
		.invitelist{
			background: #fff;
		}
		.is-link {
			background: url("/thz/static/href.png") scroll 98% 50% no-repeat;
			background-size: 20px;
		}
		.msg-items-wrap {
			.img-wrap{
				margin-left: 20px;
			}
		}
		.icon-code{
			width: 60px;
		}
		.transaction-right{
			width: 30%;
		}
		.mint-tab-container-wrap{
			margin-top: 10px;
		}
	}
</style>
