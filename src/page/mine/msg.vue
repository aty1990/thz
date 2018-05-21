<style lang="scss">
	.page-login-wrap{
        .mint-navbar .mint-tab-item.is-selected {
            border-bottom: 0px;
            position: relative;
            &:after {
                position: absolute;
                content: "";
                left: 50%;
                bottom: 0;
                width: 50%;
                margin-left: -25%;
                height: 3px;
                background-color: #F45051;
                z-index: 9;
            }
        }
        .mint-tab-container-wrap{
            padding-top: 5px;
            overflow-y:auto; 
        }
        .mint-tab-container-item{
            position: fixed;
            top:90px;
            bottom: 0px;
            width: 100%;
            z-index: 2;
            overflow-y:auto; 
        }
        .mint-tab-item-label{
            position: relative;
        }
        .red-bg-rad{
            position: absolute;
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: red;
            line-height: 19px;
            font-size: 10px;
            color:#fff;
            text-align: center;
            left: 62%;
            top:-8px;
            transform: scale(0.8);
        }
        .re-pos{
            left: 68%;
        }
        .bg-color{
        	width: 100%;
        	background: #f1f1f1;
        	padding-bottom: 5px;
        }
        .mess_time{       	
	        width: 44%;
	        line-height: 20px;
	        margin-left:28%;
	        text-align:center;
	        margin-top:20px;
	        margin-bottom:20px;
	        font-size:10px;
	        background: rgb(216,216,216);
	        border-radius: 10px;
        }
        .msg-items-wrap .msg-li{
        	padding: 0px;
        }
        .msg-items-wrap .msg-li:after{
        	height: 0px;
        	
        }
    }
</style>
<template>
    <transition name="move">
	<div class="page-animate">
        <v-header>
            <mt-header title="消息中心">
                <div slot="left">
                    <mt-button  icon="back" @click.native="toBack">返回</mt-button>
                </div>
            </mt-header>
        </v-header>

        <div class="page-login-wrap">
            <mt-navbar class="page-part" v-model="selected" >  
              <mt-tab-item id="1"><i class="red-bg-rad re-pos normal">{{headernum.normal}}</i>小秘书</mt-tab-item>  
              <mt-tab-item id="2"><i class="red-bg-rad notice">{{headernum.notice}}</i>公告</mt-tab-item>  
              <mt-tab-item id="3"><i class="red-bg-rad act">{{headernum.act}}</i>活动</mt-tab-item>  
            </mt-navbar>  
            <mt-tab-container v-model="selected">  
              <mt-tab-container-item id="1">  
                <ul class="msg-items-wrap">
                    <li class="flex" v-for="i in items" @click="detail(i.msgId,'normal')" >
                        <span class="img-wrap">
                            <img v-bind:src="i.msgPic" width="40px" height="40px" />                           
                            <i v-if="willShow == i.msgStat" class="msg-loop"></i>
                            <i v-else></i>
                        </span>
                        <div class="msg-item flex vertical">
                            <h4>{{i.msgTitle}}</h4>
                            <p class="on-line font-size-12 gray-font-color">{{i.msgContent}}</p>
                        </div> 
                    </li>
                    <div class="flex mgt-80 vertical" v-if="items.length==0">
                        <img src="/thz/static/pic_kong@2x.png" width="100">
                        <p class="mgt-20 gray-font">您还没有消息哦~</p>
                    </div>
                </ul>
                <!-- <p class="all-msg-readed gray-font-color" v-if="items.length>0"><span class="text">已查看全部消息</span></p> -->
              </mt-tab-container-item>  
              <mt-tab-container-item id="2">  
                <ul class="msg-items-wrap">
                    <li class="flex" v-for="i in items" @click="detail(i.msgId,'notice')" >
                        <span class="img-wrap">
                            <img v-bind:src="i.msgPic" width="40px" height="40px" />
                            <i v-if="willShow == i.msgStat" class="msg-loop"></i>
                            <i v-else></i>
                        </span>
                        <div class="msg-item flex vertical">
                            <h4>{{i.msgTitle}}</h4>
                            <p class="on-line font-size-12 gray-font-color">{{i.msgContent}}</p>
                        </div> 
                    </li>
                    <div class="flex mgt-80 vertical" v-if="items.length==0">
                        <img src="/thz/static/pic_kong@2x.png" width="100">
                        <p class="mgt-20 gray-font">您还没有消息哦~</p>
                    </div>
                </ul>
                <!-- <p class="all-msg-readed gray-font-color" v-if="items.length>0"><span class="text">已查看全部消息</span></p> -->
              </mt-tab-container-item> 
              <mt-tab-container-item id="3">  
                <ul class="msg-items-wrap">
                    <li class="msg-li" v-for="i in items" @click="detail(i.msgId,'act')">
                    	<div class="bg-color">
                    		<div class="mess_time">
                    			{{i.createTime.substr(0,4)+'-'+i.createTime.substr(4,2)+'-'+i.createTime.substr(6,2)+'&nbsp;'+i.createTime.substr(8,2)+':'+i.createTime.substr(10,2)+':'+i.createTime.substr(12,2)}}
								
							</div>
                    	</div>                  	
                        <img v-bind:src="i.msgPic"  style="width: 90%;margin-left: 5%;margin-top: 20px;"  />
                        <p class="font-size-16 " style="padding:10px 0px 0px 20px;">{{i.msgTitle}}</p>
                        <p class="font-size-12 " style="padding:20px ;">{{i.msgContent}}</p>
                    </li>
                    <div class="flex mgt-80 vertical" v-if="items.length==0">
                        <img src="/thz/static/pic_kong@2x.png" width="100">
                        <p class="mgt-20 gray-font">暂无活动~</p>
                    </div>
                </ul>
               <!--  <p class="all-msg-readed gray-font-color" v-if="items.length>0"><span class="text">已查看全部消息</span></p> -->
              </mt-tab-container-item>   
            </mt-tab-container>  
        </div>
        <router-view />
    </div>
    </transition>
</template>
<script>
    import VHeader from '@/components/header'
    import VInput from '@/components/input'
    import api from '@/fetch/api.js'
    export default {
    	name: 'page-tabbar',
        components: { VHeader,VInput },
        data() {
			return {
				selected:"1",
				willShow:'1',
				items : [],
				headernum:{
				  normal:"",
				  notice:"",
				  act:""
				}
			}
		},
		mounted() {			
			this.initData();   			
		},
		methods : {
			initData(){
				var _this = this;
				if(this.willShow=='1'){
                    _this.willShow='0';
                }else{
                    _this.willShow='1'
                }
				api.showMsgNew({type:"normal", page: 1, size: 1000}).then(res=>{
					if(res.code=="500"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
                    }
                    if(res.code=="200"){
						_this["items"] = res.body.data;				
					}
				})
				$(".mint-navbar .mint-tab-item").on("click",function(){
					var index=$(this).index();
					var type;
					if(index == 0){type="normal";}
					if(index == 1){type="notice";}
					if(index == 2){type="act";$(this).find(".red-bg-rad").hide();}
					api.showMsgNew({type: type, page: 1, size: 1000}).then(res=>{
						if(res.code=="500"){
	                    	layer.open({
		                        content: res.msg
		                        ,skin: 'msg'
		                        ,time: 2 
		                    });
	                    }
	                    if(res.code=="200"){
							_this["items"] = res.body.data;								
						}
					})
				})
				api.countMsgNew({}).then(res=>{
					if(res.code=="500"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
                    }
                    if(res.code=="200"){						
						_this.headernum.act=res.body.act;	
						_this.headernum.normal=res.body.normal;	
						_this.headernum.notice=res.body.notice;	
						if(res.body.act == '0'){$(".act").hide();}
						if(res.body.normal == '0'){$(".normal").hide();}
						if(res.body.notice == '0'){$(".notice").hide();}
					}
				})
				
			},
			updateData(){
				this.willShow='1';
				this.selected="1";				
				items : [];								
				this.initData();   
			},
            toBack(){
                this.$router.back();
            },            
            detail(msgId,type){
            	api.readMsgNew({msgId: msgId, type: type}).then(res=>{
					if(res.code=="500"){
                    	layer.open({
	                        content: res.msg
	                        ,skin: 'msg'
	                        ,time: 2 
	                    });
                    }
                    if(res.code=="200"){	
                    	this.$router.push({					
							path:"/home/msg/detail",
							query : {
								msgId : msgId,
								type: type
							}
						});	
					}
				})
            }
        }
    }
</script>